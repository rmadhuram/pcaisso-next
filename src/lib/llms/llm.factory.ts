import OpenAI from "openai";
import Anthropic from '@anthropic-ai/sdk';
import dotenv from "dotenv";  
let openai: OpenAI;
let anthropic: Anthropic;

dotenv.config();

export function getOpenAI(): OpenAI {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

export function getAnthropic(): Anthropic {
  if (!anthropic) {
    anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }
  return anthropic;
}