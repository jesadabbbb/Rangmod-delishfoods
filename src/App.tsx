import React, { useState, useMemo, useEffect } from 'react';
import { Task, TaskStatus, TaskPriority, PerspectiveRole, ColonyMember, NewMemberApplicant, ColonyUser } from './types/colony';
import {
  INITIAL_TASKS,
  INITIAL_MEMBERS,
  INITIAL_APPLICANTS,
  COLONY_PROFILES,
  COLONY_NOTIFICATIONS,
} from './data/initialData';
import { Sidebar, NavigationTab } from './components/Sidebar';
import { Header } from './components/Header';
import { KanbanBoard } from './components/KanbanBoard';
import { TableView } from './components/TableView';
import { TaskDrawer } from './components/TaskDrawer';
import { CreateTaskModal } from './components/CreateTaskModal';
import { DashboardView } from './components/DashboardView';
import { CalendarTimelineView } from './components/CalendarTimelineView';
import { ApprovalCenterView } from './components/ApprovalCenterView';
import { HierarchyView } from './components/HierarchyView';
import { MemberApprovalsView } from './components/MemberApprovalsView';
import { SettingsView } from './components/SettingsView';
import { ReportsView } from './components/ReportsView';
import { RegistrationView } from './components/RegistrationView';

export default function App() {
  // Persistence with localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('rong_mod_tasks');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [members, setMembers] = useState<ColonyMember[]>(() => {
    try {
      const saved = localStorage.getItem('rong_mod_members');
      return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
    } catch {
      return INITIAL_MEMBERS;
    }
  });

  const [applicants, setApplicants] = useState<NewMemberApplicant[]>(() => {
    try {
      const saved = localStorage.getItem('rong_mod_applicants');
      return saved ? JSON.parse(saved) : INITIAL_APPLICANTS;
    } catch {
      return INITIAL_APPLICANTS;
    }
  });

  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; desc: string; time: string; unread: boolean; type: string }>>(() => {
    try {
      const saved = localStorage.getItem('rong_mod_notifications');
      return saved ? JSON.parse(saved) : COLONY_NOTIFICATIONS;
    } catch {
      return COLONY_NOTIFICATIONS;
    }
  });

  const [profiles, setProfiles] = useState<Record<string, ColonyUser>>(() => {
    try {
      const saved = localStorage.getItem('rong_mod_profiles');
      return saved ? JSON.parse(saved) : COLONY_PROFILES;
    } catch {
      return COLONY_PROFILES;
    }
  });

  useEffect(() => {
    localStorage.setItem('rong_mod_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('rong_mod_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('rong_mod_applicants', JSON.stringify(applicants));
  }, [applicants]);

  useEffect(() => {
    localStorage.setItem('rong_mod_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('rong_mod_profiles', JSON.stringify(profiles));
  }, [profiles]);

  // Navigation & View Mode
  const [currentTab, setCurrentTab] = useState<NavigationTab>('tasks');
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [currentRole, setCurrentRole] = useState<PerspectiveRole>('queen');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('');
  const [filterDepartment, setFilterDepartment] = useState<string>('');

  // Modals & Drawer State
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createInitialStatus, setCreateInitialStatus] = useState<TaskStatus>('not_started');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const currentUser = profiles[currentRole] || COLONY_PROFILES.queen;

  const handleUpdateProfile = (updated: Partial<ColonyUser>) => {
    setProfiles((prev) => ({
      ...prev,
      [currentRole]: {
        ...prev[currentRole],
        ...updated,
      },
    }));
    showToast('อัปเดตข้อมูลโปรไฟล์เรียบร้อยแล้ว!');
  };

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Tab specific filter for 'my-tasks'
      if (currentTab === 'my-tasks') {
        if (currentRole === 'worker' && task.assignee.name !== 'สมชาย') {
          return false;
        }
        if (currentRole === 'officer' && task.assignee.name !== 'สถาพร' && task.departmentCode !== 'civil') {
          return false;
        }
        if (currentRole === 'queen' && task.issuer.name !== 'คุณวรินทร') {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCode = task.code.toLowerCase().includes(q);
        const matchTitle = task.title.toLowerCase().includes(q);
        const matchDesc = task.description.toLowerCase().includes(q);
        const matchAssignee = task.assignee.name.toLowerCase().includes(q);
        if (!matchCode && !matchTitle && !matchDesc && !matchAssignee) {
          return false;
        }
      }

      // Priority Filter
      if (filterPriority && task.priority !== filterPriority) {
        return false;
      }

      // Department Filter
      if (filterDepartment) {
        if (filterDepartment === 'tech' && !task.department.includes('โยธา')) return false;
        if (filterDepartment === 'ops' && !task.department.includes('เสบียง')) return false;
        if (filterDepartment === 'qa' && !task.department.includes('วิจัย')) return false;
      }

      return true;
    });
  }, [tasks, currentTab, currentRole, searchQuery, filterPriority, filterDepartment]);

  // Handlers
  const handleOpenTaskDetail = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  const handleCloseTaskDetail = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedTask(null), 250);
  };

  const handleApproveTask = (taskId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updated: Task = {
            ...t,
            status: 'completed',
            progress: 100,
            approvedAt: 'วันนี้',
            comments: [
              ...t.comments,
              {
                id: `comm-appr-${Date.now()}`,
                author: `${currentUser.name} (${currentUser.roleTitle})`,
                role: 'ผู้ตรวจรับ',
                time: 'เมื่อสักครู่',
                content: 'อนุมัติการตรวจรับงานเรียบร้อยแล้ว ผลงานผ่านเกณฑ์มาตรฐานของรังมด',
              },
            ],
          };
          if (selectedTask?.id === taskId) {
            setSelectedTask(updated);
          }
          return updated;
        }
        return t;
      })
    );

    showToast(`ราชินีมดตรวจรับงาน #${tasks.find((t) => t.id === taskId)?.code} เรียบร้อยแล้ว! สถานะอัปเดตเป็น เสร็จสมบูรณ์`);
  };

  const handleRequestRevision = (taskId: string, note: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updated: Task = {
            ...t,
            status: 'in_progress',
            revisionNote: note,
            comments: [
              ...t.comments,
              {
                id: `comm-rev-${Date.now()}`,
                author: `${currentUser.name} (${currentUser.roleTitle})`,
                role: 'ผู้ตรวจรับ',
                time: 'เมื่อสักครู่',
                content: `ส่งคำขอแก้ไขงาน: "${note}"`,
              },
            ],
          };
          if (selectedTask?.id === taskId) {
            setSelectedTask(updated);
          }
          return updated;
        }
        return t;
      })
    );

    showToast(`ส่งคำขอแก้ไขงาน #${tasks.find((t) => t.id === taskId)?.code} กลับไปยังผู้รับผิดชอบเรียบร้อยแล้ว`);
  };

  const handleUpdateProgress = (taskId: string, newProgress: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          let newStatus = t.status;
          if (newProgress === 100 && t.status !== 'completed') {
            newStatus = 'review';
          } else if (newProgress < 100 && t.status === 'completed') {
            newStatus = 'in_progress';
          } else if (newProgress > 0 && t.status === 'not_started') {
            newStatus = 'in_progress';
          }

          const updated: Task = {
            ...t,
            progress: newProgress,
            status: newStatus,
          };
          if (selectedTask?.id === taskId) {
            setSelectedTask(updated);
          }
          return updated;
        }
        return t;
      })
    );
  };

  const handleMoveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const progress =
            newStatus === 'completed'
              ? 100
              : newStatus === 'not_started'
              ? 0
              : t.progress === 0
              ? 25
              : t.progress;

          const updated: Task = {
            ...t,
            status: newStatus,
            progress,
          };
          if (selectedTask?.id === taskId) {
            setSelectedTask(updated);
          }
          return updated;
        }
        return t;
      })
    );
    showToast(`อัปเดตสถานะงานเป็น ${newStatus === 'completed' ? 'เสร็จสมบูรณ์' : newStatus === 'review' ? 'รอตรวจรับ' : newStatus === 'in_progress' ? 'กำลังทำ' : 'ยังไม่เริ่ม'}`);
  };

  const handleAddComment = (taskId: string, commentText: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newComment = {
            id: `comm-${Date.now()}`,
            author: `${currentUser.name} (${currentUser.roleTitle})`,
            role: currentUser.roleTitle,
            time: 'เมื่อสักครู่',
            content: commentText,
          };
          const updated: Task = {
            ...t,
            comments: [...t.comments, newComment],
          };
          if (selectedTask?.id === taskId) {
            setSelectedTask(updated);
          }
          return updated;
        }
        return t;
      })
    );
  };

  const handleAddAttachment = (taskId: string, fileName: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const isPdf = fileName.endsWith('.pdf');
          const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.csv');
          const newAtt = {
            id: `att-${Date.now()}`,
            name: fileName,
            size: '2.8 MB',
            uploader: currentUser.name,
            uploadedAt: 'เมื่อสักครู่',
            type: (isPdf ? 'pdf' : isExcel ? 'excel' : 'doc') as any,
          };
          const updated: Task = {
            ...t,
            attachments: [...t.attachments, newAtt],
          };
          if (selectedTask?.id === taskId) {
            setSelectedTask(updated);
          }
          return updated;
        }
        return t;
      })
    );
    showToast(`แนบเอกสาร "${fileName}" เรียบร้อยแล้ว`);
  };

  const handleCreateTask = (newTaskData: Partial<Task>) => {
    const nextNum = 110 + tasks.length;
    const newTask: Task = {
      id: `task-${Date.now()}`,
      code: `MOD-${nextNum}`,
      title: newTaskData.title || 'งานใหม่ในรังมด',
      description: newTaskData.description || 'มอบหมายงานตามแผนงานของสปรินต์',
      status: newTaskData.status || 'not_started',
      priority: newTaskData.priority || 'normal',
      priorityLabel: newTaskData.priorityLabel || 'ปกติ',
      progress: newTaskData.progress || 0,
      dueDate: newTaskData.dueDate || '5 พ.ค.',
      fullDueDate: newTaskData.fullDueDate || '5 พ.ค. 2568',
      department: newTaskData.department || 'ฝ่ายโยธาและสถาปัตย์',
      departmentCode: 'civil',
      assignee: newTaskData.assignee || {
        id: 'ant-somchai',
        name: 'สมชาย',
        role: 'โยธาและสถาปัตย์',
        initials: 'สช',
        avatarColor: 'bg-primary/10 text-primary',
      },
      issuer: {
        name: currentUser.name,
        role: currentUser.roleTitle,
      },
      attachments: [],
      comments: [
        {
          id: `comm-created-${Date.now()}`,
          author: `${currentUser.name} (${currentUser.roleTitle})`,
          role: 'ผู้สั่งการ',
          time: 'เมื่อสักครู่',
          content: 'มอบหมายงานให้ตามสายบังคับบัญชาของรังมด',
        },
      ],
    };

    setTasks((prev) => [newTask, ...prev]);
    showToast(`สั่งงานใหม่ #${newTask.code} เรียบร้อยแล้ว! แจ้งเตือนไปยังผู้รับผิดชอบทันที`);
  };

  const handleApproveApplicant = (id: string) => {
    const app = applicants.find((a) => a.id === id);
    if (!app) return;

    setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'approved' as const } : a)));

    // Add to members
    const newMember = {
      id: `m-${Date.now()}`,
      name: app.name,
      code: `WK-${Math.floor(Math.random() * 800) + 100}`,
      role: 'มดงานใหม่',
      rank: 'worker' as const,
      department: app.applyingDept,
      initials: app.name.slice(0, 2),
      activeTasksCount: 0,
      completedTasksCount: 0,
      pheromoneSignal: 'Worker-New',
      status: 'active' as const,
    };
    setMembers((prev) => [...prev, newMember]);
    showToast(`อนุมัติรับ ${app.name} เข้าสังกัด ${app.applyingDept} เรียบร้อยแล้ว!`);
  };

  const handleRejectApplicant = (id: string) => {
    setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'rejected' as const } : a)));
    showToast(`ปฏิเสธคำขอสมัครสมาชิกเรียบร้อยแล้ว`);
  };

  const handleRegisterApplicant = (newApplicant: NewMemberApplicant) => {
    setApplicants((prev) => [newApplicant, ...prev]);
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: 'มีคำขอสมัครสมาชิกใหม่',
        desc: `${newApplicant.name} ยื่นสมัครเข้า ${newApplicant.applyingDept} (${newApplicant.colonyCode})`,
        time: 'เมื่อสักครู่',
        unread: true,
        type: 'member',
      },
      ...prev,
    ]);
    showToast(`ส่งคำขอสมัครสมาชิก #${newApplicant.colonyCode} เรียบร้อยแล้ว!`);
  };

  const reviewCount = tasks.filter((t) => t.status === 'review').length;
  const myTasksCount = tasks.filter((t) => {
    if (currentRole === 'queen') return t.issuer.name === 'คุณวรินทร';
    if (currentRole === 'worker') return t.assignee.name === 'สมชาย';
    if (currentRole === 'officer') return t.assignee.name === 'สถาพร' || t.departmentCode === 'civil';
    return true;
  }).length;
  const pendingApplicantsCount = applicants.filter((a) => a.status === 'pending').length;

  if (currentTab === 'register') {
    return (
      <RegistrationView
        onBackToApp={() => setCurrentTab('tasks')}
        onRegisterSubmit={handleRegisterApplicant}
      />
    );
  }

  return (
    <div className="bg-[#f4fbf4] min-h-screen text-[#161d19] font-sans flex">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-60 bg-[#161d19] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-[13px] font-medium border border-white/20 animate-in slide-in-from-bottom duration-300">
          <span className="material-symbols-outlined text-[#b8f0bd] text-[20px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Fixed Sidebar */}
      <Sidebar
        currentTab={currentTab}
        currentRole={currentRole}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setIsMobileSidebarOpen(false);
        }}
        openCreateModal={() => {
          setCreateInitialStatus('not_started');
          setIsCreateModalOpen(true);
        }}
        reviewCount={reviewCount}
        myTasksCount={myTasksCount}
        pendingApplicantsCount={pendingApplicantsCount}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Container */}
      <div className="lg:pl-72 flex-1 flex flex-col min-h-screen w-full">
        {/* Fixed Header */}
        <Header
          currentRole={currentRole}
          currentUser={currentUser}
          onSwitchRole={setCurrentRole}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          notifications={notifications}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onNavigateToRegister={() => setCurrentTab('register')}
        />

        {/* Main Content Area */}
        <main className="relative pt-20 px-4 sm:px-8 py-6 min-h-[calc(100vh-4rem)] w-full">
          {/* View Container based on Current Tab */}
          {currentTab === 'tasks' || currentTab === 'my-tasks' ? (
            <div className="flex flex-col gap-6 w-full pb-12">
              {/* Top Command & Action Suite matching Image_10 & Image_11 */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#194d28] text-[12px] font-bold mb-1">
                      <span className="material-symbols-outlined text-[16px]">hive</span>
                      <span>Sprint 14</span>
                    </div>
                    <h1 className="text-[26px] sm:text-[30px] font-bold text-[#161d19] tracking-tight leading-tight">
                      {currentTab === 'my-tasks'
                        ? currentRole === 'queen'
                          ? 'งานที่มอบหมาย'
                          : 'งานของฉัน (My Tasks)'
                        : 'กระดานติดตามงาน (Tasks)'}
                    </h1>
                    <p className="text-[13px] text-[#414941] mt-0.5">
                      {currentTab === 'my-tasks'
                        ? currentRole === 'queen'
                          ? 'ติดตามและกำกับดูแลงานทั้งหมดที่ราชินีมดมอบหมายให้สมาชิกในรังปฏิบัติการ'
                          : `งานที่มอบหมายให้ ${currentUser.name} กำกับดูแลและส่งมอบ`
                        : 'ติดตามและอัปเดตสถานะงานทั้งหมดในรังมด'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    {/* View Switcher: Board vs Table/List */}
                    <div className="flex items-center p-1 rounded-xl bg-[#eff5ef] border border-[#dde4de] gap-1 shadow-xs">
                      <button
                        type="button"
                        onClick={() => setViewMode('kanban')}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px] font-bold transition-all ${
                          viewMode === 'kanban'
                            ? 'bg-white text-[#194d28] shadow-xs'
                            : 'text-[#414941] hover:text-[#161d19]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">view_kanban</span>
                        <span>บอร์ด</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setViewMode('table')}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px] font-bold transition-all ${
                          viewMode === 'table'
                            ? 'bg-white text-[#194d28] shadow-xs'
                            : 'text-[#414941] hover:text-[#161d19]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">table_rows</span>
                        <span>รายการ (List)</span>
                      </button>
                    </div>

                    {/* Create Task Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setCreateInitialStatus('not_started');
                        setIsCreateModalOpen(true);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#194d28] hover:bg-[#143e20] text-white text-[13px] font-bold shadow-sm transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                      <span>สร้างงานใหม่</span>
                    </button>
                  </div>
                </div>

                {/* Filter and Search Bar matching HTML & screenshot */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#717970] text-[18px]">
                      search
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ค้นหางาน หรือผู้รับผิดชอบ..."
                      className="w-full pl-9 pr-4 py-2 h-10 rounded-xl bg-[#eff5ef] text-[#161d19] placeholder:text-[#717970] text-[13px] border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28] transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="h-10 px-3 rounded-xl bg-[#eff5ef] text-[#161d19] text-[12px] font-semibold border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28] cursor-pointer"
                    >
                      <option value="">ทุกความสำคัญ</option>
                      <option value="urgent">ด่วนมาก</option>
                      <option value="high">ด่วน</option>
                      <option value="normal">ปกติ</option>
                    </select>

                    <select
                      value={filterDepartment}
                      onChange={(e) => setFilterDepartment(e.target.value)}
                      className="h-10 px-3 rounded-xl bg-[#eff5ef] text-[#161d19] text-[12px] font-semibold border border-[#dde4de] focus:outline-none focus:ring-2 focus:ring-[#194d28] cursor-pointer"
                    >
                      <option value="">ทุกฝ่ายงาน</option>
                      <option value="tech">โยธาและสถาปัตย์</option>
                      <option value="ops">เสบียงและขนส่ง</option>
                      <option value="qa">วิจัยและปลอดภัย</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* View 1: Kanban Board or View 2: Table */}
              {viewMode === 'kanban' ? (
                <KanbanBoard
                  tasks={filteredTasks}
                  onOpenTaskDetail={handleOpenTaskDetail}
                  onApproveTask={handleApproveTask}
                  onOpenCreateWithStatus={(status) => {
                    setCreateInitialStatus(status);
                    setIsCreateModalOpen(true);
                  }}
                  onMoveTask={handleMoveTask}
                />
              ) : (
                <TableView
                  tasks={filteredTasks}
                  onOpenTaskDetail={handleOpenTaskDetail}
                  onApproveTask={handleApproveTask}
                />
              )}
            </div>
          ) : currentTab === 'dashboard' ? (
            <DashboardView
              tasks={tasks}
              onOpenTaskDetail={handleOpenTaskDetail}
              onSelectTab={setCurrentTab}
            />
          ) : currentTab === 'calendar' ? (
            <CalendarTimelineView
              tasks={tasks}
              onOpenTaskDetail={handleOpenTaskDetail}
            />
          ) : currentTab === 'approval-center' ? (
            <ApprovalCenterView
              tasks={tasks}
              onOpenTaskDetail={handleOpenTaskDetail}
              onApproveTask={handleApproveTask}
            />
          ) : currentTab === 'hierarchy' ? (
            <HierarchyView members={members} />
          ) : currentTab === 'member-approvals' ? (
            <MemberApprovalsView
              applicants={applicants}
              onApproveApplicant={handleApproveApplicant}
              onRejectApplicant={handleRejectApplicant}
            />
          ) : currentTab === 'reports' ? (
            <ReportsView tasks={tasks} />
          ) : (
            <SettingsView
              currentUser={currentUser}
              onUpdateProfile={handleUpdateProfile}
            />
          )}
        </main>
      </div>

      {/* Slide-over Task Detail Drawer */}
      <TaskDrawer
        task={selectedTask}
        isOpen={isDrawerOpen}
        onClose={handleCloseTaskDetail}
        onUpdateProgress={handleUpdateProgress}
        onApproveTask={handleApproveTask}
        onRequestRevision={handleRequestRevision}
        onAddComment={handleAddComment}
        onAddAttachment={handleAddAttachment}
        currentUserName={currentUser.name}
      />

      {/* Modal: สั่งงานใหม่ (Create Task Dialog) */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        initialStatus={createInitialStatus}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
}
