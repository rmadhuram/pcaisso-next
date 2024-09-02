import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import dotenv from "dotenv";
import { DrawResult } from "../../../models/draw-result";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { addResult } from "@/persistence/result";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const input = await req.json();
  const session = await getServerSession(options);

  console.log('Session is: ' , session);
  // TODO: Check if user id is present in session

  if (!input || !input.prompt || !input.type || !input.model) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  let prompt = "";

  switch (input.type) {
    case "2D":
      prompt = `Write an HTML code using canvas to draw this: ${input.prompt} and make it responsive based on the size of the screen it is rendered`;
      break;
    case "SVG":
      prompt = `Write an HTML code with SVG to draw this: ${input.prompt} and make it responsive based on the size of the screen it is rendered`;
      break;
    case "3D":
      prompt = `Write an HTML code using Three.js to render this: ${input.prompt} and make it responsive based on the size of the screen it is rendered`;
      break;
    case "d3":
      prompt = `Write an HTML code using d3.js to render this: ${input.prompt} and make it responsive based on the size of the screen it is rendered`;
      break;
    default:
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: input.model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const response = completion.choices[0].message?.content || "";

    const startIndex =
      response.indexOf("```html\n") !== -1
        ? response.indexOf("```html\n") + 7
        : 0;
    const endIndex =
      response.indexOf("```", startIndex) !== -1
        ? response.indexOf("```", startIndex)
        : response.length;

    const endTime = Date.now();
    const output: DrawResult = {
      code: response.substring(startIndex, endIndex).trim(),
      text: response,
      timeTakenInSec: (endTime - startTime) / 1000,
      usage: completion.usage || {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0,
      }
    };

    // Add the output to the database
    // TODO: Setting userId to 0 will violate the foreign key constraint in the database.
    await addResult(session?.user?.id || 0, input.type, input.prompt, input.model, output);

    return NextResponse.json(output, { status: 200 });
  } catch (error) {
    console.error("Error fetching from OpenAI:", error);
    return NextResponse.json(
      { error: "Unable to fetch from OpenAI" },
      { status: 500 }
    );
  }
}
