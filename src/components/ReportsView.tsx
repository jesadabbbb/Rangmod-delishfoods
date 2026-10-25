import React from 'react';
import { Task } from '../types/colony';

interface ReportsViewProps {
  tasks: Task[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const review = tasks.filter((t) => t.status === 'review').length;
  const notStarted = tasks.filter((t) => t.status === 'not_started').length;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="p-5 rounded-2xl bg-white border border-[#dde4de] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[#194d28] text-[12px] font-bold mb-1">
            <span className="material-symbols-outlined text-[16px]">insights</span>
            <span>VELOCITY & PERFORMANCE</span>
          </div>
          <h2 className="text-[20px] font-bold text-[#161d19]">
            รายงานและสถิติการปฏิบัติงาน (Reports & Analytics)
          </h2>
          <p className="text-[13px] text-[#717970] mt-0.5">
            ภาพรวมประสิทธิภาพ ความเร็วการขุดเจาะ และสถิติการตรวจรับงานในสปรินต์ 14
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-[#dde4de] shadow-xs">
          <span className="text-[12px] font-medium text-[#717970]">อัตราความสำเร็จสปรินต์</span>
          <div className="text-[32px] font-bold text-[#194d28] mt-1">
            {total > 0 ? Math.round((completed / total) * 100) : 0}%
          </div>
          <div className="w-full h-2 rounded-full bg-[#eff5ef] mt-3 overflow-hidden">
            <div
              className="h-full bg-[#194d28] rounded-full"
              style={{ width: `${total > 0 ? Math.round((completed / total) * 100) : 0}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-[#717970] mt-2">
            เสร็จสิ้นแล้ว {completed} จากทั้งหมด {total} รายการ
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#dde4de] shadow-xs">
          <span className="text-[12px] font-medium text-[#717970]">ระยะเวลาเฉลี่ยในการตรวจรับ</span>
          <div className="text-[32px] font-bold text-[#161d19] mt-1">4.2 ชม.</div>
          <p className="text-[11px] text-[#194d28] font-semibold mt-3 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            เร็วกว่ารอบก่อนหน้า 18%
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#dde4de] shadow-xs">
          <span className="text-[12px] font-medium text-[#717970]">มดงานที่ปฏิบัติหน้าที่</span>
          <div className="text-[32px] font-bold text-[#161d19] mt-1">10 นาย</div>
          <p className="text-[11px] text-[#717970] mt-3">ครอบคลุม 5 ฝ่ายงานหลักในรัง</p>
        </div>
      </div>

      {/* Breakdown Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-[#dde4de] shadow-xs">
        <h3 className="text-[15px] font-bold text-[#161d19] mb-4">สถานะการกระจายงาน</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-[12px] mb-1 font-semibold">
              <span className="text-[#194d28]">เสร็จสมบูรณ์ ({completed})</span>
              <span>{total > 0 ? Math.round((completed / total) * 100) : 0}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#eff5ef]">
              <div
                className="h-full bg-[#194d28] rounded-full"
                style={{ width: `${(completed / total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[12px] mb-1 font-semibold">
              <span className="text-[#194d28]">รอตรวจรับ ({review})</span>
              <span>{total > 0 ? Math.round((review / total) * 100) : 0}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#eff5ef]">
              <div
                className="h-full bg-[#9cd4a3] rounded-full"
                style={{ width: `${(review / total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[12px] mb-1 font-semibold">
              <span className="text-[#717970]">กำลังทำ ({inProgress})</span>
              <span>{total > 0 ? Math.round((inProgress / total) * 100) : 0}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#eff5ef]">
              <div
                className="h-full bg-[#717970] rounded-full"
                style={{ width: `${(inProgress / total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[12px] mb-1 font-semibold">
              <span className="text-[#717970]">ยังไม่เริ่ม ({notStarted})</span>
              <span>{total > 0 ? Math.round((notStarted / total) * 100) : 0}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#eff5ef]">
              <div
                className="h-full bg-[#dde4de] rounded-full"
                style={{ width: `${(notStarted / total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
