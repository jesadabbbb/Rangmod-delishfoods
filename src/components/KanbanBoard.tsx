import React from 'react';
import { Task, TaskStatus } from '../types/colony';

interface KanbanBoardProps {
  tasks: Task[];
  onOpenTaskDetail: (task: Task) => void;
  onApproveTask: (taskId: string, e: React.MouseEvent) => void;
  onOpenCreateWithStatus?: (status: TaskStatus) => void;
  onMoveTask?: (taskId: string, newStatus: TaskStatus) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  onOpenTaskDetail,
  onApproveTask,
  onOpenCreateWithStatus,
  onMoveTask
}) => {
  const columns: { id: TaskStatus; title: string; count: number; isReview?: boolean }[] = [
    {
      id: 'not_started',
      title: 'ยังไม่เริ่ม',
      count: tasks.filter((t) => t.status === 'not_started').length,
    },
    {
      id: 'in_progress',
      title: 'กำลังทำ',
      count: tasks.filter((t) => t.status === 'in_progress').length,
    },
    {
      id: 'review',
      title: 'รอตรวจรับ',
      count: tasks.filter((t) => t.status === 'review').length,
      isReview: true,
    },
    {
      id: 'completed',
      title: 'เสร็จแล้ว',
      count: tasks.filter((t) => t.status === 'completed').length,
    },
  ];

  const getPriorityBadge = (task: Task) => {
    if (task.priority === 'urgent') {
      return (
        <span className="px-2 py-0.5 rounded-md bg-[#ffdad6] text-[#93000a] text-[11px] font-bold">
          ด่วนมาก
        </span>
      );
    }
    if (task.priority === 'high') {
      return (
        <span className="px-2 py-0.5 rounded-md bg-[#b8f0bd] text-[#00210a] text-[11px] font-bold">
          ด่วน
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-md bg-[#e9f0e9] text-[#414941] text-[11px] font-medium">
        ปกติ
      </span>
    );
  };

  return (
    <div className="w-full overflow-x-auto pb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 min-w-[960px]">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              className="bg-[#eff5ef]/60 rounded-2xl p-3 border border-[#dde4de] flex flex-col min-h-[550px]"
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                const taskId = e.dataTransfer.getData('text/plain');
                if (taskId && onMoveTask) {
                  onMoveTask(taskId, col.id);
                }
              }}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-2 py-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    col.id === 'not_started' ? 'bg-[#717970]' :
                    col.id === 'in_progress' ? 'bg-[#194d28]' :
                    col.id === 'review' ? 'bg-[#194d28]' :
                    'bg-[#717970]'
                  }`}></span>
                  <span className="font-bold text-[14px] text-[#161d19]">{col.title}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    col.isReview
                      ? 'bg-[#194d28] text-white'
                      : 'bg-[#dde4de] text-[#414941]'
                  }`}>
                    {col.count}
                  </span>
                </div>

                {col.id !== 'completed' && onOpenCreateWithStatus && (
                  <button
                    type="button"
                    onClick={() => onOpenCreateWithStatus(col.id)}
                    className="w-7 h-7 rounded-lg hover:bg-[#dde4de] text-[#414941] hover:text-[#161d19] flex items-center justify-center transition-colors"
                    title={`เพิ่มงานใน ${col.title}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                )}
              </div>

              {/* Task Cards List */}
              <div className="flex flex-col gap-3 flex-1">
                {colTasks.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-[#717970] border-2 border-dashed border-[#dde4de] rounded-xl">
                    <span className="material-symbols-outlined text-[28px] opacity-40 mb-1">inbox</span>
                    <span className="text-[12px]">ไม่มีงานในสถานะนี้</span>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', task.id);
                      }}
                      onClick={() => onOpenTaskDetail(task)}
                      className={`bg-white rounded-xl p-3.5 shadow-sm border border-[#dde4de] hover:border-[#194d28]/50 hover:shadow-md transition-all cursor-pointer flex flex-col gap-2.5 relative group ${
                        task.status === 'completed' ? 'opacity-85' : ''
                      }`}
                    >
                      {/* Top Row: Priority & Due Date */}
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {task.status === 'review' ? (
                            <span className="px-2 py-0.5 rounded-md bg-[#194d28] text-white text-[11px] font-semibold">
                              รอตรวจรับ
                            </span>
                          ) : task.status === 'completed' ? (
                            <span className="text-[11px] font-semibold text-[#194d28] flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">done</span>
                              เสร็จสมบูรณ์
                            </span>
                          ) : (
                            getPriorityBadge(task)
                          )}

                          {task.isOverdue && (
                            <span className="px-1.5 py-0.5 rounded-md bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[11px]">error</span>
                              เลยกำหนด
                            </span>
                          )}
                        </div>

                        <span className={`text-[11px] font-medium ${
                          task.isOverdue ? 'text-[#ba1a1a] font-bold' : 'text-[#717970]'
                        }`}>
                          {task.dueDate}
                        </span>
                      </div>

                      {/* Title & Desc */}
                      <div>
                        <h4 className={`text-[13px] font-bold leading-snug hover:text-[#194d28] transition-colors ${
                          task.status === 'completed' ? 'line-through text-[#414941]' : 'text-[#161d19]'
                        }`}>
                          {task.title}
                        </h4>
                        <p className="text-[12px] text-[#414941] mt-1 line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>
                      </div>

                      {/* Progress bar (if applicable) */}
                      {task.status === 'in_progress' && (
                        <div className="w-full">
                          <div className="w-full h-1.5 rounded-full bg-[#e9f0e9] overflow-hidden">
                            <div
                              className="h-full bg-[#194d28] rounded-full transition-all"
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Card Bottom Row: Assignee + Action / Progress % */}
                      <div className="flex items-center justify-between pt-1 border-t border-[#dde4de]/50">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${task.assignee.avatarColor || 'bg-[#e9f0e9] text-[#161d19]'}`}>
                            {task.assignee.initials}
                          </div>
                          <span className="text-[11px] font-medium text-[#414941]">
                            {task.assignee.name}
                          </span>
                        </div>

                        {task.status === 'review' ? (
                          <button
                            type="button"
                            onClick={(e) => onApproveTask(task.id, e)}
                            className="px-2.5 py-1 rounded-lg bg-[#194d28] hover:bg-[#143e20] text-white text-[11px] font-bold shadow-xs transition-colors flex items-center gap-1"
                          >
                            <span>ตรวจรับ</span>
                          </button>
                        ) : (
                          <span className={`text-[11px] font-semibold ${
                            task.progress === 100 ? 'text-[#194d28]' : 'text-[#717970]'
                          }`}>
                            {task.progress}%
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
