import React, { useState, useRef } from 'react';
import { ColonyUser } from '../types/colony';

interface SettingsViewProps {
  currentUser: ColonyUser;
  onUpdateProfile: (updated: Partial<ColonyUser>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentUser,
  onUpdateProfile,
}) => {
  // Navigation sub-tab: only the requested profile, password, sound settings
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'profile' | 'password' | 'sound'>('all');

  // Profile states
  const [displayName, setDisplayName] = useState(currentUser.name);
  const [department, setDepartment] = useState(currentUser.department || 'กองบัญชาการส่วนกลาง');
  const [avatarPreview, setAvatarPreview] = useState(currentUser.avatarUrl);
  const [profileSavedSuccess, setProfileSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Sound & Notification states
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundTone, setSoundTone] = useState<'chime' | 'pulse' | 'fanfare'>('chime');
  const [soundVolume, setSoundVolume] = useState(75);
  const [soundOnUrgent, setSoundOnUrgent] = useState(true);
  const [soundOnReview, setSoundOnReview] = useState(true);
  const [soundSavedSuccess, setSoundSavedSuccess] = useState(false);

  // Predefined avatar collection for quick switching
  const sampleAvatars = [
    {
      name: 'ราชินีมดผู้บริหาร',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDraSQMOblKRgdHDtIOs77-LBhkcuFA9ZzfQ-B1QaXMoO2vTzIwmC1J2h9KV05djMOxiwIa6HSTegZQZWuRXWJT3lbPh0tv1b42wrXS9VcVovCTmcD_6J8u5rnaFFFCaiGtErIMUf3sEShxMDVANegNyXsorceB9jdwCjJLiFfnbkAj2QdMx-bDyH4jB-OQConHakNmASaJBeIej6IcQi5ZDXMqb99whHIVNPjJKt57XSsDmE6w7VCqgw',
    },
    {
      name: 'ช่างใหญ่ฝ่ายโครงสร้าง',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'มดงานวิศวกรรม',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'มดสำรวจเส้นทาง',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    },
  ];

  // Sound player using Web Audio API
  const playSoundEffect = (toneType: 'chime' | 'pulse' | 'fanfare', vol: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const gainNode = ctx.createGain();
      const gainValue = (vol / 100) * 0.25;
      gainNode.gain.setValueAtTime(gainValue, now);
      gainNode.connect(ctx.destination);

      if (toneType === 'pulse') {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (toneType === 'fanfare') {
        const notes = [587.33, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          const noteGain = ctx.createGain();
          noteGain.gain.setValueAtTime(gainValue * 0.9, now + idx * 0.12);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + (idx + 1) * 0.12 + 0.15);
          osc.connect(noteGain);
          noteGain.connect(ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + (idx + 1) * 0.12 + 0.18);
        });
      } else {
        // chime
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(880, now);
        osc2.frequency.setValueAtTime(1318.51, now + 0.08);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        osc1.start(now);
        osc2.start(now + 0.08);
        osc1.stop(now + 0.35);
        osc2.stop(now + 0.45);
      }
    } catch (err) {
      console.warn('Audio play error:', err);
    }
  };

  // Profile image upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('ขนาดไฟล์ต้องไม่เกิน 5 MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = event.target?.result as string;
        if (res) {
          setAvatarPreview(res);
          onUpdateProfile({ avatarUrl: res });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: displayName,
      department,
      avatarUrl: avatarPreview,
    });
    setProfileSavedSuccess(true);
    setTimeout(() => setProfileSavedSuccess(false), 2500);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      alert('กรุณากรอกรหัสผ่านปัจจุบัน');
      return;
    }
    if (newPassword.length < 8) {
      alert('รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 8 ตัวอักษร');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleSaveSoundSettings = () => {
    setSoundSavedSuccess(true);
    if (soundEnabled) {
      playSoundEffect(soundTone, soundVolume);
    }
    setTimeout(() => setSoundSavedSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl pb-16">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-white border border-[#dde4de] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[#194d28] text-[12px] font-bold mb-1">
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>SYSTEM CONFIGURATION</span>
          </div>
          <h2 className="text-[20px] font-bold text-[#161d19]">
            ตั้งค่าระบบรังมด (Colony Settings)
          </h2>
          <p className="text-[13px] text-[#717970] mt-0.5">
            จัดการรูปโปรไฟล์ เปลี่ยนรหัสผ่าน และเปิดปิดเสียงแจ้งเตือน
          </p>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#eff5ef] rounded-xl border border-[#dde4de] overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveSubTab('all')}
          className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'all'
              ? 'bg-white text-[#194d28] shadow-xs'
              : 'text-[#414941] hover:text-[#161d19]'
          }`}
        >
          ทั้งหมด
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('profile')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'profile'
              ? 'bg-white text-[#194d28] shadow-xs'
              : 'text-[#414941] hover:text-[#161d19]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">account_circle</span>
          <span>โปรไฟล์ & รูปภาพ</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('password')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'password'
              ? 'bg-white text-[#194d28] shadow-xs'
              : 'text-[#414941] hover:text-[#161d19]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">lock_reset</span>
          <span>เปลี่ยนรหัสผ่าน</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('sound')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'sound'
              ? 'bg-white text-[#194d28] shadow-xs'
              : 'text-[#414941] hover:text-[#161d19]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">volume_up</span>
          <span>เสียง & แจ้งเตือน</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* SECTION 1: อัพรูปโปรไฟล์และข้อมูลส่วนตัว */}
        {(activeSubTab === 'all' || activeSubTab === 'profile') && (
          <form 
            onSubmit={handleSaveProfile}
            className="bg-white rounded-2xl p-6 border border-[#dde4de] shadow-xs flex flex-col gap-5"
          >
            <div className="flex items-center justify-between border-b border-[#dde4de]/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#194d28] text-[20px]">account_box</span>
                <h3 className="text-[15px] font-bold text-[#161d19]">
                  รูปโปรไฟล์และข้อมูลผู้ใช้ (Profile & Avatar)
                </h3>
              </div>
              <span className="text-[11px] text-[#717970]">
                ตำแหน่ง: {currentUser.roleTitle}
              </span>
            </div>

            {profileSavedSuccess && (
              <div className="p-3 rounded-xl bg-[#b8f0bd]/40 border border-[#b8f0bd] text-[#00210a] text-[12px] font-bold flex items-center gap-2 animate-in fade-in">
                <span className="material-symbols-outlined text-[18px] text-[#194d28]">check_circle</span>
                <span>บันทึกข้อมูลและอัปเดตรูปโปรไฟล์สำเร็จเรียบร้อย</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar Preview & Upload Trigger */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative group">
                  <img
                    src={avatarPreview}
                    alt="Current Avatar"
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-[#194d28]/20 border-2 border-white shadow-md"
                    onError={(e) => {
                      e.currentTarget.src = sampleAvatars[0].url;
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="คลิกเพื่อเปลี่ยนรูป"
                  >
                    <span className="material-symbols-outlined text-[24px]">photo_camera</span>
                    <span className="text-[10px] font-semibold mt-0.5">เปลี่ยนรูป</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#194d28] text-white flex items-center justify-center shadow-md hover:bg-[#143e20] transition-colors border-2 border-white"
                    title="อัพโหลดรูปจากเครื่อง"
                  >
                    <span className="material-symbols-outlined text-[16px]">upload</span>
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl bg-[#eff5ef] hover:bg-[#dde4de] text-[#194d28] text-[12px] font-bold transition-colors flex items-center gap-1 border border-[#dde4de]"
                  >
                    <span className="material-symbols-outlined text-[15px]">file_upload</span>
                    <span>เลือกไฟล์รูป...</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAvatarPreview(currentUser.avatarUrl);
                      onUpdateProfile({ avatarUrl: currentUser.avatarUrl });
                    }}
                    className="px-2.5 py-1.5 rounded-xl text-[#717970] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/30 text-[12px] transition-colors"
                    title="รีเซ็ตเป็นรูปเดิม"
                  >
                    รีเซ็ต
                  </button>
                </div>
                <span className="text-[10px] text-[#717970]">รองรับ JPG, PNG, WEBP (ไม่เกิน 5MB)</span>
              </div>

              {/* Editable Fields & Preset Avatars */}
              <div className="flex-1 w-full space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#161d19] mb-1">
                      ชื่อที่แสดง (Display Name)
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-[#eff5ef] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#161d19] mb-1">
                      หน่วยงาน / สังกัด
                    </label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-[#eff5ef] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28]"
                    />
                  </div>
                </div>

                {/* Predefined Avatars Shortcut */}
                <div>
                  <label className="block text-[11px] font-bold text-[#717970] mb-2 uppercase tracking-wide">
                    หรือเลือกรูปสัญลักษณ์ประจำรัง:
                  </label>
                  <div className="flex items-center gap-3 flex-wrap">
                    {sampleAvatars.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setAvatarPreview(item.url);
                          onUpdateProfile({ avatarUrl: item.url });
                        }}
                        className={`flex items-center gap-2 p-1.5 pr-3 rounded-xl border transition-all text-left ${
                          avatarPreview === item.url
                            ? 'border-[#194d28] bg-[#b8f0bd]/20 ring-1 ring-[#194d28]'
                            : 'border-[#dde4de] hover:border-[#194d28]/50 bg-white'
                        }`}
                      >
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-[11px] font-semibold text-[#161d19]">{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#194d28] hover:bg-[#143e20] text-white text-[12px] font-bold shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">save</span>
                    <span>บันทึกข้อมูลโปรไฟล์</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* SECTION 2: เปิด-ปิดเสียงแจ้งเตือน */}
        {(activeSubTab === 'all' || activeSubTab === 'sound') && (
          <div className="bg-white rounded-2xl p-6 border border-[#dde4de] shadow-xs flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-[#dde4de]/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#194d28] text-[20px]">volume_up</span>
                <h3 className="text-[15px] font-bold text-[#161d19]">
                  การตั้งค่าเสียงแจ้งเตือน (Audio Alerts)
                </h3>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                soundEnabled ? 'bg-[#b8f0bd] text-[#00210a]' : 'bg-[#dde4de] text-[#717970]'
              }`}>
                {soundEnabled ? 'เปิดใช้งาน' : 'ปิดเสียง'}
              </span>
            </div>

            {soundSavedSuccess && (
              <div className="p-3 rounded-xl bg-[#b8f0bd]/40 border border-[#b8f0bd] text-[#00210a] text-[12px] font-bold flex items-center gap-2 animate-in fade-in">
                <span className="material-symbols-outlined text-[18px] text-[#194d28]">check_circle</span>
                <span>บันทึกการตั้งค่าเสียงแจ้งเตือนเรียบร้อย</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Master Sound Toggle */}
              <div className="p-4 rounded-xl bg-[#eff5ef] border border-[#dde4de] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    soundEnabled ? 'bg-[#194d28] text-white' : 'bg-[#dde4de] text-[#717970]'
                  }`}>
                    <span className="material-symbols-outlined text-[20px]">
                      {soundEnabled ? 'notifications_active' : 'notifications_off'}
                    </span>
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-[#161d19]">
                      เปิดเสียงแจ้งเตือนในระบบ (System Sound Effects)
                    </div>
                    <div className="text-[11px] text-[#717970]">
                      เล่นเสียงกริ่งเตือนเมื่อมีงานด่วน ส่งงาน หรือมีการตรวจรับ
                    </div>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#dde4de] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#c1c9be] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#194d28]"></div>
                </label>
              </div>

              {/* Sound Controls (Enabled only if sound is on) */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${!soundEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                <div>
                  <label className="block text-[12px] font-bold text-[#161d19] mb-1">
                    โทนเสียงแจ้งเตือน (Chime Tone)
                  </label>
                  <select
                    value={soundTone}
                    onChange={(e) => setSoundTone(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-xl bg-[#eff5ef] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28] cursor-pointer"
                  >
                    <option value="chime">🔔 เสียงกระดิ่งรังมด (Colony Chime)</option>
                    <option value="pulse">📻 เสียงคลื่นฟีโรโมน (Pheromone Pulse)</option>
                    <option value="fanfare">🎺 เสียงเตือนด่วนราชินี (Queen Royal Fanfare)</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[12px] font-bold text-[#161d19]">
                      ระดับความดังเสียง ({soundVolume}%)
                    </label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={soundVolume}
                    onChange={(e) => setSoundVolume(Number(e.target.value))}
                    className="w-full accent-[#194d28] cursor-pointer h-2 bg-[#dde4de] rounded-lg mt-2"
                  />
                </div>
              </div>

              {/* Test Button & Specific Triggers */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={soundOnUrgent}
                      onChange={(e) => setSoundOnUrgent(e.target.checked)}
                      disabled={!soundEnabled}
                      className="w-4 h-4 accent-[#194d28] rounded cursor-pointer"
                    />
                    <span className="text-[12px] text-[#161d19]">
                      ส่งเสียงเตือนเฉพาะงานที่กำหนดระดับ "ด่วนมาก" หรือ "เลยกำหนด"
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={soundOnReview}
                      onChange={(e) => setSoundOnReview(e.target.checked)}
                      disabled={!soundEnabled}
                      className="w-4 h-4 accent-[#194d28] rounded cursor-pointer"
                    />
                    <span className="text-[12px] text-[#161d19]">
                      ส่งเสียงกริ่งเมื่อมีมดงานส่งมอบงานรอตรวจรับ
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => playSoundEffect(soundTone, soundVolume)}
                    className="px-4 py-2 rounded-xl bg-[#eff5ef] hover:bg-[#b8f0bd] text-[#194d28] font-bold text-[12px] transition-all flex items-center justify-center gap-1.5 border border-[#dde4de] shadow-2xs shrink-0"
                  >
                    <span className="material-symbols-outlined text-[18px]">play_circle</span>
                    <span>ทดสอบเสียง (Test)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveSoundSettings}
                    className="px-4 py-2 rounded-xl bg-[#194d28] hover:bg-[#143e20] text-white font-bold text-[12px] transition-all flex items-center justify-center gap-1.5 shadow-xs shrink-0"
                  >
                    <span className="material-symbols-outlined text-[16px]">save</span>
                    <span>บันทึกเสียง</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: เปลี่ยนรหัสผ่าน */}
        {(activeSubTab === 'all' || activeSubTab === 'password') && (
          <form 
            onSubmit={handlePasswordSubmit} 
            className="bg-white rounded-2xl p-6 border border-[#dde4de] shadow-xs flex flex-col gap-5"
          >
            <div className="flex items-center justify-between border-b border-[#dde4de]/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#194d28] text-[20px]">lock_reset</span>
                <h3 className="text-[15px] font-bold text-[#161d19]">
                  เปลี่ยนรหัสผ่านความปลอดภัย (Security & Password)
                </h3>
              </div>
              <span className="text-[11px] text-[#717970]">
                ความยาวขั้นต่ำ 8 ตัวอักษร
              </span>
            </div>

            {passwordSuccess && (
              <div className="p-3.5 rounded-xl bg-[#b8f0bd]/40 border border-[#b8f0bd] text-[#00210a] text-[12px] font-bold flex items-center gap-2 animate-in fade-in">
                <span className="material-symbols-outlined text-[18px] text-[#194d28]">verified</span>
                <span>เปลี่ยนรหัสผ่านความปลอดภัยสำเร็จเรียบร้อยแล้ว</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Current Password */}
              <div>
                <label className="block text-[12px] font-bold text-[#161d19] mb-1">
                  รหัสผ่านปัจจุบัน <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#717970] text-[17px]">
                    key
                  </span>
                  <input
                    type={showCurrentPw ? 'text' : 'password'}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2 h-10 rounded-xl bg-[#eff5ef] text-[#161d19] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#717970] hover:text-[#161d19]"
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      {showCurrentPw ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-[12px] font-bold text-[#161d19] mb-1">
                  รหัสผ่านใหม่ <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#717970] text-[17px]">
                    lock
                  </span>
                  <input
                    type={showNewPw ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2 h-10 rounded-xl bg-[#eff5ef] text-[#161d19] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#717970] hover:text-[#161d19]"
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      {showNewPw ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[12px] font-bold text-[#161d19] mb-1">
                  ยืนยันรหัสผ่านใหม่ <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#717970] text-[17px]">
                    pin
                  </span>
                  <input
                    type={showConfirmPw ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2 h-10 rounded-xl bg-[#eff5ef] text-[#161d19] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw(!showConfirmPw)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#717970] hover:text-[#161d19]"
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      {showConfirmPw ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Password Validation Guidance */}
            {newPassword && (
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-[#717970]">
                  ความปลอดภัย:{' '}
                  <strong className={newPassword.length >= 8 ? 'text-[#194d28]' : 'text-[#ba1a1a]'}>
                    {newPassword.length >= 8 ? 'ปลอดภัยตามเกณฑ์' : 'ยังไม่ถึง 8 ตัวอักษร'}
                  </strong>
                </span>
                {confirmPassword && (
                  <span className={newPassword === confirmPassword ? 'text-[#194d28] font-bold' : 'text-[#ba1a1a]'}>
                    {newPassword === confirmPassword ? '✓ รหัสผ่านตรงกัน' : '✗ รหัสผ่านไม่ตรงกัน'}
                  </span>
                )}
              </div>
            )}

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#194d28] hover:bg-[#143e20] text-white text-[12px] font-bold shadow-xs transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">lock_reset</span>
                <span>อัปเดตรหัสผ่านใหม่</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
