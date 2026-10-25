import React from 'react';
import { ColonyMember } from '../types/colony';

interface HierarchyViewProps {
  members: ColonyMember[];
}

export const HierarchyView: React.FC<HierarchyViewProps> = ({ members }) => {
  const queen = members.filter((m) => m.rank === 'queen');
  const officers = members.filter((m) => m.rank === 'officer');
  const workers = members.filter((m) => m.rank === 'worker');

  const renderMemberCard = (member: ColonyMember) => (
    <div
      key={member.id}
      className="p-4 rounded-xl bg-white border border-[#dde4de] shadow-xs flex flex-col justify-between gap-3 hover:border-[#194d28] transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#eff5ef] text-[#194d28] border border-[#dde4de] flex items-center justify-center text-[13px] font-bold">
            {member.initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[14px] font-bold text-[#161d19]">{member.name}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#eff5ef] text-[#717970]">
                {member.code}
              </span>
            </div>
            <div className="text-[11px] text-[#194d28] font-medium">{member.role}</div>
          </div>
        </div>

        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
            member.status === 'active'
              ? 'bg-[#b8f0bd] text-[#00210a]'
              : member.status === 'on_duty'
              ? 'bg-[#eff5ef] text-[#194d28]'
              : 'bg-[#dde4de] text-[#717970]'
          }`}
        >
          {member.status === 'active'
            ? 'พร้อมปฏิบัติงาน'
            : member.status === 'on_duty'
            ? 'กำลังลุยงาน'
            : 'พักฟื้น'}
        </span>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#414941] pt-2 border-t border-[#dde4de]/60">
        <div>
          <span className="text-[#717970]">สังกัด: </span>
          <span className="font-medium">{member.department}</span>
        </div>
        <div>
          <span className="text-[#717970]">งานในมือ: </span>
          <span className="font-bold text-[#194d28]">{member.activeTasksCount} งาน</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Overview Banner */}
      <div className="p-5 rounded-2xl bg-white border border-[#dde4de] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[#194d28] text-[12px] font-bold mb-1">
            <span className="material-symbols-outlined text-[16px]">account_tree</span>
            <span>COLONY COMMAND STRUCTURE</span>
          </div>
          <h2 className="text-[20px] font-bold text-[#161d19]">
            สายบังคับบัญชาและสมาชิกในรัง (Hierarchy)
          </h2>
          <p className="text-[13px] text-[#717970] mt-0.5">
            โครงสร้างการกระจายอำนาจและการแบ่งงานตามบทบาทในรังมด
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-[#eff5ef] text-[#194d28] text-[12px] font-bold border border-[#dde4de]">
            รวม {members.length} สมาชิกที่ลงทะเบียน
          </span>
        </div>
      </div>

      {/* Tier 1: Queen */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[18px]">👑</span>
          <h3 className="text-[15px] font-bold text-[#161d19]">ราชินีมด (ผู้บริหารสูงสุด)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {queen.map(renderMemberCard)}
        </div>
      </div>

      {/* Tier 2: Officers */}
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex items-center gap-2">
          <span className="text-[18px]">🎖️</span>
          <h3 className="text-[15px] font-bold text-[#161d19]">หัวหน้ามดและนายช่างใหญ่ (Officers)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {officers.map(renderMemberCard)}
        </div>
      </div>

      {/* Tier 3: Workers */}
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex items-center gap-2">
          <span className="text-[18px]">🐜</span>
          <h3 className="text-[15px] font-bold text-[#161d19]">มดงานประจำฝ่าย (Worker Colony)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workers.map(renderMemberCard)}
        </div>
      </div>
    </div>
  );
};
