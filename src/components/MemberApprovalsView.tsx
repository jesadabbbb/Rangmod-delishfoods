import React from 'react';
import { NewMemberApplicant } from '../types/colony';

interface MemberApprovalsViewProps {
  applicants: NewMemberApplicant[];
  onApproveApplicant: (id: string) => void;
  onRejectApplicant: (id: string) => void;
}

export const MemberApprovalsView: React.FC<MemberApprovalsViewProps> = ({
  applicants,
  onApproveApplicant,
  onRejectApplicant,
}) => {
  const pendingList = applicants.filter((a) => a.status === 'pending');

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="p-5 rounded-2xl bg-white border border-[#dde4de] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[#194d28] text-[12px] font-bold mb-1">
            <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
            <span>MEMBERSHIP GATEWAY</span>
          </div>
          <h2 className="text-[20px] font-bold text-[#161d19]">
            อนุมัติสมาชิกใหม่ (Member Approvals)
          </h2>
          <p className="text-[13px] text-[#717970] mt-0.5">
            พิจารณาคุณสมบัติของมดงานที่ยื่นคำขอเข้าร่วมสังกัดรังมด
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-[#ffdad6] text-[#93000a] text-[12px] font-bold">
          รอการอนุมัติ {pendingList.length} รายการ
        </span>
      </div>

      <div className="space-y-4">
        {pendingList.length === 0 ? (
          <div className="p-12 rounded-2xl bg-white border border-[#dde4de] text-center text-[#717970]">
            <span className="material-symbols-outlined text-[42px] text-[#194d28] mb-2">how_to_reg</span>
            <p className="text-[15px] font-bold text-[#161d19]">ไม่มีคำขอสมัครสมาชิกใหม่ที่ค้างอยู่</p>
            <p className="text-[12px] text-[#717970] mt-1">มดงานที่สมัครทั้งหมดได้รับการตรวจสอบเรียบร้อยแล้ว</p>
          </div>
        ) : (
          pendingList.map((app) => (
            <div
              key={app.id}
              className="p-5 rounded-2xl bg-white border border-[#dde4de] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-[#194d28] transition-all"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#b8f0bd] text-[#00210a] flex items-center justify-center font-bold text-[14px] shrink-0">
                  🐜
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[15px] font-bold text-[#161d19]">{app.name}</span>
                    <span className="px-2 py-0.5 rounded bg-[#eff5ef] text-[#194d28] text-[11px] font-bold">
                      {app.colonyCode}
                    </span>
                    <span className="text-[11px] text-[#717970]">ยื่นเมื่อ {app.appliedDate}</span>
                  </div>
                  <div className="text-[12px] text-[#194d28] font-semibold mb-1">
                    สมัครเข้าสังกัด: {app.applyingDept}
                  </div>
                  <p className="text-[12px] text-[#414941] leading-relaxed">
                    ความสามารถพิเศษ: {app.specialty}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#dde4de]">
                <button
                  type="button"
                  onClick={() => onRejectApplicant(app.id)}
                  className="px-4 py-2 rounded-xl text-[#ba1a1a] hover:bg-[#ffdad6]/40 text-[12px] font-bold transition-colors"
                >
                  ปฏิเสธ
                </button>
                <button
                  type="button"
                  onClick={() => onApproveApplicant(app.id)}
                  className="px-5 py-2 rounded-xl bg-[#194d28] hover:bg-[#143e20] text-white text-[12px] font-bold shadow-xs transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  <span>อนุมัติรับเข้าสังกัด</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
