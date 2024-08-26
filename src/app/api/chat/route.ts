import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const input = await req.json(); 

  if (!input || !input.prompt || !input.type || !input.model) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  let prompt = "";

  switch (input.type) {
    case "2D":
      prompt = `Write an HTML code using canvas of size 800x600 pixels to draw this: ${input.prompt}`;
      break;
    case "SVG":
      prompt = `Write an HTML code with SVG to draw this: ${input.prompt}`;
      break;
    case "3D":
      prompt = `Write an HTML code using Three.js of size 800x600 pixels to render this: ${input.prompt}`;
      break;
    case "d3":
      prompt = `Write an HTML code using d3.js to render this: ${input.prompt}`;
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
    const output = {
      code: response.substring(startIndex, endIndex).trim(),
      text: response,
      timeTakenInSec: (endTime - startTime) / 1000,
    };

    return NextResponse.json(output, { status: 200 });
  } catch (error) {
    console.error("Error fetching from OpenAI:", error);
    return NextResponse.json(
      { error: "Unable to fetch from OpenAI" },
      { status: 500 }
    );
  }
}
