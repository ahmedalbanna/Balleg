import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../services/firebase';

export interface AppRole {
  id: string;
  name: string;
  themeColor: string;
  icon: string;
  description: string;
  features?: string[];
  slug: string;
}

interface RoleContextType {
  currentRole: AppRole | null;
  setCurrentRole: (role: AppRole) => void;
  availableRoles: AppRole[];
  isLoading: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [availableRoles, setAvailableRoles] = useState<AppRole[]>([]);
  const [currentRole, setCurrentRole] = useState<AppRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'roles'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const roles = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as AppRole[];
      
      setAvailableRoles(roles);
      
      // Default to the first role if none set
      if (!currentRole && roles.length > 0) {
        // Find if we have a default citizen role
        const citizen = roles.find(r => r.slug === 'citizen') || roles[0];
        setCurrentRole(citizen);
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching roles:", error);
      // Fallback for demo if DB is empty
      const fallback: AppRole[] = [
        {
          id: '1',
          name: 'المواطن',
          slug: 'citizen',
          themeColor: '#3b82f6',
          icon: 'User',
          description: 'للمواطنين والجمهور العام لتقديم البلاغات الحية.'
        },
        {
          id: '2',
          name: 'المسؤول الحكومي',
          slug: 'official',
          themeColor: '#0f172a',
          icon: 'Shield',
          description: 'لمتابعة البلاغات واتخاذ الإجراءات اللازمة.'
        }
      ];
      setAvailableRoles(fallback);
      if (!currentRole) setCurrentRole(fallback[0]);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [currentRole]);

  return (
    <RoleContext.Provider value={{ currentRole, setCurrentRole, availableRoles, isLoading }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
