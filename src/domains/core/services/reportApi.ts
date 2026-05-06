import axios from 'axios';

export interface Report {
  id: string;
  description: string;
  type: string;
  audioUrl?: string;
  imageUrl?: string;
  status: 'pending_operator' | 'pending_official' | 'in_progress' | 'resolved';
  department?: string;
  classification?: string;
  createdAt: string;
  location?: [number, number];
  aiAnalysis?: any;
}

export const reportApi = {
  // 1. Citizen creates a report
  async createReport(data: { 
    description: string, 
    type?: string, 
    location?: [number, number],
    imageUrl?: string,
    aiAnalysis?: any
  }) {
    const res = await axios.post('/api/domain/report/create', data);
    return res.data;
  },

  // 1.5 Upload Image
  async uploadImage(file: File | Blob) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await axios.post('/api/domain/report/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  },
  
  // 2. Citizen tracks a report
  async trackReport(id: string) {
    const res = await axios.get(`/api/domain/report/track/${id}`);
    return res.data;
  },

  async submitFeedback(id: string, data: { rating: number, feedback?: string }) {
    const res = await axios.patch(`/api/domain/report/feedback/${id}`, data);
    return res.data;
  },
  
  // 3. Operator fetches unrouted/pending reports
  async getPendingOperator() {
    const res = await axios.get('/api/domain/report/operator/pending');
    return res.data.reports as Report[];
  },

  // 4. Operator routes the report
  async routeReport(id: string, department: string, classification: string) {
    const res = await axios.post(`/api/domain/report/${id}/route`, { department, classification });
    return res.data;
  },

  // 5. Official fetches their department's reports
  async getDepartmentReports(department: string) {
    const res = await axios.get(`/api/domain/report/official/${department}`);
    return res.data.reports as Report[];
  },

  // 6. Official updates report status
  async updateStatus(id: string, status: string) {
    const res = await axios.post(`/api/domain/report/${id}/status`, { status });
    return res.data;
  }
};
