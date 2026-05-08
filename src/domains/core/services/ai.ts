import axios from "axios";

export interface AIClassificationResult {
  success: boolean;
  classification?: string;
  detectedObjects?: string[];
  severity?: 'low' | 'medium' | 'high';
  priority?: 'critical' | 'high' | 'medium' | 'low';
  summary?: string;
  error?: string;
}

export const aiService = {
  async analyzeReport(text: string, imageUrl?: string): Promise<AIClassificationResult> {
    try {
      const response = await axios.post("/api/domain/ai/analyze", { 
        text, 
        imageUrl 
      });
      
      return {
        success: true,
        ...response.data
      };
    } catch (error: any) {
      console.error('AI Service Error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'فشل التحليل عبر محرك الذكاء الاصطناعي الخاص بالبلدية'
      };
    }
  },

  async classifyReport(text: string): Promise<AIClassificationResult> {
    return this.analyzeReport(text);
  }
};
