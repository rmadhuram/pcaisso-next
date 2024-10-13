
import { InvokeLLM } from "./invoke-llm.interface";
import { DrawResult } from "@/models/draw-result";
import { getAnthropic } from "./llm.factory";
import { calculateCost } from "@/app/utils/calculate-cost";

export class InvokeAnthropic implements InvokeLLM {
  async invoke(prompt: string, model: string): Promise<DrawResult> {
    const anthropic = getAnthropic();   
    const startTime = Date.now();

    console.log(`Invoking Anthropic with model: ${model}`);

    const completion = await anthropic.messages.create({
      model: model,
      max_tokens: 4096,
      temperature: 1,
      messages: [{ role: "user", content: prompt }],
    });

    const response = completion.content[0].type === 'text' 
      ? completion.content[0].text 
      : '';

    const startIndex =
      response.indexOf("```html\n") !== -1
        ? response.indexOf("```html\n") + 7
        : 0;
    const endIndex =
      response.indexOf("```", startIndex) !== -1
        ? response.indexOf("```", startIndex)
        : response.length;

    const endTime = Date.now();

    const calculatedCost = calculateCost(
      model,
      completion.usage?.input_tokens,
      completion.usage?.output_tokens
    );

    console.log(calculatedCost);

    const output: DrawResult = {
      id: 0,
      user_id: 0,
      uuid: "",
      liked: false,
      status: "ACTIVE",
      code: response.substring(startIndex, endIndex).trim(),
      text: response,
      timeTakenInSec: (endTime - startTime) / 1000,
      usage: {
        prompt_tokens: completion.usage?.input_tokens || 0,
        completion_tokens: completion.usage?.output_tokens || 0,
        total_tokens: (completion.usage?.input_tokens || 0) + (completion.usage?.output_tokens || 0),
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