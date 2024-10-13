import { InvokeLLM } from "./invoke-llm.interface";
import { DrawResult } from "@/models/draw-result";
import { getOpenAI } from "./llm.factory";  
import { calculateCost } from "@/app/utils/calculate-cost";

export class InvokeOpenAI implements InvokeLLM {
  async invoke(prompt: string, model: string): Promise<DrawResult> {
    const openai = getOpenAI();
    const startTime = Date.now();

    console.log(`Invoking OpenAI with model: ${model}`);

    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const response = completion.choices[0].message?.content || "";
    const calculatedCost = calculateCost(
      model,
      completion.usage?.prompt_tokens,
      completion.usage?.completion_tokens
    );

    console.log(calculatedCost);

    const startIndex =response.indexOf("```html\n") !== -1
      ? response.indexOf("```html\n") + 7
      : 0;

    const endIndex = response.indexOf("```", startIndex) !== -1
        ? response.indexOf("```", startIndex)
        : response.length;

    const endTime = Date.now();

    const output: DrawResult = {
      id: 0,
      user_id: 0,
      uuid: "",
      liked: false,
      status: "ACTIVE",
      code: response.substring(startIndex, endIndex).trim(),
      text: response,
      timeTakenInSec: (endTime - startTime) / 1000,
      usage: completion.usage || {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0,
      },
      cost: {
        input_cost: calculatedCost.inputCost,
        output_cost: calculatedCost.outputCost,
        total_cost: calculatedCost.totalCost,
      },
    };

    return output;
  }
}
