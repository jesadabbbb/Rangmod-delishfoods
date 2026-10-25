import React from 'react';
import { Task } from '../types/colony';

interface DashboardViewProps {
  tasks: Task[];
  onOpenTaskDetail: (task: Task) => void;
  onSelectTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  tasks,
  onOpenTaskDetail,
  onSelectTab,
}) => {
  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const review = tasks.filter((t) => t.status === 'review').length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const overdue = tasks.filter((t) => t.isOverdue).length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const departments = [
    { name: 'ฝ่ายโยธาและสถาปัตย์', count: tasks.filter((t) => t.department.includes('โยธา')).length, icon: 'architecture' },
    { name: 'ฝ่ายเสบียงและขนส่ง', count: tasks.filter((t) => t.department.includes('เสบียง')).length, icon: 'inventory_2' },
    { name: 'ฝ่ายวิจัยและปลอดภัย', count: tasks.filter((t) => t.department.includes('วิจัย')).length, icon: 'biotech' },
    { name: 'ฝ่ายจัดซื้อและพัสดุ', count: tasks.filter((t) => t.department.includes('จัดซื้อ')).length, icon: 'shopping_cart' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Hero Welcome banner */}
      <div className="bg-gradient-to-r from-[#194d28] to-[#034e23] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-[11px] font-bold text-[#b8f0bd] mb-3">
            <span className="material-symbols-outlined text-[15px]">hive</span>
            <span>Sprint 14 • สรุปสถานการณ์รังมดรายวัน</span>
          </div>
          <h2 className="text-[24px] sm:text-[28px] font-bold leading-tight">
            การขับเคลื่อนรังดำเนินไปอย่างมีวินัย
          </h2>
          <p className="text-white/80 text-[13px] sm:text-[14px] mt-2 leading-relaxed">
            อัตราความสำเร็จของสปรินต์อยู่ที่ {completionRate}% มีงานรอตรวจรับ {review} รายการที่ต้องการการตัดสินใจจากผู้บริหาร
          </p>
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <button
              type="button"
              onClick={() => onSelectTab('approval-center')}
              className="px-4 py-2 rounded-xl bg-[#b8f0bd] text-[#00210a] font-bold text-[13px] hover:bg-white transition-all shadow-xs flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>ตรวจรับงานค้าง ({review})</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('tasks')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-[13px] transition-all border border-white/20"
            >
              เปิดกระดานติดตามงาน
            </button>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none">
          <span className="material-symbols-outlined text-[200px]">hive</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-[#dde4de] shadow-xs flex flex-col">
          <span className="text-[12px] text-[#717970] font-medium">งานทั้งหมด</span>
          <span className="text-[26px] font-bold text-[#161d19] mt-1">{total}</span>
          <span className="text-[11px] text-[#194d28] mt-1 flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">checklist</span>
            ในสปรินต์นี้
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#dde4de] shadow-xs flex flex-col">
          <span className="text-[12px] text-[#717970] font-medium">กำลังดำเนินการ</span>
          <span className="text-[26px] font-bold text-[#194d28] mt-1">{inProgress}</span>
          <span className="text-[11px] text-[#717970] mt-1 flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">engineering</span>
            มดงานกำลังเร่งมือ
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#b8f0bd]/30 border border-[#b8f0bd] shadow-xs flex flex-col">
          <span className="text-[12px] text-[#00210a] font-bold">รอตรวจรับงาน</span>
          <span className="text-[26px] font-bold text-[#194d28] mt-1">{review}</span>
          <span className="text-[11px] text-[#1d502b] mt-1 font-semibold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">rate_review</span>
            ต้องตัดสินใจ
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#dde4de] shadow-xs flex flex-col">
          <span className="text-[12px] text-[#717970] font-medium">เสร็จสมบูรณ์</span>
          <span className="text-[26px] font-bold text-[#161d19] mt-1">{completed}</span>
          <span className="text-[11px] text-[#194d28] mt-1 font-semibold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">done_all</span>
            ผ่านการรับรองแล้ว
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#ffdad6]/40 border border-[#ffdad6] shadow-xs flex flex-col">
          <span className="text-[12px] text-[#ba1a1a] font-bold">เลยกำหนดส่ง</span>
          <span className="text-[26px] font-bold text-[#ba1a1a] mt-1">{overdue}</span>
          <span className="text-[11px] text-[#93000a] mt-1 font-semibold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">warning</span>
            ต้องเร่งรัดด่วน
          </span>
        </div>
      </div>

      {/* Two columns: Critical Action Items + Department Load */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Urgent / Pending Action Tasks */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-[#dde4de] shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#dde4de] pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#194d28] text-[20px]">bolt</span>
              <h3 className="text-[16px] font-bold text-[#161d19]">งานที่ต้องติดตามอย่างใกล้ชิด</h3>
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('tasks')}
              className="text-[12px] text-[#194d28] font-bold hover:underline"
            >
              ดูทั้งหมด →
            </button>
          </div>

          <div className="divide-y divide-[#dde4de]/60 flex flex-col">
            {tasks
              .filter((t) => t.priority === 'urgent' || t.isOverdue || t.status === 'review')
              .slice(0, 5)
              .map((t) => (
                <div
                  key={t.id}
                  onClick={() => onOpenTaskDetail(t)}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-[#eff5ef]/60 px-2 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-bold text-[12px] text-[#194d28]">#{t.code}</span>
                    <div className="min-w-0">
                      <h4 className="text-[13px] font-bold text-[#161d19] truncate">{t.title}</h4>
                      <p className="text-[11px] text-[#717970] truncate">{t.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {t.isOverdue && (
                      <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">
                        เลยกำหนด
                      </span>
                    )}
                    <span className="text-[11px] font-semibold text-[#194d28]">{t.progress}%</span>
                    <span className="text-[12px] text-[#717970]">{t.dueDate}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Right Col: Department Distribution */}
        <div className="bg-white rounded-2xl p-5 border border-[#dde4de] shadow-xs flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-[#dde4de] pb-3">
            <span className="material-symbols-outlined text-[#194d28] text-[20px]">hub</span>
            <h3 className="text-[16px] font-bold text-[#161d19]">ภาระงานแยกตามฝ่าย</h3>
          </div>

          <div className="space-y-3">
            {departments.map((dept) => (
              <div key={dept.name} className="p-3 rounded-xl bg-[#eff5ef] border border-[#dde4de] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#194d28] shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">{dept.icon}</span>
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-[#161d19]">{dept.name}</div>
                    <div className="text-[10px] text-[#717970]">{dept.count} งานที่กำลังดูแล</div>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-md bg-white text-[#194d28] text-[11px] font-bold border border-[#dde4de]">
                  {dept.count} งาน
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
