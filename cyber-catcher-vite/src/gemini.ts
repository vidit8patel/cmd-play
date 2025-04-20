// @ts-ignore
import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY });

export function formatGeminiMarkdown(text: string): string {
  // Replace *text* with <b>text</b>
  return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
}

export async function explainSafePopup(label: string, tip?: string): Promise<string> {
  const prompt = `
A player clicked the following popup in a whack-a-mole game thinking it was malicious, but it was actually safe in a cybersecurity context.
Popup: "${label}"${tip ? `\nHint: ${tip}` : ""}
Explain in 1-2 brain rot sentences why this is NOT malicious and is actually safe.
`;
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt
  });
  return formatGeminiMarkdown(response.text ?? "");
}

