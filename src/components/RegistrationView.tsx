import React, { useState } from 'react';
import { NewMemberApplicant } from '../types/colony';

interface RegistrationViewProps {
  onBackToApp: () => void;
  onRegisterSubmit: (applicant: NewMemberApplicant) => void;
}

export const RegistrationView: React.FC<RegistrationViewProps> = ({
  onBackToApp,
  onRegisterSubmit,
}) => {
  const [fullName, setFullName] = useState('ภัทรพล สุทธิสิทธิ์');
  const [email, setEmail] = useState('phattaraphol.s@colony.local');
  const [phone, setPhone] = useState('089-456-7890');
  const [department, setDepartment] = useState('ฝ่ายโยธาและสถาปัตย์');
  const [jobTitle, setJobTitle] = useState('DevOps Engineer / Senior Developer');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generatedReqCode, setGeneratedReqCode] = useState('');

  const passwordLength = password.length;
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('กรุณายอมรับข้อกำหนดการใช้งานระบบเครือข่ายรังมด');
      return;
    }
    if (password.length < 8) {
      alert('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร');
      return;
    }
    if (password !== confirmPassword) {
      alert('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    const reqCode = `REQ-2025-${Math.floor(Math.random() * 899) + 100}`;
    setGeneratedReqCode(reqCode);

    const newApplicant: NewMemberApplicant = {
      id: `app-${Date.now()}`,
      name: fullName,
      applyingDept: department,
      specialty: `${jobTitle} (${email})`,
      appliedDate: 'วันนี้',
      colonyCode: reqCode,
      status: 'pending',
    };

    onRegisterSubmit(newApplicant);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f4fbf4] text-[#161d19] font-sans flex flex-col justify-between relative selection:bg-[#9cd4a3] selection:text-[#00210a]">
      {/* Background pattern grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40" 
        style={{
          backgroundImage: 'radial-gradient(#c1c9be 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Navbar matching Image */}
      <header className="relative z-10 w-full px-6 py-4 flex items-center justify-between border-b border-[#dde4de] bg-[#f4fbf4]/90 backdrop-blur-md">
        <div 
          onClick={onBackToApp}
          className="flex items-center gap-3 cursor-pointer group"
          title="กลับสู่หน้าหลักรังมด"
        >
          <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-[#dde4de] flex items-center justify-center p-1 overflow-hidden shrink-0">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDic2PTxCuBs_fkRTtWwsD2wOHS4NAEUItaDq31ew53qPPFz00ez8sQMi7_WOdxEl3Xiy7voCOqoe4xNOeIt-TzrLP0M9Ai4aYxsRPAwSyjwm9Q80CbrLGcaYtYaqZCPm3IuXVIGYK6A8E62w44Y1dJBDmZ_7s3GeZjV_GKt6i4ri9HzONrq4hZvaji8805hNA45E7Zp_XK5o3py3ZNpVOxfw76vDDnTu-Sx95m5C9c4U6A3vPQedWLBw"
              alt="Rong Mod Logo" 
              className="h-full w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[16px] text-[#161d19] tracking-tight group-hover:text-[#194d28] transition-colors">
                Rong Mod
              </span>
            </div>
            <p className="text-[11px] text-[#717970]">รังมด - Colony Workspace</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[12px] text-[#414941]">
          <span className="hidden sm:flex items-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-[17px] text-[#194d28]">verified_user</span>
            <span>Enterprise Security</span>
          </span>
          <span className="hidden sm:inline text-[#dde4de]">|</span>
          <button 
            type="button" 
            onClick={() => alert('ศูนย์ช่วยเหลือ: ติดต่อฝ่ายบุคคลหรือราชินีมดประจำสังกัด')}
            className="hover:text-[#194d28] transition-colors"
          >
            Help Center
          </button>
          <button
            type="button"
            onClick={onBackToApp}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#eff5ef] text-[#194d28] font-bold border border-[#dde4de] shadow-2xs transition-all flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>เข้าสู่ระบบ / หน้ารังมด</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
        {submitted ? (
          /* Submission Success State */
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-[#dde4de] p-8 text-center flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-[#b8f0bd] text-[#00210a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">mark_email_read</span>
            </div>
            <h2 className="text-[22px] font-bold text-[#161d19]">
              ส่งคำขอสมัครสมาชิกสำเร็จ!
            </h2>
            <div className="px-4 py-2 rounded-xl bg-[#eff5ef] text-[#194d28] font-mono font-bold text-[15px] border border-[#dde4de]">
              รหัสคำขอ: {generatedReqCode}
            </div>
            <p className="text-[13px] text-[#414941] max-w-md leading-relaxed">
              คำขอของคุณ <strong>{fullName}</strong> สำหรับสังกัด <strong>{department}</strong> ได้ถูกส่งไปยังศูนย์อนุมัติของราชินีมด (Queen Ant) เรียบร้อยแล้ว
            </p>
            <div className="p-4 rounded-xl bg-[#eff5ef] text-[12px] text-[#414941] text-left w-full border border-[#dde4de] space-y-1.5">
              <div className="font-bold text-[#161d19] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#194d28]">info</span>
                <span>ขั้นตอนถัดไป:</span>
              </div>
              <p>1. ผู้บริหารหรือราชินีมดจะตรวจสอบข้อมูลในแท็บ <strong>"อนุมัติสมาชิกใหม่"</strong></p>
              <p>2. เมื่อได้รับการอนุมัติ คุณจะได้รับสิทธิ์เข้าสู่พื้นที่ทำงาน Colony Workspace ทันที</p>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={onBackToApp}
                className="px-6 py-2.5 rounded-xl bg-[#194d28] text-white font-bold text-[13px] hover:bg-[#143e20] transition-all shadow-md"
              >
                กลับไปที่กระดานติดตามงาน (ดูการอนุมัติ)
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form Container */
          <div className="w-full flex flex-col items-center gap-6">
            {/* Enrollment Title Banner matching screenshot */}
            <div className="text-center flex flex-col items-center gap-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[11px] font-semibold text-[#414941] shadow-2xs border border-[#dde4de]">
                <span className="material-symbols-outlined text-[15px] text-[#194d28]">assignment_ind</span>
                <span>Colony Workspace Enrollment</span>
              </div>

              <div className="flex items-center gap-2">
                <h1 className="text-[28px] sm:text-[32px] font-bold text-[#161d19] tracking-tight">
                  สมัครสมาชิกใหม่
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#b8f0bd] text-[#00210a] text-[11px] font-bold">
                  Join Colony
                </span>
              </div>

              <p className="text-[13px] text-[#414941] leading-relaxed">
                "ทุกงานมีเจ้าของ ทุกความคืบหน้ามองเห็นได้" เชื่อมโยงจังหวะทำงานร่วมกันในเครือข่ายรังมด
              </p>
            </div>

            {/* Status Approval Callout Box matching screenshot */}
            <div className="w-full max-w-3xl p-3.5 rounded-2xl bg-[#eff5ef] border border-[#b8f0bd] flex items-start gap-3 text-[12px] text-[#1d502b]">
              <span className="material-symbols-outlined text-[#194d28] text-[20px] shrink-0 mt-0.5">
                info
              </span>
              <p className="leading-relaxed">
                <strong>สถานะรออนุมัติ:</strong> เมื่อส่งคำขอแล้ว บัญชีจะถูกส่งให้ผู้ดูแลระบบหรือราชินีมด (Queen Ant) ตรวจสอบและกำหนดระดับสิทธิ์ที่สอดคล้องกับผังองค์กรก่อนเริ่มใช้งาน
              </p>
            </div>

            {/* White Form Card */}
            <form 
              onSubmit={handleSubmit}
              className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-[#dde4de] p-6 sm:p-8 flex flex-col gap-6"
            >
              {/* SECTION 1: ข้อมูลส่วนบุคคลและสังกัดงาน */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-[#dde4de]/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#194d28] text-[20px]">badge</span>
                    <h3 className="text-[14px] font-bold text-[#161d19]">
                      1. ข้อมูลส่วนบุคคลและสังกัดงาน
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#717970]">ระบุข้อมูลทางการขององค์กร</span>
                </div>

                {/* Row 1: Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#161d19] mb-1">
                      ชื่อ - นามสกุล <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#717970] text-[18px]">
                        person
                      </span>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="ภัทรพล สุทธิสิทธิ์"
                        className="w-full pl-9 pr-3 py-2.5 h-11 rounded-xl bg-white text-[#161d19] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#161d19] mb-1">
                      อีเมลองค์กร <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#717970] text-[18px]">
                        alternate_email
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="phattaraphol.s@colony.local"
                        className="w-full pl-9 pr-3 py-2.5 h-11 rounded-xl bg-white text-[#161d19] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Phone & Department */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[12px] font-bold text-[#161d19]">
                        เบอร์โทรศัพท์ติดต่อ
                      </label>
                      <span className="text-[10px] text-[#717970]">ไม่บังคับ</span>
                    </div>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#717970] text-[18px]">
                        call
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="089-456-7890"
                        className="w-full pl-9 pr-3 py-2.5 h-11 rounded-xl bg-white text-[#161d19] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#161d19] mb-1">
                      แผนก / ฝ่ายสังกัด <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#717970] text-[18px]">
                        hub
                      </span>
                      <select
                        required
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full pl-9 pr-8 py-2.5 h-11 rounded-xl bg-white text-[#161d19] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28] transition-all cursor-pointer appearance-none"
                      >
                        <option value="ฝ่ายโยธาและสถาปัตย์">ฝ่ายโยธาและสถาปัตย์ (Civil & Architecture)</option>
                        <option value="ฝ่ายเสบียงและขนส่ง">ฝ่ายเสบียงและขนส่ง (Supply & Logistics)</option>
                        <option value="ฝ่ายวิจัยและปลอดภัย">ฝ่ายวิจัยและปลอดภัย (R&D & Security)</option>
                        <option value="ฝ่ายความมั่นคงรอบรัง">ฝ่ายความมั่นคงรอบรัง (Border Defense)</option>
                        <option value="ฝ่ายจัดซื้อและพัสดุ">ฝ่ายจัดซื้อและพัสดุ (Procurement)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#717970] text-[18px] pointer-events-none">
                        keyboard_arrow_down
                      </span>
                    </div>
                  </div>
                </div>

                {/* Row 3: Job Title */}
                <div>
                  <label className="block text-[12px] font-bold text-[#161d19] mb-1">
                    ตำแหน่งงาน (Job Title) <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#717970] text-[18px]">
                      work
                    </span>
                    <input
                      type="text"
                      required
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="DevOps Engineer / Senior Developer"
                      className="w-full pl-9 pr-3 py-2.5 h-11 rounded-xl bg-white text-[#161d19] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: บัญชีผู้ใช้และรหัสผ่านความปลอดภัย */}
              <div className="flex flex-col gap-4 pt-2">
                <div className="flex items-center justify-between border-b border-[#dde4de]/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#194d28] text-[20px]">lock</span>
                    <h3 className="text-[14px] font-bold text-[#161d19]">
                      2. บัญชีผู้ใช้และรหัสผ่านความปลอดภัย
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#717970]">เกณฑ์ขั้นต่ำ 8 ตัวอักษร</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Password */}
                  <div>
                    <label className="block text-[12px] font-bold text-[#161d19] mb-1">
                      รหัสผ่าน <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#717970] text-[18px]">
                        key
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-10 py-2.5 h-11 rounded-xl bg-white text-[#161d19] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717970] hover:text-[#161d19]"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-[12px] font-bold text-[#161d19] mb-1">
                      ยืนยันรหัสผ่าน <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#717970] text-[18px]">
                        pin
                      </span>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-10 py-2.5 h-11 rounded-xl bg-white text-[#161d19] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717970] hover:text-[#161d19]"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showConfirmPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Strength Indicator matching screenshot */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="w-full h-1.5 rounded-full bg-[#eff5ef] overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        passwordLength >= 8 ? (passwordsMatch ? 'bg-[#194d28] w-full' : 'bg-[#fdcc83] w-2/3') : passwordLength > 0 ? 'bg-[#ffdad6] w-1/3' : 'w-0'
                      }`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#717970]">
                    <span>
                      ความปลอดภัย:{' '}
                      <strong className={passwordLength >= 8 ? 'text-[#194d28]' : 'text-[#717970]'}>
                        {passwordLength >= 8 ? 'ระดับมาตรฐานองค์กร' : 'ขั้นต่ำ 8 ตัวอักษร'}
                      </strong>
                    </span>
                    <span className={passwordsMatch ? 'text-[#194d28] font-bold' : 'text-[#717970]'}>
                      {confirmPassword
                        ? passwordsMatch
                          ? '✓ รหัสผ่านตรงกันเรียบร้อย'
                          : 'พิมพ์รหัสให้ตรงกับช่องแรก'
                        : 'พิมพ์รหัสให้ตรงกับช่องแรก'}
                    </span>
                  </div>
                </div>

                {/* Security Governance Callout Box matching screenshot */}
                <div className="p-4 rounded-2xl bg-[#eff5ef] border border-[#dde4de] flex items-start gap-3 mt-1">
                  <div className="w-8 h-8 rounded-xl bg-white text-[#194d28] flex items-center justify-center shrink-0 border border-[#dde4de] shadow-2xs">
                    <span className="material-symbols-outlined text-[18px]">shield</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[13px] font-bold text-[#161d19]">
                        คำชี้แจงระดับสิทธิ์ภายในรังมด
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white text-[#194d28] text-[10px] font-bold border border-[#dde4de]">
                        Security Governance
                      </span>
                    </div>
                    <p className="text-[12px] text-[#414941] leading-relaxed">
                      สิทธิ์การใช้งาน (<strong>ราชินีมด (Queen)</strong> / <strong>หัวหน้ามด (Leader)</strong> / <strong>มดงาน (Worker)</strong>) จะถูกกำหนดโดยผู้ดูแลระบบขององค์กรตามโครงสร้างผังรังจริงหลังการอนุมัติ สมาชิกใหม่ไม่สามารถเลือกหรือเปลี่ยนสิทธิ์เองได้ เพื่อความปลอดภัยสูงสุดของข้อมูลโครงการ
                    </p>
                  </div>
                </div>

                {/* Checkbox agreement */}
                <label className="flex items-start gap-3 mt-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#194d28] rounded cursor-pointer"
                  />
                  <span className="text-[12px] text-[#414941] leading-relaxed">
                    ฉันยอมรับ <strong>ข้อกำหนดการใช้งานระบบเครือข่ายรังมด</strong> และ <strong>นโยบายความเป็นส่วนตัวขององค์กร</strong> ในการบันทึกสถานะงานและการติดตามภารกิจ
                  </span>
                </label>

                {/* Submit row matching screenshot */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#dde4de]">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#194d28] hover:bg-[#143e20] text-white text-[13px] font-bold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>ส่งคำขอสมัครสมาชิก (Submit Registration)</span>
                  </button>

                  <div className="text-[12px] text-[#414941]">
                    <span>มีบัญชีอยู่แล้ว? </span>
                    <button
                      type="button"
                      onClick={onBackToApp}
                      className="text-[#194d28] font-bold underline hover:text-[#143e20]"
                    >
                      เข้าสู่ระบบที่นี่
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Bottom Role Info Cards (3 grid cards) matching screenshot */}
            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
              <div className="p-3.5 rounded-2xl bg-white border border-[#dde4de] shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#b8f0bd] text-[#00210a] flex items-center justify-center font-bold text-[16px] shrink-0">
                  👑
                </div>
                <div>
                  <div className="text-[12px] font-bold text-[#161d19]">ราชินีมด (Queen Ant)</div>
                  <div className="text-[11px] text-[#717970]">ผู้อนุมัติสิทธิ์ & ผู้ดูแลระบบ</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#dde4de] shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#eff5ef] text-[#194d28] border border-[#dde4de] flex items-center justify-center font-bold text-[16px] shrink-0">
                  🐜
                </div>
                <div>
                  <div className="text-[12px] font-bold text-[#161d19]">หัวหน้ามด (Lead Ant)</div>
                  <div className="text-[11px] text-[#717970]">ผู้จัดการทีม & ผู้แจกจ่ายงาน</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#dde4de] shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#eff5ef] text-[#194d28] border border-[#dde4de] flex items-center justify-center font-bold text-[16px] shrink-0">
                  🐜
                </div>
                <div>
                  <div className="text-[12px] font-bold text-[#161d19]">มดงาน (Worker Ant)</div>
                  <div className="text-[11px] text-[#717970]">ผู้ขับเคลื่อนภารกิจประจำวัน</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer matching screenshot */}
      <footer className="relative z-10 w-full px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#717970] border-t border-[#dde4de] bg-[#f4fbf4]">
        <div>
          © 2025 Rong Mod Enterprise Colony Architecture. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => alert('Security Policy')} className="hover:underline">
            Security Policy
          </button>
          <span>·</span>
          <button type="button" onClick={() => alert('Terms of Service')} className="hover:underline">
            Terms of Service
          </button>
          <span>·</span>
          <button type="button" onClick={() => alert('Colony Status: All Systems Operational')} className="hover:underline">
            Colony Status
          </button>
        </div>
      </footer>
    </div>
  );
};
