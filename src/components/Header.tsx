import React, { useState } from 'react';
import { PerspectiveRole, ColonyUser } from '../types/colony';

interface HeaderProps {
  currentRole: PerspectiveRole;
  currentUser: ColonyUser;
  onSwitchRole: (role: PerspectiveRole) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  notifications: Array<{ id: string; title: string; desc: string; time: string; unread: boolean; type: string }>;
  onOpenMobileSidebar: () => void;
  onNavigateToRegister?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  currentUser,
  onSwitchRole,
  searchQuery,
  onSearchChange,
  notifications,
  onOpenMobileSidebar,
  onNavigateToRegister
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#f4fbf4]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-4 sm:px-6 border-b border-[#dde4de]">
      {/* Mobile Hamburger & Search Input */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-[#414941] hover:bg-[#e9f0e9] hover:text-[#161d19]"
          title="เปิดเมนู"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#717970] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ค้นหารหัสงาน, ชื่องาน, หรือสมาชิก..."
            className="w-full pl-9 pr-3 py-2 h-10 rounded-xl bg-white text-[#161d19] placeholder:text-[#717970] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28] shadow-[0_1px_2px_rgba(0,33,10,0.04)] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#717970] hover:text-[#161d19]"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Perspective Switcher & User Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Perspective Switcher (Segmented Control) */}
        <div className="hidden md:flex items-center p-1 rounded-xl bg-[#e9f0e9] border border-[#dde4de]">
          <span className="text-[11px] font-medium text-[#414941] px-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">switch_account</span>
            <span>สลับมุมมอง:</span>
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onSwitchRole('queen')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[12px] font-semibold transition-all ${
                currentRole === 'queen'
                  ? 'bg-white text-[#194d28] shadow-[0_1px_2px_rgba(0,33,10,0.08)]'
                  : 'text-[#414941] hover:bg-[#dde4de]'
              }`}
            >
              <span className="text-[14px]">👑</span>
              <span>ราชินีมด</span>
            </button>

            <button
              type="button"
              onClick={() => onSwitchRole('officer')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[12px] font-medium transition-all ${
                currentRole === 'officer'
                  ? 'bg-white text-[#194d28] shadow-[0_1px_2px_rgba(0,33,10,0.08)] font-semibold'
                  : 'text-[#414941] hover:bg-[#dde4de]'
              }`}
            >
              <span className="text-[14px]">🐜</span>
              <span>หัวหน้ามด</span>
            </button>

            <button
              type="button"
              onClick={() => onSwitchRole('worker')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[12px] font-medium transition-all ${
                currentRole === 'worker'
                  ? 'bg-white text-[#194d28] shadow-[0_1px_2px_rgba(0,33,10,0.08)] font-semibold'
                  : 'text-[#414941] hover:bg-[#dde4de]'
              }`}
            >
              <span className="text-[14px]">🐜</span>
              <span>มดงาน</span>
            </button>
          </div>
        </div>

        {/* Quick Join Colony Button */}
        {onNavigateToRegister && (
          <button
            type="button"
            onClick={onNavigateToRegister}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#b8f0bd]/60 hover:bg-[#b8f0bd] text-[#00210a] text-[12px] font-bold border border-[#9cd4a3] transition-all"
            title="เปิดหน้าสมัครสมาชิกใหม่"
          >
            <span className="material-symbols-outlined text-[16px]">person_add</span>
            <span>สมัครสมาชิก</span>
          </button>
        )}

        {/* Notifications Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-[#414941] hover:bg-[#e9f0e9] hover:text-[#161d19] transition-colors relative flex items-center justify-center border border-transparent hover:border-[#dde4de]"
            title="การแจ้งเตือน"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#dde4de] py-2 z-50">
              <div className="px-4 py-2 border-b border-[#dde4de] flex items-center justify-between">
                <span className="font-bold text-[13px] text-[#161d19]">การแจ้งเตือนในรัง</span>
                <span className="text-[11px] text-[#194d28] font-semibold">{unreadCount} รายการใหม่</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-[#dde4de]/50">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-[#eff5ef] transition-colors cursor-pointer text-[12px]">
                    <div className="flex items-center justify-between font-semibold text-[#161d19]">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${n.type === 'warning' ? 'bg-[#ba1a1a]' : 'bg-[#194d28]'}`}></span>
                        {n.title}
                      </span>
                      <span className="text-[10px] text-[#717970] font-normal">{n.time}</span>
                    </div>
                    <p className="text-[#414941] mt-1 line-clamp-2">{n.desc}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 pt-2 pb-1 border-t border-[#dde4de] text-center">
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] text-[#194d28] font-semibold hover:underline"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-[#dde4de]"></div>

        {/* User Profile display */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-[13px] font-bold text-[#161d19] leading-tight">
              {currentUser.name}
            </span>
            <span className="text-[11px] text-[#194d28] font-medium flex items-center justify-end gap-1">
              <span>{currentUser.roleTitle}</span>
            </span>
          </div>
          <div className="relative shrink-0">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#194d28]/30 border border-white"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
              }}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#194d28] ring-2 ring-white"></span>
          </div>
        </div>
      </div>
    </header>
  );
};
