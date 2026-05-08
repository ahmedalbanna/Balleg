import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../core/services/firebase';
import { Building2, Plus, Edit2, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface Department {
  id: string;
  name: string;
  category: string;
  parentDepartmentId?: string;
  managerUid?: string;
}

export const DepartmentsManager: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [parentDepartmentId, setParentDepartmentId] = useState('');
  const [managerUid, setManagerUid] = useState('');

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'departments'));
      const snapshot = await getDocs(q);
      const depts = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Department));
      setDepartments(depts);
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'departments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSave = async () => {
    if (!name || !category) {
      toast.error('يرجى تعبئة اسم القطاع وتصنيفه');
      return;
    }

    try {
      const isEdit = !!editingDept;
      const deptId = isEdit ? editingDept.id : `dept_${Math.random().toString(36).substring(2, 9)}`;
      
      const payload: Partial<Department> = {
        name,
        category,
      };

      if (parentDepartmentId) payload.parentDepartmentId = parentDepartmentId;
      if (managerUid) payload.managerUid = managerUid;

      await setDoc(doc(db, 'departments', deptId), payload, { merge: true });
      toast.success(isEdit ? 'تم تحديث القطاع بنجاح' : 'تم إضافة القطاع بنجاح');
      
      setIsAdding(false);
      setEditingDept(null);
      resetForm();
      fetchDepartments();
    } catch (error) {
      toast.error('حدث خطأ أثناء الحفظ');
      handleFirestoreError(error, OperationType.WRITE, 'departments');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا القطاع؟')) return;
    
    try {
      await deleteDoc(doc(db, 'departments', id));
      toast.success('تم حذف القطاع');
      fetchDepartments();
    } catch (err) {
      toast.error('حدث خطأ أثناء الحذف');
      handleFirestoreError(err, OperationType.DELETE, 'departments');
    }
  };

  const resetForm = () => {
    setName('');
    setCategory('');
    setParentDepartmentId('');
    setManagerUid('');
  };

  const startEdit = (dept: Department) => {
    setEditingDept(dept);
    setName(dept.name);
    setCategory(dept.category);
    setParentDepartmentId(dept.parentDepartmentId || '');
    setManagerUid(dept.managerUid || '');
    setIsAdding(true);
  };

  const getParentName = (parentId?: string) => {
    if (!parentId) return 'أساسي';
    return departments.find(d => d.id === parentId)?.name || parentId;
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm min-h-[400px]">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <Building2 className="w-6 h-6 text-indigo-500" />
            إدارة الهيكل التنظيمي للمدينة
          </h3>
          <p className="text-sm font-bold text-slate-500 mt-1">البلديات، الجهات الخدمية الفرعية، والإدارات المرتبطة</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => { resetForm(); setIsAdding(true); setEditingDept(null); }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-indigo-600/20"
          >
            <Plus size={18} />
            إضافة قطاع جديد
          </button>
        )}
      </div>

      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-50 p-6 rounded-2xl border border-indigo-100 mb-8"
        >
          <h4 className="font-bold text-slate-800 mb-4">{editingDept ? 'تعديل قطاع' : 'إضافة قطاع جديد'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">اسم القطاع / الإدارة <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 font-bold"
                placeholder="مثال: إدارة النظافة"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">التصنيف <span className="text-rose-500">*</span></label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 font-bold"
              >
                <option value="">اختر التصنيف...</option>
                <option value="infrastructure">بنية تحتية (طرق، إنارة، ...)</option>
                <option value="sanitation">الصحة والبيئة (نظافة، مكافحة مكافحة...)</option>
                <option value="utilities">مرافق (مياه، كهرباء...)</option>
                <option value="services">خدمات مجتمعية</option>
                <option value="municipality">بلدية فرعية</option>
                <option value="other">أخرى</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">الجهة التابعة لها (اختياري)</label>
              <select
                value={parentDepartmentId}
                onChange={e => setParentDepartmentId(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 font-bold"
              >
                <option value="">قطاع أساسي (لا يتبع لجهة)</option>
                {departments.filter(d => d.id !== editingDept?.id).map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">معرف المدير (UID) (اختياري)</label>
              <input 
                type="text" 
                value={managerUid} 
                onChange={e => setManagerUid(e.target.value)} 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 font-bold font-mono"
                placeholder="مثال: nX8...uid"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button 
              onClick={() => { setIsAdding(false); setEditingDept(null); resetForm(); }}
              className="px-5 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-200 transition-colors"
            >
              إلغاء
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-indigo-600/20"
            >
              <CheckCircle2 size={16} />
              حفظ القطاع
            </button>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="text-center py-20 text-slate-400">جاري التحميل...</div>
      ) : departments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
           <Building2 size={48} className="mb-4 opacity-20 text-slate-800" />
           <p className="text-lg font-black text-slate-700">لا يوجد قطاعات حالياً</p>
           <p className="text-sm font-bold mt-2 text-slate-500">قم بإضافة القطاعات الأولى لتنظيم العمل والتحويلات</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b-2 border-slate-100 pb-2">
                <th className="py-4 px-4 text-xs font-black text-slate-400 uppercase tracking-wider">اسم القطاع</th>
                <th className="py-4 px-4 text-xs font-black text-slate-400 uppercase tracking-wider">التصنيف</th>
                <th className="py-4 px-4 text-xs font-black text-slate-400 uppercase tracking-wider">المرجعية</th>
                <th className="py-4 px-4 text-xs font-black text-slate-400 uppercase tracking-wider">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-slate-800">{dept.name}</div>
                    {dept.managerUid && <div className="text-[10px] text-slate-400 font-mono mt-1">مدير: {dept.managerUid.substring(0,6)}...</div>}
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-xs font-black inline-block">
                      {dept.category === 'infrastructure' ? 'بنية تحتية' :
                       dept.category === 'sanitation' ? 'الصحة والبيئة' :
                       dept.category === 'utilities' ? 'مرافق' :
                       dept.category === 'municipality' ? 'بلدية فرعية' : 
                       dept.category === 'services' ? 'خدمات مجتمعية' : dept.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${!dept.parentDepartmentId ? 'bg-emerald-400' : 'bg-amber-400'}`}></div>
                      <span className="text-xs font-bold text-slate-600">{getParentName(dept.parentDepartmentId)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => startEdit(dept)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent rounded-xl transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(dept.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent rounded-xl transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
