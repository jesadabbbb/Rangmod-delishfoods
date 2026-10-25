import React, { useState } from 'react';
import { Task } from '../types/colony';

interface TableViewProps {
  tasks: Task[];
  onOpenTaskDetail: (task: Task) => void;
  onApproveTask: (taskId: string, e: React.MouseEvent) => void;
}

export const TableView: React.FC<TableViewProps> = ({
  tasks,
  onOpenTaskDetail,
  onApproveTask
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(tasks.length / itemsPerPage) || 1;
  const paginatedTasks = tasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusBadge = (task: Task) => {
    switch (task.status) {
      case 'review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#194d28] text-white text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[13px]">rate_review</span>
            รอตรวจรับ
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#194d28]/10 text-[#194d28] text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#194d28]"></span>
            กำลังทำ
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e3eae3] text-[#414941] text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[13px] text-[#194d28]">done</span>
            เสร็จสมบูรณ์
          </span>
        );
      case 'not_started':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e9f0e9] text-[#717970] text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#717970]"></span>
            ยังไม่เริ่ม
          </span>
        );
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde4de] overflow-hidden divide-y divide-[#dde4de]">
        {/* Table Rows (as responsive card-rows matching Image_11) */}
        {paginatedTasks.length === 0 ? (
          <div className="p-12 text-center text-[#717970]">
            <span className="material-symbols-outlined text-[36px] opacity-40 mb-2">search_off</span>
            <p className="text-[14px]">ไม่พบรายการงานที่ตรงกับเงื่อนไขการค้นหา</p>
          </div>
        ) : (
          paginatedTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onOpenTaskDetail(task)}
              className={`p-4 hover:bg-[#eff5ef]/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer ${
                task.status === 'review' ? 'bg-[#b8f0bd]/15' : ''
              } ${task.status === 'completed' ? 'opacity-80' : ''}`}
            >
              {/* Left Details: Status + Code + Title + Desc */}
              <div className="flex items-start md:items-center gap-3.5 flex-1 min-w-0">
                <div className="shrink-0">{getStatusBadge(task)}</div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-bold text-[#194d28] text-[12px]">#{task.code}</span>
                    <h4 className={`text-[14px] font-bold hover:text-[#194d28] transition-colors truncate ${
                      task.status === 'completed' ? 'line-through text-[#717970]' : 'text-[#161d19]'
                    }`}>
                      {task.title}
                    </h4>

                    {task.priority === 'urgent' && (
                      <span className="px-2 py-0.5 rounded-md bg-[#ffdad6] text-[#93000a] text-[11px] font-semibold">
                        ด่วนมาก
                      </span>
                    )}
                    {task.priority === 'high' && (
                      <span className="px-2 py-0.5 rounded-md bg-[#b8f0bd] text-[#00210a] text-[11px] font-semibold">
                        ด่วน
                      </span>
                    )}
                    {task.priority === 'normal' && (
                      <span className="px-2 py-0.5 rounded-md bg-[#e9f0e9] text-[#414941] text-[11px] font-medium">
                        ปกติ
                      </span>
                    )}

                    {task.isOverdue && (
                      <span className="text-[#ba1a1a] text-[11px] font-bold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">error</span>
                        {task.overdueText || 'เลยกำหนด'}
                      </span>
                    )}
                  </div>

                  <p className="text-[12px] text-[#414941] truncate leading-relaxed">
                    {task.description}
                  </p>
                </div>
              </div>

              {/* Right Side: Assignee + Progress Bar + Due Date + Action Button */}
              <div className="flex items-center justify-between md:justify-end gap-5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#dde4de]">
                {/* Assignee */}
                <div className="flex items-center gap-2 min-w-[110px]">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${task.assignee.avatarColor || 'bg-[#e9f0e9] text-[#161d19]'}`}>
                    {task.assignee.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-semibold text-[#161d19] leading-tight">
                      {task.assignee.name}
                    </span>
                    <span className="text-[10px] text-[#717970] truncate max-w-[90px]">
                      {task.assignee.role}
                    </span>
                  </div>
                </div>

                {/* Progress & Due Date */}
                <div className="flex flex-col w-28 gap-1">
                  <div className="flex items-center justify-between text-[11px] text-[#414941]">
                    <span className="font-semibold text-[#194d28]">{task.progress}%</span>
                    <span className={task.isOverdue ? 'text-[#ba1a1a] font-bold' : 'text-[#717970]'}>
                      {task.dueDate}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#e9f0e9] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        task.progress === 100 ? 'bg-[#194d28]' : task.progress > 0 ? 'bg-[#194d28]' : 'bg-[#717970]/30'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action button */}
                {task.status === 'review' ? (
                  <button
                    type="button"
                    onClick={(e) => onApproveTask(task.id, e)}
                    className="px-4 py-1.5 rounded-xl bg-[#194d28] hover:bg-[#143e20] text-white text-[12px] font-bold shadow-xs transition-colors whitespace-nowrap"
                  >
                    ตรวจรับงาน
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenTaskDetail(task);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#e9f0e9] hover:bg-[#dde4de] text-[#161d19] text-[12px] font-medium transition-colors whitespace-nowrap"
                  >
                    ดูรายละเอียด
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Footer matching screenshot */}
      <div className="p-4 bg-[#eff5ef] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[#414941] border border-[#dde4de]">
        <div>
          แสดง {paginatedTasks.length} จาก {tasks.length} รายการงานในสปรินต์นี้
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 rounded-lg bg-white text-[#161d19] border border-[#dde4de] disabled:opacity-40 hover:bg-[#e9f0e9] text-[12px] transition-colors"
          >
            ย้อนกลับ
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1 rounded-lg text-[12px] font-bold transition-colors ${
                currentPage === pageNum
                  ? 'bg-[#194d28] text-white shadow-xs'
                  : 'bg-white text-[#161d19] border border-[#dde4de] hover:bg-[#e9f0e9]'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1 rounded-lg bg-white text-[#161d19] border border-[#dde4de] disabled:opacity-40 hover:bg-[#e9f0e9] text-[12px] transition-colors"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
};
