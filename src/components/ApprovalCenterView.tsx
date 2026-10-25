import React from 'react';
import { Task } from '../types/colony';

interface ApprovalCenterViewProps {
  tasks: Task[];
  onOpenTaskDetail: (task: Task) => void;
  onApproveTask: (taskId: string, e: React.MouseEvent) => void;
}

export const ApprovalCenterView: React.FC<ApprovalCenterViewProps> = ({
  tasks,
  onOpenTaskDetail,
  onApproveTask,
}) => {
  const pendingReviewTasks = tasks.filter((t) => t.status === 'review');
  const recentlyApprovedTasks = tasks.filter((t) => t.status === 'completed');

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-white border border-[#dde4de] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[#194d28] text-[12px] font-bold mb-1">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>EXECUTIVE QUALITY CONTROL</span>
          </div>
          <h2 className="text-[20px] font-bold text-[#161d19]">
            ศูนย์ตรวจรับงานและส่งมอบ (Approval Center)
          </h2>
          <p className="text-[13px] text-[#717970] mt-0.5">
            ตรวจพิจารณาผลงาน เอกสารแบบแปลน และบันทึกค่าทางวิศวกรรมก่อนอนุมัติเสร็จสิ้น
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-[#b8f0bd] text-[#00210a] text-[12px] font-bold">
            รอตรวจรับ {pendingReviewTasks.length} รายการ
          </span>
        </div>
      </div>

      {/* Pending Items List */}
      <div className="space-y-4">
        <h3 className="text-[15px] font-bold text-[#161d19] flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#194d28]"></span>
          <span>รายการที่รอการตรวจรับ ({pendingReviewTasks.length})</span>
        </h3>

        {pendingReviewTasks.length === 0 ? (
          <div className="p-12 rounded-2xl bg-white border border-[#dde4de] text-center text-[#717970]">
            <span className="material-symbols-outlined text-[42px] text-[#194d28] mb-2">task_alt</span>
            <p className="text-[15px] font-bold text-[#161d19]">ไม่มีงานค้างตรวจรับในขณะนี้</p>
            <p className="text-[12px] text-[#717970] mt-1">ทุกผลงานที่ส่งมอบได้รับการตรวจรับเรียบร้อยหมดแล้ว</p>
          </div>
        ) : (
          pendingReviewTasks.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-white border-2 border-[#194d28]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-[#194d28] transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-bold text-[#194d28] text-[13px]">#{t.code}</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#ffdad6] text-[#93000a] text-[11px] font-bold">
                    {t.priorityLabel}
                  </span>
                  <span className="text-[12px] text-[#717970]">
                    กำหนด: {t.fullDueDate || t.dueDate}
                  </span>
                </div>

                <h4 className="text-[16px] font-bold text-[#161d19] mb-1">
                  {t.title}
                </h4>
                <p className="text-[13px] text-[#414941] line-clamp-2 leading-relaxed">
                  {t.detailedSpecs || t.description}
                </p>

                {/* Evidence attachments summary */}
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  {t.attachments.map((att) => (
                    <div
                      key={att.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#eff5ef] text-[11px] text-[#161d19] border border-[#dde4de]"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#194d28]">
                        description
                      </span>
                      <span className="font-medium">{att.name}</span>
                      <span className="text-[#717970]">({att.size})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assignee and Action Buttons */}
              <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#dde4de]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#b8f0bd] text-[#00210a] flex items-center justify-center text-[12px] font-bold">
                    {t.assignee.initials}
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-[#161d19]">{t.assignee.name}</div>
                    <div className="text-[11px] text-[#717970]">{t.assignee.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenTaskDetail(t)}
                    className="px-3.5 py-2 rounded-xl bg-[#eff5ef] hover:bg-[#dde4de] text-[#161d19] text-[12px] font-semibold transition-colors"
                  >
                    ดูหลักฐาน
                  </button>

                  <button
                    type="button"
                    onClick={(e) => onApproveTask(t.id, e)}
                    className="px-4 py-2 rounded-xl bg-[#194d28] hover:bg-[#143e20] text-white text-[12px] font-bold shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>อนุมัติงาน</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* History of Recently Approved */}
      <div className="mt-4 space-y-3">
        <h3 className="text-[15px] font-bold text-[#161d19] flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#194d28]">history_edu</span>
          <span>ประวัติงานที่ตรวจรับเสร็จสมบูรณ์ล่าสุด ({recentlyApprovedTasks.length})</span>
        </h3>

        <div className="bg-white rounded-2xl border border-[#dde4de] shadow-xs divide-y divide-[#dde4de]">
          {recentlyApprovedTasks.map((t) => (
            <div
              key={t.id}
              onClick={() => onOpenTaskDetail(t)}
              className="p-4 hover:bg-[#eff5ef]/60 transition-colors flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="material-symbols-outlined text-[#194d28] text-[20px]">
                  task_alt
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[12px] text-[#194d28]">#{t.code}</span>
                    <h4 className="text-[13px] font-bold text-[#161d19] truncate">{t.title}</h4>
                  </div>
                  <p className="text-[11px] text-[#717970] truncate">{t.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 text-[12px]">
                <span className="text-[#414941]">ส่งโดย {t.assignee.name}</span>
                <span className="px-2.5 py-1 rounded-full bg-[#e3eae3] text-[#194d28] font-bold text-[11px]">
                  อนุมัติแล้ว 100%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
