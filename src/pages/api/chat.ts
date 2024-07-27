import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const startTime = Date.now();
    const input = req.body;

    if (!input || !input.prompt || !input.type) {
      return res.status(400).json({ error: "Invalid input" });
    }

    let prompt = "";

    switch (input.type) {
      case "2D":
        prompt = `Write a HTML code using canvas of size 800x600 pixels to draw this: ${input.prompt}`;
        break;
      case "SVG":
        res.status(200).send("<html><body>TBD</body></html>");
        return;
      case "3D":
        prompt = `Write a HTML code using Three.js of size 800x600 pixels to render this: ${input.prompt}`;
        break;
      case "d3":
        prompt = `Write a HTML code using d3.js to render this: ${input.prompt}`;
        break;
      default:
        return res.status(400).json({ error: "Invalid type" });
    }

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const response = completion.choices[0].message?.content || "";

      let startIndex =
        response.indexOf("```html\n") !== -1
          ? response.indexOf("```html\n") + 7
          : 0;
      let endIndex =
        response.indexOf("```\n", startIndex + 6) !== -1
          ? response.indexOf("```\n", startIndex + 6)
          : response.length;

      const endTime = Date.now();
      const output = {
        code: response.substring(startIndex, endIndex),
        text: response.substring(0, startIndex),
        timeTakenInSec: (endTime - startTime) / 1000,
      };

      res.status(200).json(output);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch from OpenAI" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
