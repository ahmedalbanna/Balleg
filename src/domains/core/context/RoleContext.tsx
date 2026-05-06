import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../services/firebase';
import { useAuth } from './AuthContext';

export interface AppRole {
  id: string;
  name: string;
  themeColor: string;
  icon: string;
  description: string;
  features?: string[];
  slug: string;
  category?: 'citizens' | 'business' | 'admin' | 'leadership' | 'community';
}

interface RoleContextType {
  currentRole: AppRole | null;
  setCurrentRole: (role: AppRole) => void;
  availableRoles: AppRole[];
  isLoading: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const { profile, loading: authLoading } = useAuth();
  const [availableRoles, setAvailableRoles] = useState<AppRole[]>([]);
  const [currentRole, setCurrentRole] = useState<AppRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync currentRole with profile.role if authenticated
  useEffect(() => {
    if (profile?.role && availableRoles.length > 0) {
      const match = availableRoles.find(r => r.slug === profile.role);
      if (match) {
        setCurrentRole(match);
      }
    }
  }, [profile, availableRoles]);

  useEffect(() => {
    const q = query(collection(db, 'roles'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let roles = snapshot.docs.map(doc => {
        const data = doc.data();
        let category: AppRole['category'] = 'citizens';
        const slug = data.slug;
        
        if (['citizen', 'displaced', 'driver'].includes(slug)) category = 'citizens';
        else if (['merchant', 'telecom', 'contractor', 'handyman'].includes(slug)) category = 'business';
        else if (['operator', 'specialist', 'official', 'verifier', 'developer'].includes(slug)) category = 'admin';
        else if (['manager', 'admin', 'council', 'donor'].includes(slug)) category = 'leadership';
        else if (['neighborhood_council', 'humanitarian', 'journalist'].includes(slug)) category = 'community';

        return {
          ...data,
          id: doc.id,
          category
        };
      }) as AppRole[];
      
      // Fallback if DB is empty
      if (roles.length === 0) {
        roles = [
          {
            id: '1',
            name: 'الجمهور العام',
            slug: 'citizen',
            themeColor: '#3b82f6',
            icon: 'User',
            description: 'للمواطنين والجمهور العام لتقديم البلاغات الحية.',
            category: 'citizens'
          },
          {
            id: '2',
            name: 'المسئول الحكومي',
            slug: 'official',
            themeColor: '#000000',
            icon: 'Shield',
            description: 'لمتابعة البلاغات واتخاذ الإجراءات اللازمة.',
            category: 'admin'
          },
          {
            id: '3',
            name: 'التاجر المحلي',
            slug: 'merchant',
            themeColor: '#059669',
            icon: 'Store',
            description: 'لأصحاب الأعمال المهتمين بتحسين بيئة محلاتهم التجارية.',
            category: 'business'
          },
          {
            id: '4',
            name: 'سائقو النقل',
            slug: 'driver',
            themeColor: '#f59e0b',
            icon: 'Car',
            description: 'للسائقين الحريصين على سلامة الطرق والإبلاغ السريع عن الأعطال.',
            category: 'citizens'
          },
          {
            id: '5',
            name: 'النازحون والمجتمعات',
            slug: 'displaced',
            themeColor: '#f97316',
            icon: 'Home',
            description: 'منصة لرفع صوت المجتمعات المكتظة وضمان وصول الخدمات الأساسية والمساعدات.',
            category: 'citizens'
          },
          {
            id: '6',
            name: 'موظف الاستقبال',
            slug: 'operator',
            themeColor: '#4f46e5',
            icon: 'Headset',
            description: 'لإدارة البلاغات الواردة وتوجيهها للفرق الميدانية المختصة بسرعة وكفاءة.',
            category: 'admin'
          },
          {
            id: '7',
            name: 'موظف الإدارة المختصة',
            slug: 'specialist',
            themeColor: '#be123c',
            icon: 'HardHat',
            description: 'لمتابعة البلاغات المحولة للقسم، تكليف الفرق الميدانية، وتحديث حالة المعالجة على الخريطة.',
            category: 'admin'
          },
          {
            id: '8',
            name: 'مدير الإدارة',
            slug: 'manager',
            themeColor: '#334155',
            icon: 'BarChart3',
            description: 'للإشراف على أداء القسم، تحليل مؤشرات الاستجابة، وإدارة الموارد البشرية والميدانية.',
            category: 'leadership'
          },
          {
            id: '9',
            name: 'مدير النظام العام',
            slug: 'admin',
            themeColor: '#0f172a',
            icon: 'Briefcase',
            description: 'السلطة التنفيذية العليا للإشراف الشامل على أداء المديريات والقطاعات الخدمية.',
            category: 'leadership'
          },
          {
            id: '10',
            name: 'المجلس المحلي',
            slug: 'council',
            themeColor: '#1e293b',
            icon: 'Landmark',
            description: 'السلطة التشريعية والرقابية لمراقبة أداء التنفيذيين وضمان الشفافية ومساءلة المقصرين.',
            category: 'leadership'
          },
          {
            id: '11',
            name: 'المجالس المجتمعية',
            slug: 'neighborhood_council',
            themeColor: '#64748b',
            icon: 'Users',
            description: 'للدور الرقابي المجتمعي، متابعة بلاغات الحي المتأخرة، والرفع بالتقييمات للبلدية.',
            category: 'community'
          },
          {
            id: '12',
            name: 'المنظمات الإنسانية',
            slug: 'humanitarian',
            themeColor: '#0284c7',
            icon: 'HeartPulse',
            description: 'للمنظمات الدولية والمحلية لتوجيه التدخلات وحل مشكلات البنية التحتية والنزوح.',
            category: 'community'
          },
          {
            id: '13',
            name: 'الصحافة والنشطاء',
            slug: 'journalist',
            themeColor: '#701a75',
            icon: 'Newspaper',
            description: 'للوصول إلى البيانات الموثقة، رصد القضايا الأكثر تأثيراً، وكشف فجوات الأداء الخدمي.',
            category: 'community'
          },
          {
            id: '14',
            name: 'شركات الاتصالات',
            slug: 'telecom',
            themeColor: '#0ea5e9',
            icon: 'Signal',
            description: 'لتحسين خدمة العملاء، رصد أعطال الأبراج، وبناء سمعة "الشركة المستجيبة" تقنياً.',
            category: 'business'
          },
          {
            id: '15',
            name: 'مقاول الصيانة',
            slug: 'contractor',
            themeColor: '#7c2d12',
            icon: 'Hammer',
            description: 'لشركات المقاولات لمتابعة عقود الصيانة، جدولة الفرق الميدانية، وتحسين السمعة عبر سرعة التنفيذ.',
            category: 'business'
          },
          {
            id: '16',
            name: 'خدمات صيانة منزلية',
            slug: 'handyman',
            themeColor: '#4f46e5',
            icon: 'Wrench',
            description: 'للفنيين والمتاجر المحلية لتقديم خدمات الإصلاح المنزلي والترويج الجغرافي للمنتجات.',
            category: 'business'
          },
          {
            id: '17',
            name: 'فريق التحقق',
            slug: 'verifier',
            themeColor: '#475569',
            icon: 'FileSearch',
            description: 'لمراجعة البلاغات يدوياً، التحقق من الصور والملفات، وتصنيفها أولياً لضمان جودة البيانات.',
            category: 'admin'
          },
          {
            id: '18',
            name: 'فريق التطوير والدعم',
            slug: 'developer',
            themeColor: '#0f172a',
            icon: 'Terminal',
            description: 'للمطورين والمهندسين لمراقبة صحة النظام، أداء الـ API، وحل المشكلات التقنية الحرجة.',
            category: 'admin'
          },
          {
            id: '19',
            name: 'الجهات المانحة (Donors)',
            slug: 'donor',
            themeColor: '#1e40af',
            icon: 'Globe2',
            description: 'للمنظمات الدولية المانحة لمراقبة مؤشرات الأداء، قياس أثر التمويل، وضمان الشفافية المؤسسية.',
            category: 'leadership'
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
          description: 'للمواطنين والجمهور العام لتقديم البلاغات الحية.',
          category: 'citizens'
        },
        {
          id: '2',
          name: 'المسئول الحكومي',
          slug: 'official',
          themeColor: '#000000',
          icon: 'Shield',
          description: 'لمتابعة البلاغات واتخاذ الإجراءات اللازمة.',
          category: 'admin'
        },
        {
          id: '3',
          name: 'التاجر المحلي',
          slug: 'merchant',
          themeColor: '#059669',
          icon: 'Store',
          description: 'لأصحاب الأعمال المهتمين بتحسين بيئة محلاتهم التجارية.',
          category: 'business'
        },
        {
          id: '4',
          name: 'سائقو النقل',
          slug: 'driver',
          themeColor: '#f59e0b',
          icon: 'Car',
          description: 'للسائقين الحريصين على سلامة الطرق والإبلاغ السريع عن الأعطال.',
          category: 'citizens'
        },
        {
          id: '5',
          name: 'النازحون والمجتمعات',
          slug: 'displaced',
          themeColor: '#f97316',
          icon: 'Home',
          description: 'منصة لرفع صوت المجتمعات المكتظة وضمان وصول الخدمات الأساسية والمساعدات.',
          category: 'citizens'
        },
        {
          id: '6',
          name: 'موظف الاستقبال',
          slug: 'operator',
          themeColor: '#4f46e5',
          icon: 'Headset',
          description: 'لإدارة البلاغات الواردة وتوجيهها للفرق الميدانية المختصة بسرعة وكفاءة.',
          category: 'admin'
        },
        {
          id: '7',
          name: 'موظف الإدارة المختصة',
          slug: 'specialist',
          themeColor: '#be123c',
          icon: 'HardHat',
          description: 'لمتابعة البلاغات المحولة للقسم، تكليف الفرق الميدانية، وتحديث حالة المعالجة على الخريطة.',
          category: 'admin'
        },
        {
          id: '8',
          name: 'مدير الإدارة',
          slug: 'manager',
          themeColor: '#334155',
          icon: 'BarChart3',
          description: 'للإشراف على أداء القسم، تحليل مؤشرات الاستجابة، وإدارة الموارد البشرية والميدانية.',
          category: 'leadership'
        },
        {
          id: '9',
          name: 'مدير النظام العام',
          slug: 'admin',
          themeColor: '#0f172a',
          icon: 'Briefcase',
          description: 'السلطة التنفيذية العليا للإشراف الشامل على أداء المديريات والقطاعات الخدمية.',
          category: 'leadership'
        },
        {
          id: '10',
          name: 'المجلس المحلي',
          slug: 'council',
          themeColor: '#1e293b',
          icon: 'Landmark',
          description: 'السلطة التشريعية والرقابية لمراقبة أداء التنفيذيين وضمان الشفافية ومساءلة المقصرين.',
          category: 'leadership'
        },
          {
            id: '11',
            name: 'المجالس المجتمعية',
            slug: 'neighborhood_council',
            themeColor: '#64748b',
            icon: 'Users',
            description: 'للدور الرقابي المجتمعي، متابعة بلاغات الحي المتأخرة، والرفع بالتقييمات للبلدية.',
            category: 'community'
          },
          {
            id: '12',
            name: 'المنظمات الإنسانية',
            slug: 'humanitarian',
            themeColor: '#0284c7',
            icon: 'HeartPulse',
            description: 'للمنظمات الدولية والمحلية لتوجيه التدخلات وحل مشكلات البنية التحتية والنزوح.',
            category: 'community'
          },
          {
            id: '13',
            name: 'الصحافة والنشطاء',
            slug: 'journalist',
            themeColor: '#701a75',
            icon: 'Newspaper',
            description: 'للوصول إلى البيانات الموثقة، رصد القضايا الأكثر تأثيراً، وكشف فجوات الأداء الخدمي.',
            category: 'community'
          },
          {
            id: '14',
            name: 'شركات الاتصالات',
            slug: 'telecom',
            themeColor: '#0ea5e9',
            icon: 'Signal',
            description: 'لتحسين خدمة العملاء، رصد أعطال الأبراج، وبناء سمعة "الشركة المستجيبة" تقنياً.',
            category: 'business'
          },
          {
            id: '15',
            name: 'مقاول الصيانة',
            slug: 'contractor',
            themeColor: '#7c2d12',
            icon: 'Hammer',
            description: 'لشركات المقاولات لمتابعة عقود الصيانة، جدولة الفرق الميدانية، وتحسين السمعة عبر سرعة التنفيذ.',
            category: 'business'
          },
          {
            id: '16',
            name: 'خدمات صيانة منزلية',
            slug: 'handyman',
            themeColor: '#4f46e5',
            icon: 'Wrench',
            description: 'للفنيين والمتاجر المحلية لتقديم خدمات الإصلاح المنزلي والترويج الجغرافي للمنتجات.',
            category: 'business'
          },
          {
            id: '17',
            name: 'فريق التحقق',
            slug: 'verifier',
            themeColor: '#475569',
            icon: 'FileSearch',
            description: 'لمراجعة البلاغات يدوياً، التحقق من الصور والملفات، وتصنيفها أولياً لضمان جودة البيانات.',
            category: 'admin'
          },
          {
            id: '18',
            name: 'فريق التطوير والدعم',
            slug: 'developer',
            themeColor: '#0f172a',
            icon: 'Terminal',
            description: 'للمطورين والمهندسين لمراقبة صحة النظام، أداء الـ API، وحل المشكلات التقنية الحرجة.',
            category: 'admin'
          }
        ];
      setAvailableRoles(fallback);
      if (!currentRole) setCurrentRole(fallback[0]);
      setIsLoading(false);
      handleFirestoreError(error, OperationType.LIST, 'roles');
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
