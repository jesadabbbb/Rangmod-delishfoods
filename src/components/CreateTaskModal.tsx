import React, { useState } from 'react';
import { Task, TaskPriority, TaskStatus } from '../types/colony';

interface CreateTaskModalProps {
  isOpen: boolean;
  initialStatus?: TaskStatus;
  onClose: () => void;
  onCreateTask: (newTask: Partial<Task>) => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  initialStatus = 'not_started',
  onClose,
  onCreateTask,
}) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('normal');
  const [dueDate, setDueDate] = useState('2025-05-02');
  const [assigneeId, setAssigneeId] = useState('ant1');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const assigneeMap: Record<string, { name: string; role: string; initials: string; department: string }> = {
    ant1: { name: 'สมชาย', role: 'โยธาและสถาปัตย์', initials: 'สช', department: 'ฝ่ายโยธาและสถาปัตย์' },
    ant2: { name: 'สถาพร', role: 'หัวหน้าช่างรัง', initials: 'สภ', department: 'ฝ่ายโยธาและสถาปัตย์' },
    ant3: { name: 'สมศรี', role: 'มดจัดซื้อ', initials: 'สม', department: 'ฝ่ายจัดซื้อและพัสดุ' },
    ant4: { name: 'วิเชียร', role: 'วิจัยและปลอดภัย', initials: 'วช', department: 'ฝ่ายวิจัยและปลอดภัย' },
    ant5: { name: 'นุชนาถ', role: 'เสบียงและขนส่ง', initials: 'นช', department: 'ฝ่ายเสบียงและขนส่ง' },
    ant6: { name: 'กิตติ', role: 'ช่างสำรวจ', initials: 'กต', department: 'ฝ่ายโยธาและสถาปัตย์' },
    lead1: { name: 'สร้อยมุก', role: 'หัวหน้ามดเสบียง', initials: 'สม', department: 'ฝ่ายเสบียงและขนส่ง' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('กรุณาระบุหัวข้อหรือชื่องาน');
      return;
    }

    const assigned = assigneeMap[assigneeId] || assigneeMap.ant1;
    const priorityLabel =
      priority === 'urgent'
        ? 'ด่วนมาก'
        : priority === 'high'
        ? 'ด่วน'
        : priority === 'low'
        ? 'ไม่เร่งด่วน'
        : 'ปกติ';

    // Format simple Thai date e.g. "2 พ.ค."
    const parts = dueDate.split('-');
    const day = parts[2] ? parseInt(parts[2], 10) : 2;
    const month = parts[1] ? parseInt(parts[1], 10) : 5;
    const thaiMonths = [
      '',
      'ม.ค.',
      'ก.พ.',
      'มี.ค.',
      'เม.ย.',
      'พ.ค.',
      'มิ.ย.',
      'ก.ค.',
      'ส.ค.',
      'ก.ย.',
      'ต.ค.',
      'พ.ย.',
      'ธ.ค.',
    ];
    const thaiDue = `${day} ${thaiMonths[month] || 'พ.ค.'}`;
    const fullThaiDue = `${day} ${thaiMonths[month] || 'พ.ค.'} 2568`;

    onCreateTask({
      title: title.trim(),
      priority,
      priorityLabel,
      description: description.trim() || 'มอบหมายงานตามแผนงานของสปรินต์',
      status: initialStatus,
      progress: initialStatus === 'in_progress' ? 10 : 0,
      dueDate: thaiDue,
      fullDueDate: fullThaiDue,
      department: assigned.department,
      assignee: {
        id: assigneeId,
        name: assigned.name,
        role: assigned.role,
        initials: assigned.initials,
        avatarColor: 'bg-primary/10 text-primary',
      },
      issuer: {
        name: 'คุณวรินทร',
        role: 'ราชินีมด (ผู้บริหาร)',
      },
    });

    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#161d19]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-5 z-10 max-h-[90vh] overflow-y-auto border border-[#dde4de] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dde4de] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#194d28] text-white flex items-center justify-center font-bold shadow-xs">
              <span className="material-symbols-outlined text-[20px]">add_task</span>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#161d19]">สั่งงานใหม่ในรังมด</h3>
              <p className="text-[12px] text-[#717970]">มอบหมายงานและกำหนดผู้รับผิดชอบตามสายบังคับบัญชา</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#717970] hover:bg-[#eff5ef] hover:text-[#161d19]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[12px] font-bold text-[#161d19] mb-1">
              หัวข้อหรือชื่องาน *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ระบุชื่องานที่ชัดเจน เช่น ขุดเจาะทางเชื่อมคลังเสบียง B2"
              className="w-full h-10 px-3 rounded-xl bg-[#eff5ef] text-[#161d19] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-[#161d19] mb-1">
                ระดับความเร่งด่วน
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full h-10 px-3 rounded-xl bg-[#eff5ef] text-[#161d19] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28] cursor-pointer"
              >
                <option value="urgent">🔥 ด่วนมาก (Critical)</option>
                <option value="high">⚡ ด่วน (High)</option>
                <option value="normal">🌱 ปกติ (Normal)</option>
                <option value="low">☕ ไม่เร่งด่วน (Low)</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#161d19] mb-1">
                กำหนดส่งมอบ (Due Date) *
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#eff5ef] text-[#161d19] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#161d19] mb-1">
              มอบหมายให้ (Assignee) *
            </label>
            <select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-[#eff5ef] text-[#161d19] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28] cursor-pointer"
            >
              <option value="ant1">🐜 สมชาย (ฝ่ายโยธาและสถาปัตย์)</option>
              <option value="ant2">🐜 สถาพร (ช่างใหญ่ฝ่ายโยธา)</option>
              <option value="ant3">🐜 สมศรี (ฝ่ายจัดซื้อและพัสดุ)</option>
              <option value="ant4">🐜 วิเชียร (ฝ่ายวิจัยและปลอดภัย)</option>
              <option value="ant5">🐜 นุชนาถ (ฝ่ายเสบียงและขนส่ง)</option>
              <option value="ant6">🐜 กิตติ (ช่างสำรวจเส้นทาง)</option>
              <option value="lead1">👑 สร้อยมุก (หัวหน้ามดเสบียง)</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#161d19] mb-1">
              รายละเอียดและข้อกำหนดส่งมอบ
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ระบุสิ่งที่ต้องการตรวจรับ เช่น รูปถ่ายหน้างาน ผลทดสอบ หรือเอกสารแนบ..."
              className="w-full p-3 rounded-xl bg-[#eff5ef] text-[#161d19] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#dde4de]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-[#414941] hover:bg-[#eff5ef] text-[13px] font-medium transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#194d28] hover:bg-[#143e20] text-white text-[13px] font-bold shadow-sm transition-all"
            >
              บันทึกและจ่ายงานทันที
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
