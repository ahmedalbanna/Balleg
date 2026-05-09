import { useState } from "react";
import { collection, writeBatch, doc } from "firebase/firestore";
import { db } from "../../core/services/firebase";
import { toast } from "sonner";
import { Loader2, Database, AlertCircle } from "lucide-react";

export function DataSeeder() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [progress, setProgress] = useState("");

  const seedData = async () => {
    setIsSeeding(true);
    try {
      // 1. Roles
      setProgress("Seeding roles...");
      const rolesBatch = writeBatch(db);
      const roles = [
        { id: "admin", name: "مدير النظام", slug: "admin", category: "admin", themeColor: "bg-slate-800", description: "إدارة النظام والتقارير الشاملة", icon: "shield" },
        { id: "official", name: "مسؤول حكومي", slug: "official", category: "leadership", themeColor: "bg-blue-600", description: "إدارة المحافظة وتوجيه البلاغات", icon: "building" },
        { id: "operator", name: "المشغل الاستراتيجي", slug: "operator", category: "admin", themeColor: "bg-indigo-600", description: "فرز وتوجيه البلاغات للجهات المعنية", icon: "headset" },
        { id: "specialist", name: "المتخصص", slug: "specialist", category: "admin", themeColor: "bg-emerald-600", description: "استقبال البلاغات من المشغل وحلها", icon: "wrench" },
        { id: "manager", name: "مدير الإدارة", slug: "manager", category: "admin", themeColor: "bg-violet-600", description: "متابعة أداء المتخصصين", icon: "users" },
        { id: "citizen", name: "مواطن", slug: "citizen", category: "citizens", themeColor: "bg-teal-600", description: "الإبلاغ عن المشاتع العامة", icon: "user" },
        { id: "displaced", name: "نازح / متضرر", slug: "displaced", category: "citizens", themeColor: "bg-orange-600", description: "طلب مساعدات طارئة وتدخل سريع", icon: "home" },
        { id: "merchant", name: "تاجر / منشأة", slug: "merchant", category: "business", themeColor: "bg-amber-600", description: "رعاية مشاريع محلية وتطوعية", icon: "store" },
        { id: "driver", name: "سائق طوارئ", slug: "driver", category: "business", themeColor: "bg-yellow-600", description: "تلبية نداءات الطوارئ اللوجستية", icon: "truck" },
        { id: "council", name: "عضو مجلس بلدي", slug: "council", category: "leadership", themeColor: "bg-rose-600", description: "مراقبة البلاغات وتحليل الرأي العام", icon: "briefcase" },
        { id: "contractor", name: "مقاول تنفيذ", slug: "contractor", category: "business", themeColor: "bg-cyan-600", description: "استلام وتفيذ مشاريع الصيانة الكبرى", icon: "hammer" },
        { id: "developer", name: "مطور تقني", slug: "developer", category: "admin", themeColor: "bg-gray-700", description: "تطوير وصيانة المنصة التقنية", icon: "code" },
        { id: "donor", name: "متبرع / جهة مانحة", slug: "donor", category: "community", themeColor: "bg-pink-600", description: "تمويل المبادرات الإنسانية والمجتمعية", icon: "heart" },
        { id: "handyman", name: "فني صيانة", slug: "handyman", category: "business", themeColor: "bg-lime-600", description: "تقديم خدمات الصيانة المنزلية السريعة", icon: "wrench" },
        { id: "humanitarian", name: "منسق إنساني", slug: "humanitarian", category: "community", themeColor: "bg-red-600", description: "تنسيق جهود الإغاثة والمساعدات", icon: "globe" },
        { id: "journalist", name: "صحفي / إعلامي", slug: "journalist", category: "community", themeColor: "bg-purple-600", description: "نشر التقارير والتحقيقات الميدانية", icon: "newspaper" },
        { id: "neighborhood", name: "رئيس لجنة حي", slug: "neighborhood", category: "community", themeColor: "bg-sky-600", description: "تمثيل سكان الحي ورفع احتياجاتهم", icon: "map-pin" },
        { id: "telecom", name: "مشغل اتصالات", slug: "telecom", category: "business", themeColor: "bg-blue-400", description: "إصلاح أعطال الشبكة والاتصالات", icon: "radio" },
        { id: "verifier", name: "مدقق بيانات", slug: "verifier", category: "admin", themeColor: "bg-emerald-800", description: "التأكد من صحة البلاغات والبيانات المدخلة", icon: "check-circle" },
      ];
      roles.forEach(role => {
        rolesBatch.set(doc(collection(db, "roles"), role.id), role);
      });
      await rolesBatch.commit();

      // 2. Departments
      setProgress("Seeding departments...");
      const deptBatch = writeBatch(db);
      const departments = [
        { id: "dept_municipality", name: "الأمانة والبلدية", category: "government" },
        { id: "dept_water", name: "شركة المياه الوطنية", category: "utilities" },
        { id: "dept_electricity", name: "شركة الكهرباء", category: "utilities" },
        { id: "dept_telecom", name: "وزارة الاتصالات وتقنية المعلومات", category: "utilities" },
        { id: "dept_roads", name: "إدارة الطرق والنقل", category: "government" }
      ];
      departments.forEach(dept => {
        deptBatch.set(doc(collection(db, "departments"), dept.id), dept);
      });
      await deptBatch.commit();

      // 3. Reports
      setProgress("Seeding reports...");
      const reportsBatch = writeBatch(db);
      const now = new Date();
      const reports = [
        {
          id: "BLG-100001",
          userId: "dummy_citizen_1",
          description: "تسرب مياه رئيسي في الشارع العام يسبب هبوط في الطبقة الإسفلتية",
          type: "تسرب مياه",
          status: "pending_operator",
          priority: "high",
          imageUrl: "https://images.unsplash.com/photo-1541888081699-236b005ffbf1?auto=format&fit=crop&q=80&w=800",
          location: [24.7136, 46.6753],
          createdAt: new Date(now.getTime() - 86400000),
          isPrivateService: false,
          isAnonymous: false,
          aiAnalysis: { classification: "تسرب مياه", priority: "high", summary: "تسرب مياه يؤثر على الإسفلت" }
        },
        {
          id: "BLG-100002",
          userId: "dummy_citizen_2",
          description: "انقطاع التيار الكهربائي عن الحي بأكمله منذ ساعتين",
          type: "انقطاع كهرباء",
          status: "pending_official",
          department: "شركة الكهرباء",
          priority: "critical",
          location: [24.7236, 46.6853],
          createdAt: new Date(now.getTime() - 7200000),
          isPrivateService: false,
          isAnonymous: false
        },
        {
          id: "BLG-100006",
          userId: "dummy_telecom_1",
          description: "عطل فني في برج الاتصالات رقم 402 يؤثر على جودة البيانات",
          type: "عطل اتصالات",
          status: "in_progress",
          department: "وزارة الاتصالات وتقنية المعلومات",
          priority: "medium",
          location: [24.7536, 46.7053],
          createdAt: new Date(now.getTime() - 43200000),
          isPrivateService: false,
          isAnonymous: false
        },
        {
          id: "BLG-100003",
          userId: "dummy_citizen_3",
          description: "تجمع نفايات وحيوانات ضالة خلف مدرسة ابتدائية يشكل خطر",
          type: "نظافة عامة",
          status: "pending_specialist",
          department: "الأمانة والبلدية",
          priority: "medium",
          location: [24.7356, 46.6953],
          createdAt: new Date(now.getTime() - 172800000),
          isPrivateService: false,
          isAnonymous: false,
          aiAnalysis: { classification: "نظافة وصحة عامة", priority: "medium" }
        },
        {
          id: "BLG-100004",
          userId: "dummy_citizen_4",
          description: "مشروع متعثر لم يتم إكماله منذ أشهر مما تسبب في إغلاق مسار رئيسي",
          type: "رقابة مشاريع",
          status: "pending_operator",
          priority: "high",
          imageUrl: "https://images.unsplash.com/photo-1541888081699-236b005ffbf1?auto=format&fit=crop&q=80&w=800",
          location: [24.7156, 46.6783],
          createdAt: new Date(now.getTime() - (86400000 * 3)),
          isPrivateService: false,
          isAnonymous: false
        },
        {
          id: "BLG-100005",
          userId: "dummy_citizen_5",
          description: "عطل في السباكة الداخلية للمنزل يحتاج سباك خاص",
          type: "صيانة منزلية",
          status: "pending_operator",
          department: "خدمات خاصة",
          priority: "low",
          location: [24.7186, 46.6713],
          createdAt: new Date(now.getTime() - 3640000),
          isPrivateService: true,
          isAnonymous: false,
          bids: [
            {
              handymanId: "handy_1",
              handymanName: "محمد الفني",
              price: "150 SAR",
              timeEstimate: "خلال ساعة",
              status: "pending",
              createdAt: new Date()
            }
          ]
        }
      ];

      reports.forEach(report => {
        reportsBatch.set(doc(collection(db, "reports"), report.id), report);
      });

      // 4. Neighborhood Reports
      setProgress("Seeding neighborhood reports...");
      const neighborhoodReports = [
        {
          id: "NR-200001",
          neighborhoodId: "dummy_nb_1",
          neighborhoodName: "حي النرجس",
          title: "تذمر من تجمع النفايات المتكرر",
          content: "سكان المربع السادس يشتكون من تأخر سيارات البلدية وانبعاث روائح كريهة بشكل يومي.",
          status: "pending",
          createdAt: new Date(now.getTime() - 172800000)
        }
      ];
      neighborhoodReports.forEach(r => {
        reportsBatch.set(doc(collection(db, "neighborhood_dissatisfaction_reports"), r.id), r);
      });

      // 5. Journalist Requests
      setProgress("Seeding journalist requests...");
      const journalistRequests = [
        {
          id: "JR-300001",
          journalistId: "dummy_jr_1",
          reportId: "BLG-100001",
          targetDepartment: "dept_water",
          content: "نطلب تعليقاً رسمياً حول أسباب تأخر حل مشكلة تسرب المياه في الشارع العام بالرغم من البلاغات المتكررة.",
          status: "pending",
          deadline: new Date(now.getTime() + 172800000),
          createdAt: new Date()
        }
      ];
      journalistRequests.forEach(r => {
        reportsBatch.set(doc(collection(db, "journalist_comment_requests"), r.id), r);
      });

      // 6. Clarification Requests (Council)
      setProgress("Seeding council requests...");
      const councilRequests = [
        {
          id: "CR-400001",
          councilId: "dummy_cl_1",
          targetDepartment: "dept_municipality",
          subject: "استفسار حول ميزانية صيانة الطرق لعام 2024",
          content: "نرجو تزويدنا بخطة الرصف المقررة للأحياء الشرقية.",
          status: "pending",
          createdAt: new Date(now.getTime() - 259200000)
        }
      ];
      councilRequests.forEach(r => {
        reportsBatch.set(doc(collection(db, "clarification_requests"), r.id), r);
      });

      await reportsBatch.commit();

      toast.success("تم حقن البيانات التجريبية بنجاح!");
      setProgress("Seeding complete!");
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء حقن البيانات! يرجى التأكد من سماحية قواعد البيانات (firestore.rules).");
      setProgress("Error occurred!");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Database className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-800 mb-2">حقن البيانات التجريبية لحالات الاستخدام</h1>
        <p className="text-slate-500 text-sm mb-8 font-bold">
          ستقوم هذه العملية بإنشاء (أدوار النظام، أقسام الجهات المتصلة، وبلاغات تجريبية) لاختبار لوحات القيادة وعمليات النظام.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-8 flex gap-3 text-right">
          <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-700 font-bold leading-relaxed">
            ملاحظة: لضمان نجاح عملية الحقن، يجب أن تسمح <code className="bg-yellow-200 px-1 rounded">firestore.rules</code> بالكتابة على جميع المسارات. يمكن تعديلها مؤقتاً إلى <code className="bg-yellow-200 px-1 rounded">allow write: if true;</code>
          </p>
        </div>

        <button
          onClick={seedData}
          disabled={isSeeding}
          className="w-full h-14 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black rounded-2xl transition-all shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2"
        >
          {isSeeding ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{progress}</span>
            </>
          ) : (
             "بدء حقن البيانات الآن"
          )}
        </button>
      </div>
    </div>
  );
}
