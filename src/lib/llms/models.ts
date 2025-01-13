export const models = [
  {
    modelName: "claude-3-5-sonnet-20240620",
    provider: "Anthropic",
    inputCostPerM: 3,
    outputCoserPerM: 15,
    enabled: true,
  },
  {
    modelName: "claude-3-sonnet-20240229",
    provider: "Anthropic",
    inputCostPerM: 3,
    outputCoserPerM: 15,
    enabled: true,
  },
  {
    modelName: "claude-3-haiku-20240307",
    provider: "Anthropic",
    inputCostPerM: 0.25,
    outputCoserPerM: 1.25,
    enabled: true,
  },
  {
    modelName: "gpt-3.5-turbo",
    provider: "OpenAI",
    inputCostPerM: 3,
    outputCoserPerM: 5,
    enabled: true,
  },
  {
    modelName: "gpt-4",
    provider: "OpenAI",
    inputCostPerM: 30,
    outputCoserPerM: 60,
    enabled: true,
  },
  {
    modelName: "gpt-4-turbo",
    provider: "OpenAI",
    inputCostPerM: 10,
    outputCoserPerM: 30,
    enabled: true,
  },
  {
    modelName: "gpt-4o",
    provider: "OpenAI",
    inputCostPerM: 2.5,
    outputCoserPerM: 10,
    enabled: true,
  },
  {
    modelName: "gpt-4o-mini",
    provider: "OpenAI",
    inputCostPerM: 0.015,
    outputCoserPerM: 0.6,
    enabled: true,
  },
  {
    modelName: "o1-preview",
    provider: "OpenAI",
    inputCostPerM: 15,
    outputCoserPerM: 60,
    enabled: false,
  },
  {
    modelName: "o1-mini",
    provider: "OpenAI",
    inputCostPerM: 3,
    outputCoserPerM: 12,
    enabled: false,
  },
  {
    modelName: "deepseek-chat",
    provider: "DeepSeek",
    inputCostPerM: 0.14,
    outputCoserPerM: 0.28,
    enabled: true,
  },
  {
    modelName: "phi4:latest",
    provider: "Microsoft",
    inputCostPerM: 0,
    outputCoserPerM: 0,
    enabled: true,
  }
];

export function getModel(modelName: string) {
  return models.find((model) => model.modelName === modelName);
}

export function getProvider(modelName: string) {
  const model = getModel(modelName);
  return model?.provider;
}
