import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  User as FirebaseUser,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { logActivity } from '../services/audit';

interface UserProfile {
  uid: string;
  email: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  role: string;
  isActive: boolean;
  profileImageUrl?: string;
  departmentId?: string;
  neighborhood?: string;
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (uid: string) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data() as UserProfile);
      } else {
        // If user document doesn't exist, create a default one (usually for initial phone/email signup)
        // In a real app, this might be handled during registration step
        setProfile(null);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setProfile(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        if (firebaseUser.isAnonymous) {
          // Assign guest profile for anonymous users
          setProfile({
            uid: firebaseUser.uid,
            email: null,
            phoneNumber: null,
            displayName: 'ضيف (مواطن)',
            role: 'citizen',
            isActive: true
          });
        } else {
          await fetchProfile(firebaseUser.uid);
        }
        logActivity('LOGIN', `User ${firebaseUser.email || firebaseUser.uid} logged in ${firebaseUser.isAnonymous ? '(Guest)' : ''}`);
      } else {
        if (user) logActivity('LOGOUT', `User ${user.email || user.uid} logged out`);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]); // Added user to dependencies to track the change for logging

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const refreshProfile = async () => {
    if (user && !user.isAnonymous) await fetchProfile(user.uid);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
