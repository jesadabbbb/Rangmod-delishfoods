import React, { useState, useEffect } from 'react';
import { Task, TaskStatus } from '../types/colony';

interface TaskDrawerProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProgress: (taskId: string, newProgress: number) => void;
  onApproveTask: (taskId: string) => void;
  onRequestRevision: (taskId: string, comment: string) => void;
  onAddComment: (taskId: string, commentText: string) => void;
  onAddAttachment: (taskId: string, fileName: string) => void;
  currentUserName: string;
}

export const TaskDrawer: React.FC<TaskDrawerProps> = ({
  task,
  isOpen,
  onClose,
  onUpdateProgress,
  onApproveTask,
  onRequestRevision,
  onAddComment,
  onAddAttachment,
  currentUserName
}) => {
  const [commentInput, setCommentInput] = useState('');
  const [progressVal, setProgressVal] = useState(task?.progress || 0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [revisionNote, setRevisionNote] = useState('');

  useEffect(() => {
    if (task) {
      setProgressVal(task.progress);
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSliderChange = (val: number) => {
    setProgressVal(val);
    onUpdateProgress(task.id, val);
  };

  const handleSendComment = () => {
    if (!commentInput.trim()) return;
    onAddComment(task.id, commentInput.trim());
    setCommentInput('');
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSimulateUpload = () => {
    const fileName = prompt('ระบุชื่อไฟล์หลักฐานที่ต้องการแนบ (เช่น report_phase2.pdf):', 'work_inspection_evidence.pdf');
    if (fileName && fileName.trim()) {
      onAddAttachment(task.id, fileName.trim());
    }
  };

  const handleConfirmRevision = () => {
    if (!revisionNote.trim()) {
      alert('กรุณาระบุสิ่งที่ต้องการให้ผู้รับผิดชอบแก้ไข');
      return;
    }
    onRequestRevision(task.id, revisionNote.trim());
    setShowRevisionModal(false);
    setRevisionNote('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#161d19]/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-xl bg-white shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300 border-l border-[#dde4de]">
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-[#eff5ef] flex items-center justify-between border-b border-[#dde4de]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-[#194d28]/10 text-[#194d28] text-[15px] font-bold">
              #{task.code}
            </span>
            {task.priority === 'urgent' && (
              <span className="px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-bold">
                ด่วนมาก
              </span>
            )}
            {task.priority === 'high' && (
              <span className="px-2.5 py-1 rounded-full bg-[#b8f0bd] text-[#00210a] text-[11px] font-bold">
                ด่วน
              </span>
            )}
            {task.priority === 'normal' && (
              <span className="px-2.5 py-1 rounded-full bg-[#e9f0e9] text-[#414941] text-[11px] font-medium">
                ปกติ
              </span>
            )}
            {task.isOverdue && (
              <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">error</span>
                เลยกำหนด
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="p-2 rounded-lg text-[#414941] hover:bg-[#dde4de] transition-colors relative"
              title="คัดลอกลิงก์งาน"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
              {copiedLink && (
                <span className="absolute -bottom-8 right-0 bg-[#161d19] text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap shadow-md">
                  คัดลอกแล้ว!
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-[#414941] hover:bg-[#dde4de] transition-colors"
              title="ปิด"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title & Detailed Description */}
          <div>
            <h2 className="text-[20px] font-bold text-[#161d19] leading-tight">
              {task.title}
            </h2>
            <p className="text-[13px] text-[#414941] mt-2 leading-relaxed">
              {task.detailedSpecs || task.description}
            </p>
          </div>

          {/* Quick Colony Metas (Grid) */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#eff5ef] border border-[#dde4de]">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#717970] font-medium">ผู้สั่งงาน (Issuer)</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[14px]">👑</span>
                <span className="text-[13px] font-semibold text-[#161d19]">
                  {task.issuer.name} ({task.issuer.role})
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] text-[#717970] font-medium">ผู้รับผิดชอบหลัก (Assignee)</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[14px]">🐜</span>
                <span className="text-[13px] font-semibold text-[#161d19]">
                  {task.assignee.name} ({task.assignee.role})
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] text-[#717970] font-medium">กำหนดส่งมอบ (Due Date)</span>
              <div className="flex items-center gap-1.5 mt-1 text-[#161d19] text-[13px] font-medium">
                <span className="material-symbols-outlined text-[16px] text-[#194d28]">event</span>
                <span>{task.fullDueDate || task.dueDate}</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] text-[#717970] font-medium">สถานะงาน</span>
              <div className="flex items-center gap-1.5 mt-1 text-[#194d28] text-[13px] font-bold">
                {task.status === 'review' ? (
                  <>
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>รออนุมัติขั้นสุดท้าย</span>
                  </>
                ) : task.status === 'completed' ? (
                  <>
                    <span className="material-symbols-outlined text-[16px]">task_alt</span>
                    <span>เสร็จสมบูรณ์เรียบร้อย</span>
                  </>
                ) : task.status === 'in_progress' ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#194d28]"></span>
                    <span>กำลังดำเนินการ</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#717970]"></span>
                    <span className="text-[#717970]">ยังไม่เริ่ม</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Progress Adjustment Tool with Real-time Slider */}
          <div className="p-4 rounded-xl bg-[#eff5ef] border border-[#dde4de] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold text-[#161d19]">อัปเดตความคืบหน้าของงาน</span>
              <span className="text-[16px] font-bold text-[#194d28]">{progressVal}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progressVal}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-full accent-[#194d28] cursor-pointer h-2 bg-[#dde4de] rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[11px] text-[#717970]">
              <span>0% (ยังไม่เริ่ม)</span>
              <span>50% (ครึ่งทาง)</span>
              <span>100% (ส่งตรวจงาน)</span>
            </div>
          </div>

          {/* Deliverables / Attachments Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[14px] font-bold text-[#161d19] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#194d28]">attach_file</span>
                <span>เอกสารและหลักฐานการส่งงาน</span>
              </h4>
              <button
                type="button"
                onClick={handleSimulateUpload}
                className="text-[12px] font-semibold text-[#194d28] hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[15px]">upload_file</span>
                + แนบไฟล์เพิ่ม
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {task.attachments.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#eff5ef] text-center text-[#717970] text-[12px] border border-dashed border-[#dde4de]">
                  ยังไม่มีไฟล์หลักฐานแนบ สามารถกดปุ่ม "+ แนบไฟล์เพิ่ม" ด้านบน
                </div>
              ) : (
                task.attachments.map((att) => (
                  <div
                    key={att.id}
                    className="p-3 rounded-xl bg-[#eff5ef] flex items-center justify-between hover:bg-[#e9f0e9] transition-colors border border-[#dde4de]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#194d28] text-[22px]">
                        {att.type === 'pdf' ? 'picture_as_pdf' : att.type === 'excel' ? 'table_chart' : 'description'}
                      </span>
                      <div>
                        <div className="text-[12px] font-bold text-[#161d19]">{att.name}</div>
                        <div className="text-[11px] text-[#717970]">
                          {att.size} • อัปโหลดโดย {att.uploader} ({att.uploadedAt})
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`จำลองการดาวน์โหลดไฟล์: ${att.name}`)}
                      className="p-1.5 rounded-lg text-[#414941] hover:text-[#194d28] hover:bg-white transition-colors"
                      title="ดาวน์โหลดไฟล์"
                    >
                      <span className="material-symbols-outlined text-[18px]">download</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Discussion & Activity Feed */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[14px] font-bold text-[#161d19] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#194d28]">history</span>
              <span>บันทึกการส่งงานและพูดคุย (Discussion & Activity)</span>
            </h4>

            {/* Message Feed */}
            <div className="flex flex-col gap-3 pl-3 border-l-2 border-[#dde4de]">
              {task.comments.length === 0 ? (
                <p className="text-[12px] text-[#717970]">ยังไม่มีข้อความสนทนา เริ่มการสั่งการหรือส่งรายงานได้ที่ด้านล่าง</p>
              ) : (
                task.comments.map((c) => (
                  <div key={c.id} className="flex flex-col gap-1 text-[12px]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#161d19]">{c.author}</span>
                      <span className="text-[10px] text-[#717970]">{c.time}</span>
                    </div>
                    <p className="text-[#414941] bg-[#eff5ef] p-2.5 rounded-xl border border-[#dde4de]/80 leading-relaxed">
                      "{c.content}"
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Comment Input Box */}
            <div className="mt-2 flex flex-col gap-2">
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="พิมพ์ข้อความตอบกลับ หรือสั่งการเพิ่มเติม..."
                rows={2}
                className="w-full p-3 rounded-xl bg-[#eff5ef] text-[#161d19] placeholder:text-[#717970] text-[12px] focus:outline-none focus:ring-2 focus:ring-[#194d28] border border-[#dde4de]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendComment();
                  }
                }}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#717970]">
                  <button
                    type="button"
                    onClick={() => setCommentInput((prev) => prev + '@คุณวรินทร ')}
                    className="p-1 hover:text-[#194d28] rounded"
                    title="แท็กราชินีมด"
                  >
                    <span className="material-symbols-outlined text-[18px]">alternate_email</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSimulateUpload}
                    className="p-1 hover:text-[#194d28] rounded"
                    title="แนบเอกสาร"
                  >
                    <span className="material-symbols-outlined text-[18px]">attachment</span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleSendComment}
                  className="px-4 py-1.5 rounded-xl bg-[#194d28] text-white text-[12px] font-semibold hover:bg-[#143e20] transition-all flex items-center gap-1 shadow-xs"
                >
                  <span>ส่งความเห็น</span>
                  <span className="material-symbols-outlined text-[15px]">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Fixed Footer Action */}
        <div className="px-6 py-4 bg-[#eff5ef] border-t border-[#dde4de] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowRevisionModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#e3eae3] hover:bg-[#dde4de] text-[#161d19] text-[12px] font-semibold transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">replay</span>
            <span>ขอแก้ไขงาน (Request Edit)</span>
          </button>

          <button
            type="button"
            onClick={() => onApproveTask(task.id)}
            className="px-6 py-2.5 rounded-xl bg-[#194d28] text-white hover:bg-[#143e20] text-[13px] font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[19px]">verified</span>
            <span>อนุมัติและตรวจรับเสร็จสมบูรณ์</span>
          </button>
        </div>
      </div>

      {/* Revision Modal Dialog */}
      {showRevisionModal && (
        <div className="fixed inset-0 z-60 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-[#dde4de] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#dde4de] pb-2">
              <h3 className="font-bold text-[15px] text-[#161d19] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#ba1a1a]">assignment_return</span>
                ส่งข้อเสนอแนะให้แก้ไขงาน
              </h3>
              <button
                type="button"
                onClick={() => setShowRevisionModal(false)}
                className="text-[#717970] hover:text-[#161d19]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="text-[12px] text-[#414941]">
              งานจะถูกปรับสถานะเป็น "กำลังทำ" เพื่อให้ {task.assignee.name} ทำการปรับปรุงแก้ไข
            </p>
            <textarea
              value={revisionNote}
              onChange={(e) => setRevisionNote(e.target.value)}
              placeholder="ระบุสิ่งที่ต้องแก้ไข เช่น 'ให้เพิ่มความหนาของแผ่นกันซึมอีก 1 ชั้น และทดสอบแรงดันน้ำใหม่'"
              rows={3}
              className="w-full p-3 rounded-xl bg-[#eff5ef] text-[12px] text-[#161d19] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28]"
            />
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#dde4de]">
              <button
                type="button"
                onClick={() => setShowRevisionModal(false)}
                className="px-4 py-1.5 rounded-xl text-[12px] text-[#414941] hover:bg-[#eff5ef]"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleConfirmRevision}
                className="px-4 py-1.5 rounded-xl bg-[#ba1a1a] text-white text-[12px] font-bold hover:bg-[#93000a] shadow-xs"
              >
                ส่งกลับไปแก้ไข
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
