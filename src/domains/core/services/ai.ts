import axios from 'axios';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface AIClassificationResult {
  success: boolean;
  classification?: string;
  detectedObjects?: string[];
  severity?: 'low' | 'medium' | 'high';
  summary?: string;
  error?: string;
}

export const aiService = {
  async classifyReport(text: string): Promise<AIClassificationResult> {
    try {
      const response = await axios.post('/api/domain/ai/classify', { text });
      return response.data;
    } catch (error: any) {
      console.error('AI Service Error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'فشل الاتصال بخدمة الذكاء الاصطناعي'
      };
    }
  },

  async analyzeImageAndText(text: string, imageBase64?: string): Promise<AIClassificationResult> {
    try {
      // Analyze using Gemini from Frontend (Preferred for AI Studio)
      const prompt = `
        قم بتحليل البلاغ التالي (نص وصورة إن وجدت).
        حدد ما يلي بدقة في تنسيق JSON:
        1. classification: (طرق، نظافة، كهرباء، مياه، إنساني، طارئ)
        2. detectedObjects: قائمة بالأشياء المكتشفة في الصورة (مثل: حفرة، نفايات، أنبوب مكسور)
        3. severity: (low, medium, high)
        4. summary: ملخص ذكي للبلاغ باللغة العربية.
        
        البلاغ النصي: "${text}"
      `;

      const parts: any[] = [{ text: prompt }];
      if (imageBase64) {
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: imageBase64.split(',')[1] || imageBase64
          }
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: { parts },
        config: {
          responseMimeType: "application/json"
        }
      });

      const result = JSON.parse(response.text || '{}');
      return {
        success: true,
        ...result
      };
    } catch (error: any) {
      console.error('Gemini Vision Error:', error);
      // Fallback to text-only Ollama if Gemini fails
      return this.classifyReport(text);
    }
  }
};
