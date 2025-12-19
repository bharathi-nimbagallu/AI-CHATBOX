
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are "Amity", a friendly, helpful, and polite AI assistant. 
Your goal is to talk like a warm, supportive human. 
- Use clear and simple language.
- Be empathetic and patient.
- Use emojis naturally to feel approachable (but don't overdo it).
- If you don't know something, admit it politely.
- Always be encouraging and positive.
- Format your responses with markdown for readability when appropriate (bullet points, bold text).`;

export class GeminiService {
  private ai: GoogleGenAI;
  private chat: any;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topP: 0.95,
        topK: 40,
      },
    });
  }

  async *sendMessageStream(message: string) {
    try {
      const result = await this.chat.sendMessageStream({ message });
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        yield c.text || '';
      }
    } catch (error) {
      console.error("Gemini stream error:", error);
      throw error;
    }
  }

  resetChat() {
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
}

export const geminiService = new GeminiService();
