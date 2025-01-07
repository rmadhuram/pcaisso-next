import { DrawResult } from "@/models/draw-result";
import { getProvider } from "./models";
import { InvokeLLM } from "@/lib/llms/invoke-llm.interface";
import { InvokeOpenAI } from "@/lib/llms/invoke-openai";
import { InvokeAnthropic } from "@/lib/llms/invoke-anthropic";
import { getDeepSeek } from "./llm.factory";
import { getOpenAI } from "./llm.factory";

/**
 * Invokes the LLM to get the code for the given type, model and input prompt
 * @param type 
 * @param model 
 * @param inputPrompt 
 * @returns 
 */
export async function getCode(type: string, model: string, inputPrompt: string): Promise<DrawResult> {

  let prompt = '';
  switch (type) {
    
    case "2D":
      prompt = `Write an HTML code using canvas to draw this: ${inputPrompt} and make it responsive based on the size of the screen it is rendered`;
      break;

    case "SVG":
      prompt = `Write an HTML code with SVG to draw this: ${inputPrompt} and make it responsive based on the size of the screen it is rendered`;
      break;

    case "3D":
      prompt = `Write an HTML code using Three.js to render this: ${inputPrompt} and 
        make it responsive based on the size of the screen it is rendered
        Use three.js from https://unpkg.com/three@0.133.0/build/three.min.js
        If required, for OrbitControls use https://unpkg.com/three@0.133.0/examples/js/controls/OrbitControls.js`;
      break;

    case "d3":
      prompt = `Write an HTML code using d3.js to render this: ${inputPrompt} and 
         make it responsive based on the size of the screen it is rendered. 
      `;
      break;

    default:
      throw new Error("Invalid type");
  }    
  
  let invokeLLM: InvokeLLM | undefined;
  let provider = getProvider(model);
  switch (provider) {
    case "OpenAI": 
      invokeLLM = new InvokeOpenAI(getOpenAI());
      break;

    case "DeepSeek":
      invokeLLM = new InvokeOpenAI(getDeepSeek());
      break;

    case "Anthropic":
      invokeLLM = new InvokeAnthropic();
      break;

  }
  if (!invokeLLM) {
    throw new Error("Invalid model");
  }

  const output = await invokeLLM.invoke(prompt, model);
  return output;
}