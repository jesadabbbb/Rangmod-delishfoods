import React from 'react';
import { PerspectiveRole } from '../types/colony';

export type NavigationTab = 
  | 'tasks'
  | 'dashboard'
  | 'my-tasks'
  | 'hierarchy'
  | 'calendar'
  | 'approval-center'
  | 'reports'
  | 'member-approvals'
  | 'register'
  | 'settings';

interface SidebarProps {
  currentTab: NavigationTab;
  currentRole?: PerspectiveRole;
  onSelectTab: (tab: NavigationTab) => void;
  openCreateModal: () => void;
  reviewCount: number;
  myTasksCount: number;
  pendingApplicantsCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  currentRole = 'queen',
  onSelectTab,
  openCreateModal,
  reviewCount,
  myTasksCount,
  pendingApplicantsCount,
  isOpenMobile,
  onCloseMobile
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-[#2b322e]/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`fixed left-0 top-0 h-full w-72 bg-[#eff5ef] shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between py-4 border-r border-[#dde4de] transition-transform duration-300 ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between px-4 pb-4 border-b border-[#dde4de]/60">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white shadow-[0_1px_3px_rgba(0,33,10,0.06)] flex items-center justify-center p-1 overflow-hidden shrink-0 border border-[#dde4de]">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDic2PTxCuBs_fkRTtWwsD2wOHS4NAEUItaDq31ew53qPPFz00ez8sQMi7_WOdxEl3Xiy7voCOqoe4xNOeIt-TzrLP0M9Ai4aYxsRPAwSyjwm9Q80CbrLGcaYtYaqZCPm3IuXVIGYK6A8E62w44Y1dJBDmZ_7s3GeZjV_GKt6i4ri9HzONrq4hZvaji8805hNA45E7Zp_XK5o3py3ZNpVOxfw76vDDnTu-Sx95m5C9c4U6A3vPQedWLBw" 
                  alt="Rong Mod Logo" 
                  className="h-full w-auto object-contain rounded-md"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== '/assets/aistudio/Image_6_283ac60e.png') {
                      target.src = '/assets/aistudio/Image_6_283ac60e.png';
                    } else {
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.innerHTML = '<span class="material-symbols-outlined text-[#194d28] text-[22px]">hive</span>';
                      }
                    }
                  }}
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-[17px] text-[#161d19] tracking-tight leading-none">รังมด</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#b8f0bd] text-[#00210a] text-[10px] font-bold tracking-wide">
                    Colony Core
                  </span>
                </div>
                <p className="text-[11px] text-[#414941] truncate mt-0.5">ทุกงานมีเจ้าของ</p>
              </div>
            </div>

            <button 
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-[#414941] hover:bg-[#e9f0e9] hover:text-[#161d19]"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Operational Hub Indicator */}
          <div className="px-4 py-3">
            <div className="px-3 py-2 rounded-xl bg-white shadow-[0_1px_2px_rgba(0,33,10,0.04)] flex items-center justify-between border border-[#dde4de]/80">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#194d28] text-[18px]">hive</span>
                <span className="text-[11px] font-semibold text-[#414941] uppercase tracking-wider">
                  Operational Hub
                </span>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#194d28]/10 text-[#194d28]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#194d28] mr-1 animate-pulse"></span>
                Live
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-3 space-y-4 text-[13px]">
            {/* Section 1 */}
            <div>
              <div className="px-2 pb-1.5">
                <span className="text-[11px] font-bold text-[#717970] uppercase tracking-wider">
                  หลักการทำงาน
                </span>
              </div>
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => onSelectTab('dashboard')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all text-left ${
                    currentTab === 'dashboard'
                      ? 'bg-[#194d28] text-white shadow-[0_1px_3px_rgba(0,33,10,0.1)]'
                      : 'text-[#414941] hover:bg-[#e9f0e9] hover:text-[#161d19]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">dashboard</span>
                    <span>Dashboard (ภาพรวม)</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectTab('my-tasks')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all text-left ${
                    currentTab === 'my-tasks'
                      ? 'bg-[#194d28] text-white shadow-[0_1px_3px_rgba(0,33,10,0.1)]'
                      : 'text-[#414941] hover:bg-[#e9f0e9] hover:text-[#161d19]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">
                      {currentRole === 'queen' ? 'assignment' : 'task_alt'}
                    </span>
                    <span>{currentRole === 'queen' ? 'งานที่มอบหมาย' : 'งานของฉัน (My Tasks)'}</span>
                  </div>
                  {myTasksCount > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      currentTab === 'my-tasks' ? 'bg-white/20 text-white' : 'bg-[#e3eae3] text-[#161d19]'
                    }`}>
                      {myTasksCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onSelectTab('tasks')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all text-left ${
                    currentTab === 'tasks'
                      ? 'bg-[#194d28] text-white shadow-[0_1px_3px_rgba(0,33,10,0.1)]'
                      : 'text-[#414941] hover:bg-[#e9f0e9] hover:text-[#161d19]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">view_kanban</span>
                    <span>รายการงานทั้งหมด</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={openCreateModal}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium text-[#194d28] hover:bg-[#b8f0bd]/40 transition-all text-left group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px] text-[#194d28]">add_task</span>
                    <span className="font-semibold">สั่งงานใหม่ (Create Task)</span>
                  </div>
                  <span className="material-symbols-outlined text-[#194d28] text-[18px] group-hover:scale-110 transition-transform">bolt</span>
                </button>
              </nav>
            </div>

            {/* Section 2 */}
            <div>
              <div className="px-2 pb-1.5">
                <span className="text-[11px] font-bold text-[#717970] uppercase tracking-wider">
                  การกำกับดูแล
                </span>
              </div>
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => onSelectTab('hierarchy')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all text-left ${
                    currentTab === 'hierarchy'
                      ? 'bg-[#194d28] text-white shadow-[0_1px_3px_rgba(0,33,10,0.1)]'
                      : 'text-[#414941] hover:bg-[#e9f0e9] hover:text-[#161d19]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">account_tree</span>
                    <span>ทีมและสมาชิก (Hierarchy)</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectTab('calendar')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all text-left ${
                    currentTab === 'calendar'
                      ? 'bg-[#194d28] text-white shadow-[0_1px_3px_rgba(0,33,10,0.1)]'
                      : 'text-[#414941] hover:bg-[#e9f0e9] hover:text-[#161d19]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                    <span>ปฏิทินกำหนดส่ง</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectTab('approval-center')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all text-left ${
                    currentTab === 'approval-center'
                      ? 'bg-[#194d28] text-white shadow-[0_1px_3px_rgba(0,33,10,0.1)]'
                      : 'text-[#414941] hover:bg-[#e9f0e9] hover:text-[#161d19]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                    <span>ศูนย์ตรวจรับงาน</span>
                  </div>
                  {reviewCount > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      currentTab === 'approval-center' ? 'bg-white/20 text-white' : 'bg-[#b8f0bd] text-[#1d502b]'
                    }`}>
                      {reviewCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onSelectTab('reports')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all text-left ${
                    currentTab === 'reports'
                      ? 'bg-[#194d28] text-white shadow-[0_1px_3px_rgba(0,33,10,0.1)]'
                      : 'text-[#414941] hover:bg-[#e9f0e9] hover:text-[#161d19]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">insights</span>
                    <span>รายงานและสถิติ</span>
                  </div>
                </button>
              </nav>
            </div>

            {/* Section 3 */}
            <div>
              <div className="px-2 pb-1.5">
                <span className="text-[11px] font-bold text-[#717970] uppercase tracking-wider">
                  การจัดการระบบ
                </span>
              </div>
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => onSelectTab('member-approvals')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all text-left ${
                    currentTab === 'member-approvals'
                      ? 'bg-[#194d28] text-white shadow-[0_1px_3px_rgba(0,33,10,0.1)]'
                      : 'text-[#414941] hover:bg-[#e9f0e9] hover:text-[#161d19]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                    <span>อนุมัติสมาชิกใหม่</span>
                  </div>
                  {pendingApplicantsCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#ffdad6] text-[#93000a] animate-pulse">
                      {pendingApplicantsCount} ใหม่
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onSelectTab('register')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all text-left ${
                    currentTab === 'register'
                      ? 'bg-[#194d28] text-white shadow-[0_1px_3px_rgba(0,33,10,0.1)]'
                      : 'text-[#194d28] hover:bg-[#b8f0bd]/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">person_add</span>
                    <span>สมัครสมาชิกใหม่ (Enroll)</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-[#b8f0bd] text-[#00210a] text-[10px] font-bold">
                    Join
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectTab('settings')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all text-left ${
                    currentTab === 'settings'
                      ? 'bg-[#194d28] text-white shadow-[0_1px_3px_rgba(0,33,10,0.1)]'
                      : 'text-[#414941] hover:bg-[#e9f0e9] hover:text-[#161d19]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">settings</span>
                    <span>ตั้งค่าระบบ</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Ant Security Footer */}
        <div className="px-4 pt-2">
          <div className="p-2.5 rounded-xl bg-[#e9f0e9] flex items-center justify-between border border-[#dde4de]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#194d28]">shield_with_heart</span>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#161d19] leading-tight">Ant Security</span>
                <span className="text-[10px] text-[#414941]">Data Protected</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#717970]">lock</span>
          </div>
        </div>
      </aside>
    </>
  );
};
