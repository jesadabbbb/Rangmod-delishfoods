export type TaskStatus = 'not_started' | 'in_progress' | 'review' | 'completed';

export type TaskPriority = 'urgent' | 'high' | 'normal' | 'low';

export interface TaskComment {
  id: string;
  author: string;
  role: string;
  time: string;
  content: string;
  avatar?: string;
}

export interface TaskAttachment {
  id: string;
  name: string;
  size: string;
  uploader: string;
  uploadedAt: string;
  type: 'pdf' | 'excel' | 'image' | 'doc';
}

export interface Task {
  id: string;
  code: string; // e.g. "MOD-088"
  title: string;
  description: string;
  detailedSpecs?: string;
  status: TaskStatus;
  priority: TaskPriority;
  priorityLabel: string; // "ด่วนมาก", "ด่วน", "ปกติ", "ไม่เร่งด่วน"
  assignee: {
    id: string;
    name: string;
    role: string;
    initials: string;
    avatarColor?: string;
  };
  issuer: {
    name: string;
    role: string;
  };
  department: string;
  departmentCode: 'civil' | 'logistics' | 'research' | 'security' | 'purchasing';
  dueDate: string; // e.g. "24 เม.ย."
  fullDueDate: string; // e.g. "24 เม.ย. 2568"
  progress: number; // 0 - 100
  isOverdue?: boolean;
  overdueText?: string;
  attachments: TaskAttachment[];
  comments: TaskComment[];
  revisionNote?: string;
  approvedAt?: string;
}

export type PerspectiveRole = 'queen' | 'officer' | 'worker';

export interface ColonyUser {
  id: string;
  name: string;
  roleTitle: string;
  roleKey: PerspectiveRole;
  avatarUrl: string;
  department?: string;
}

export interface ColonyMember {
  id: string;
  name: string;
  code: string;
  role: string;
  rank: 'queen' | 'officer' | 'worker';
  department: string;
  initials: string;
  activeTasksCount: number;
  completedTasksCount: number;
  pheromoneSignal: string;
  status: 'active' | 'on_duty' | 'resting';
}

export interface NewMemberApplicant {
  id: string;
  name: string;
  applyingDept: string;
  specialty: string;
  appliedDate: string;
  colonyCode: string;
  status: 'pending' | 'approved' | 'rejected';
}
