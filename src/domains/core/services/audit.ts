import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../services/firebase';

export async function logActivity(action: string, details: string, path: string = '') {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await addDoc(collection(db, 'audit_logs'), {
      userId: user.uid,
      action,
      details,
      path,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}
