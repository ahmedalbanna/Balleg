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
      let roles = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as AppRole[];
      
      // Fallback if DB is empty
      if (roles.length === 0) {
        roles = [
          {
            id: '1',
            name: 'الجمهور العام',
            slug: 'citizen',
            themeColor: '#3b82f6',
            icon: 'User',
            description: 'للمواطنين والجمهور العام لتقديم البلاغات الحية.'
          },
          {
            id: '2',
            name: 'المسئول الحكومي',
            slug: 'official',
            themeColor: '#000000',
            icon: 'Shield',
            description: 'لمتابعة البلاغات واتخاذ الإجراءات اللازمة.'
          },
          {
            id: '3',
            name: 'التاجر المحلي',
            slug: 'merchant',
            themeColor: '#059669',
            icon: 'Store',
            description: 'لأصحاب الأعمال المهتمين بتحسين بيئة محلاتهم التجارية.'
          },
          {
            id: '4',
            name: 'سائقو النقل',
            slug: 'driver',
            themeColor: '#f59e0b',
            icon: 'Car',
            description: 'للسائقين الحريصين على سلامة الطرق والإبلاغ السريع عن الأعطال.'
          },
          {
            id: '5',
            name: 'النازحون والمجتمعات',
            slug: 'displaced',
            themeColor: '#f97316',
            icon: 'Home',
            description: 'منصة لرفع صوت المجتمعات المكتظة وضمان وصول الخدمات الأساسية والمساعدات.'
          },
          {
            id: '6',
            name: 'موظف الاستقبال',
            slug: 'operator',
            themeColor: '#4f46e5',
            icon: 'Headset',
            description: 'لإدارة البلاغات الواردة وتوجيهها للفرق الميدانية المختصة بسرعة وكفاءة.'
          },
          {
            id: '7',
            name: 'موظف الإدارة المختصة',
            slug: 'specialist',
            themeColor: '#be123c',
            icon: 'HardHat',
            description: 'لمتابعة البلاغات المحولة للقسم، تكليف الفرق الميدانية، وتحديث حالة المعالجة على الخريطة.'
          },
          {
            id: '8',
            name: 'مدير الإدارة',
            slug: 'manager',
            themeColor: '#334155',
            icon: 'BarChart3',
            description: 'للإشراف على أداء القسم، تحليل مؤشرات الاستجابة، وإدارة الموارد البشرية والميدانية.'
          }
        ];
      }

      setAvailableRoles(roles);
      
      if (!currentRole && roles.length > 0) {
        const citizen = roles.find(r => r.slug === 'citizen') || roles[0];
        setCurrentRole(citizen);
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching roles:", error);
      const fallback: AppRole[] = [
        {
          id: '1',
          name: 'الجمهور العام',
          slug: 'citizen',
          themeColor: '#3b82f6',
          icon: 'User',
          description: 'للمواطنين والجمهور العام لتقديم البلاغات الحية.'
        },
        {
          id: '2',
          name: 'المسئول الحكومي',
          slug: 'official',
          themeColor: '#000000',
          icon: 'Shield',
          description: 'لمتابعة البلاغات واتخاذ الإجراءات اللازمة.'
        },
        {
          id: '3',
          name: 'التاجر المحلي',
          slug: 'merchant',
          themeColor: '#059669',
          icon: 'Store',
          description: 'لأصحاب الأعمال المهتمين بتحسين بيئة محلاتهم التجارية.'
        },
        {
          id: '4',
          name: 'سائقو النقل',
          slug: 'driver',
          themeColor: '#f59e0b',
          icon: 'Car',
          description: 'للسائقين الحريصين على سلامة الطرق والإبلاغ السريع عن الأعطال.'
        },
        {
          id: '5',
          name: 'النازحون والمجتمعات',
          slug: 'displaced',
          themeColor: '#f97316',
          icon: 'Home',
          description: 'منصة لرفع صوت المجتمعات المكتظة وضمان وصول الخدمات الأساسية والمساعدات.'
        },
        {
          id: '6',
          name: 'موظف الاستقبال',
          slug: 'operator',
          themeColor: '#4f46e5',
          icon: 'Headset',
          description: 'لإدارة البلاغات الواردة وتوجيهها للفرق الميدانية المختصة بسرعة وكفاءة.'
        },
        {
          id: '7',
          name: 'موظف الإدارة المختصة',
          slug: 'specialist',
          themeColor: '#be123c',
          icon: 'HardHat',
          description: 'لمتابعة البلاغات المحولة للقسم، تكليف الفرق الميدانية، وتحديث حالة المعالجة على الخريطة.'
        },
        {
          id: '8',
          name: 'مدير الإدارة',
          slug: 'manager',
          themeColor: '#334155',
          icon: 'BarChart3',
          description: 'للإشراف على أداء القسم، تحليل مؤشرات الاستجابة، وإدارة الموارد البشرية والميدانية.'
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
