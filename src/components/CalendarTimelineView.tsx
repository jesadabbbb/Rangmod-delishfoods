import React from 'react';
import { Task } from '../types/colony';

interface CalendarTimelineViewProps {
  tasks: Task[];
  onOpenTaskDetail: (task: Task) => void;
}

export const CalendarTimelineView: React.FC<CalendarTimelineViewProps> = ({
  tasks,
  onOpenTaskDetail,
}) => {
  const scheduleDays = [
    {
      date: 'จันทร์ 21 เม.ย.',
      dayCode: '21 เม.ย.',
      isToday: false,
      isWarning: false,
    },
    {
      date: 'พฤหัสบดี 24 เม.ย.',
      dayCode: '24 เม.ย.',
      isToday: false,
      isWarning: true,
      warningLabel: 'เลยกำหนด 1 วัน',
    },
    {
      date: 'เสาร์ 26 เม.ย.',
      dayCode: '26 เม.ย.',
      isToday: true,
      isWarning: false,
    },
    {
      date: 'อาทิตย์ 27 เม.ย.',
      dayCode: '27 เม.ย.',
      isToday: false,
      isWarning: false,
    },
    {
      date: 'พุธ 30 เม.ย.',
      dayCode: '30 เม.ย.',
      isToday: false,
      isWarning: false,
    },
    {
      date: 'ศุกร์ 2 พ.ค.',
      dayCode: '2 พ.ค.',
      isToday: false,
      isWarning: false,
    },
    {
      date: 'จันทร์ 5 พ.ค.',
      dayCode: '5 พ.ค.',
      isToday: false,
      isWarning: false,
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#dde4de] flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dde4de] pb-4">
          <div>
            <h3 className="text-[18px] font-bold text-[#161d19]">
              ตารางกำหนดส่งมอบงานประจำสัปดาห์ (Week 17)
            </h3>
            <p className="text-[12px] text-[#717970] mt-0.5">
              แสดงกำหนดการส่งมอบงานทั้งหมดตามลำดับเวลาในรังมด
            </p>
          </div>
          <span className="text-[12px] px-3.5 py-1.5 rounded-full bg-[#b8f0bd] text-[#00210a] font-bold w-fit border border-[#9cd4a3]">
            เมษายน - พฤษภาคม 2568
          </span>
        </div>

        {/* Days Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {scheduleDays.map((day) => {
            const matchingTasks = tasks.filter((t) => t.dueDate === day.dayCode);

            return (
              <div
                key={day.date}
                className={`p-3 rounded-xl flex flex-col gap-2.5 transition-all min-h-[220px] ${
                  day.isToday
                    ? 'bg-[#b8f0bd]/25 border-2 border-[#194d28]'
                    : day.isWarning
                    ? 'bg-[#ffdad6]/20 border border-[#ffdad6]'
                    : 'bg-[#eff5ef] border border-[#dde4de]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[12px] font-bold ${
                      day.isToday
                        ? 'text-[#194d28]'
                        : day.isWarning
                        ? 'text-[#ba1a1a]'
                        : 'text-[#414941]'
                    }`}
                  >
                    {day.date}
                    {day.isToday && ' (วันนี้)'}
                  </span>

                  {day.isWarning && (
                    <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">
                      warning
                    </span>
                  )}
                </div>

                {matchingTasks.length === 0 ? (
                  <div className="text-[11px] text-[#717970] p-2 text-center my-auto">
                    ไม่มีกำหนดส่ง
                  </div>
                ) : (
                  matchingTasks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => onOpenTaskDetail(t)}
                      className={`p-2.5 rounded-lg shadow-xs cursor-pointer hover:shadow-md transition-all text-[12px] flex flex-col gap-1 border ${
                        t.status === 'completed'
                          ? 'bg-white border-[#dde4de] opacity-80'
                          : t.isOverdue
                          ? 'bg-[#ffdad6] text-[#93000a] border-[#ffdad6]'
                          : t.status === 'review'
                          ? 'bg-white border-[#194d28] text-[#161d19]'
                          : 'bg-white border-[#dde4de] text-[#161d19]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className={t.isOverdue ? 'text-[#93000a]' : 'text-[#194d28]'}>
                          #{t.code}
                        </span>
                        <span className="text-[10px] font-normal">{t.assignee.name}</span>
                      </div>
                      <span className="line-clamp-2 leading-snug">{t.title}</span>

                      {t.status === 'completed' && (
                        <span className="text-[10px] text-[#194d28] font-bold flex items-center gap-0.5 mt-0.5">
                          <span className="material-symbols-outlined text-[12px]">done</span>
                          เสร็จแล้ว
                        </span>
                      )}

                      {t.status === 'review' && (
                        <span className="text-[10px] text-[#194d28] font-bold flex items-center gap-0.5 mt-0.5">
                          <span className="material-symbols-outlined text-[12px]">rate_review</span>
                          รอตรวจรับ
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
