import { NextApiRequest, NextApiResponse } from "next";
import openai from '../../src/lib/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { input, format } = req.body;

    console.log(input);
    console.log(format);

    try {
      const response = await openai.createCompletion({
        model: "gpt-4-turbo",
        prompt: `Draw a ${format} picture of ${input} and provide the code for it.`,
        max_tokens: 150,
      });

      res.status(200).json({ imageURL: "http://example.com/generated-image.jpg", code: response.data.choices[0].text });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate drawing." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }

  console.log(res);
}
