
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API client using the environment variable API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDescription = async (title: string, type: 'course' | 'project', context?: string): Promise<string> => {
  try {
    const prompt = `
      Write a compelling, professional, and concise description (max 80 words) for a ${type} titled "${title}".
      Context/Keywords: ${context || 'General IT topic'}.
      Tone: Educational, inspiring, and technical.
      Do not use markdown. Just plain text.
    `;

    // Use gemini-3-flash-preview for efficient text generation
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "No description generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate description. Please try again.";
  }
};

export const generateChatResponse = async (userMessage: string, portfolioContext: string): Promise<string> => {
  try {
    // Use gemini-3-flash-preview for chat-like responses
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are a helpful portfolio assistant for a software engineer and instructor.
        
        Portfolio Context:
        ${portfolioContext}
        
        User Question: ${userMessage}
        
        Answer professionally, briefly, and enthusiastically. Focus on the user's question.
      `,
    });
    return response.text || "I'm not sure what to say.";
  } catch (error) {
    return "Sorry, I encountered an error answering that.";
  }
};
