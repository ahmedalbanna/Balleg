import axios from 'axios';

export interface AIClassificationResult {
  success: boolean;
  classification?: string;
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
  }
};
