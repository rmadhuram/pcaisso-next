import { models } from "@/lib/llms/models";

export function calculateCost(
  model: string,
  inputTokens: number | undefined,
  outputTokens: number | undefined
): { inputCost: number; outputCost: number; totalCost: number } {
  let inputCost = 0;
  let outputCost = 0;
  let totalCost = 0;

  models.forEach((modelFromJSON) => {
    if (modelFromJSON.modelName === model) {
      if (inputTokens && outputTokens) {
        inputCost = (inputTokens / 1000000) * modelFromJSON.inputCostPerM;
        outputCost = (outputTokens / 1000000) * modelFromJSON.outputCoserPerM;
      }
      totalCost = inputCost + outputCost;
    }
  });

  return {
    inputCost,
    outputCost,
    totalCost,
  };
}
