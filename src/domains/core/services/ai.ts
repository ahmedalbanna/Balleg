import axios from 'axios';

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
      // Directing calls to our Ollama endpoint via backend
      const response = await axios.post('/api/domain/ai/analyze', { 
        text, 
        hasImage: !!imageBase64 
      });
      
      return {
        success: true,
        ...response.data
      };
    } catch (error: any) {
      console.error('AI Analyze Error:', error);
      // Fallback
      return {
        success: false,
        error: error.response?.data?.error || 'فشل تحليل البلاغ عبر Ollama'
      };
    }
  }
};
