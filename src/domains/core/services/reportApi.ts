import axios from 'axios';
import { db, auth } from './firebase';
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';

export interface Report {
  id: string;
  userId?: string;
  description: string;
  type: string;
  rating?: number;
  priority?: string;
  audioUrl?: string;
  imageUrl?: string;
  status: string; // broadened to support various string states
  department?: string;
  classification?: string;
  createdAt: string;
  location?: [number, number];
  aiAnalysis?: any;
  sponsorId?: string;
  sponsorName?: string;
  sponsorDate?: string;
  communityComments?: { text: string; author: string; createdAt: string }[];
  isPrivateService?: boolean;
  bids?: { handymanId: string, handymanName: string, price: string, timeEstimate: string, status: string, createdAt: string }[];
  [key: string]: any;
}

export const reportApi = {
  // 1. Citizen creates a report
  async createReport(data: { 
    description: string, 
    type?: string, 
    location?: [number, number],
    imageUrl?: string,
    aiAnalysis?: any,
    isAnonymous?: boolean,
    role?: string,
    isPrivateService?: boolean
  }) {
    // We hit AI/Upload via axis, but we can write the document straight to Firebase.
    // Ensure we have a tracking number.
    const trackingNo = "BLG-" + Math.floor(100000 + Math.random() * 900000);
    const isDisplaced = data.role === "displaced";
    const status = isDisplaced ? "pending_official" : "pending_operator";
    const department = isDisplaced ? "البلدية والمنظمات الإنسانية" : (data.isPrivateService ? "خدمات خاصة" : undefined);
    
    const newReport: Report = {
      id: trackingNo,
      userId: data.isAnonymous ? "anonymous" : (auth.currentUser?.uid || "anonymous"),
      description: data.description,
      type: data.type || "عام",
      imageUrl: data.imageUrl,
      status: status,
      department: department,
      priority: data.aiAnalysis?.priority || 'medium',
      createdAt: new Date().toISOString(),
      location: data.location || [33.5138, 36.2765],
      aiAnalysis: data.aiAnalysis || null,
      isPrivateService: data.isPrivateService || false,
    };

    try {
        await setDoc(doc(db, 'reports', trackingNo), newReport);
    } catch (e) {
        console.error("Error creating report in firestore", e);
    }

    return { success: true, trackingNo, report: newReport };
  },

  async editReport(id: string, data: { description: string }) {
    const res = await axios.patch(`/api/domain/report/edit/${id}`, data);
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
  
  async getMyReports(userId: string) {
    const q = query(collection(db, 'reports'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
  },

  async getMerchantReports() {
    const res = await axios.get('/api/domain/report/merchant/all');
    return res.data.reports as Report[];
  },

  async sponsorReport(id: string, data: { sponsorId: string, sponsorName: string, sponsorDate: string }) {
    const res = await axios.patch(`/api/domain/report/merchant/sponsor/${id}`, data);
    return res.data;
  }
};
