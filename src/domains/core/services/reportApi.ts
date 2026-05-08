import axios from 'axios';
import { db, auth, handleFirestoreError, OperationType } from './firebase';
import { doc, setDoc, getDocs, deleteDoc, collection, query, where, serverTimestamp } from 'firebase/firestore';

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
  createdAt: any;
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
    const status = isDisplaced ? "pending_official" : (data.isPrivateService ? "pending_operator" : "pending_verification");
    const department = isDisplaced ? "البلدية والمنظمات الإنسانية" : (data.isPrivateService ? "خدمات خاصة" : undefined);
    
    const newReport: Report = {
      id: trackingNo,
      userId: auth.currentUser?.uid || "anonymous",
      isAnonymous: data.isAnonymous || false,
      description: data.description,
      type: data.type || "عام",
      status: status,
      priority: data.aiAnalysis?.priority || 'medium',
      createdAt: serverTimestamp(),
      isPrivateService: data.isPrivateService || false,
    };
    
    // Add optional fields
    if (data.imageUrl) newReport.imageUrl = data.imageUrl;
    if (department) newReport.department = department;
    if (data.location) newReport.location = data.location;
    if (data.aiAnalysis) newReport.aiAnalysis = data.aiAnalysis;

    try {
        await setDoc(doc(db, 'reports', trackingNo), newReport);
    } catch (e) {
        console.error("Error creating report in firestore", e);
        handleFirestoreError(e, OperationType.CREATE, `reports/${trackingNo}`);
        throw e;
    }

    return { success: true, trackingNo, report: newReport };
  },

  async editReport(id: string, data: { description?: string, imageUrl?: string, audioUrl?: string, location?: [number, number], aiAnalysis?: any }) {
    const reportRef = doc(db, 'reports', id);
    const updateData: any = { ...data, updatedAt: serverTimestamp() };
    await setDoc(reportRef, updateData, { merge: true });
    return { success: true };
  },

  async deleteReport(id: string) {
    const reportRef = doc(db, 'reports', id);
    try {
      await deleteDoc(reportRef);
      return { success: true };
    } catch (e) {
      console.error("Error deleting report in firestore", e);
      handleFirestoreError(e, OperationType.DELETE, `reports/${id}`);
      throw e;
    }
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

  async uploadAudio(file: Blob) {
    const formData = new FormData();
    formData.append('audio', file);
    const res = await axios.post('/api/domain/report/upload-audio', formData, {
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
    const reportRef = doc(db, 'reports', id);
    await setDoc(reportRef, { rating: data.rating, feedback: data.feedback, updatedAt: serverTimestamp() }, { merge: true });
    return { success: true };
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
    const q = query(collection(db, 'reports'), where('department', '==', department), where('status', 'in', ['pending_official', 'in_progress']));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Report));
  },

  // 6. Official updates report status
  async updateStatus(id: string, status: string) {
    const reportRef = doc(db, 'reports', id);
    await setDoc(reportRef, { status, updatedAt: serverTimestamp() }, { merge: true });
    return { success: true };
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
