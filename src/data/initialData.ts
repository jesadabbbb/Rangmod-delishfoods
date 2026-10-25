import { Task, ColonyMember, NewMemberApplicant, ColonyUser } from '../types/colony';

export const COLONY_PROFILES: Record<string, ColonyUser> = {
  queen: {
    id: 'user-queen',
    name: 'คุณวรินทร',
    roleTitle: '👑 ราชินีมด (ผู้บริหาร)',
    roleKey: 'queen',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDraSQMOblKRgdHDtIOs77-LBhkcuFA9ZzfQ-B1QaXMoO2vTzIwmC1J2h9KV05djMOxiwIa6HSTegZQZWuRXWJT3lbPh0tv1b42wrXS9VcVovCTmcD_6J8u5rnaFFFCaiGtErIMUf3sEShxMDVANegNyXsorceB9jdwCjJLiFfnbkAj2QdMx-bDyH4jB-OQConHakNmASaJBeIej6IcQi5ZDXMqb99whHIVNPjJKt57XSsDmE6w7VCqgw',
    department: 'กองบัญชาการส่วนกลาง'
  },
  officer: {
    id: 'user-officer',
    name: 'สถาพร',
    roleTitle: '🐜 หัวหน้ามด (ช่างใหญ่)',
    roleKey: 'officer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'ฝ่ายโยธาและสถาปัตย์'
  },
  worker: {
    id: 'user-worker',
    name: 'สมชาย',
    roleTitle: '🐜 มดงาน (โยธา)',
    roleKey: 'worker',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'ฝ่ายโยธาและสถาปัตย์'
  }
};

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    code: 'MOD-088',
    title: 'ขยายแนวคลังอาหารชั้นใต้ดิน B-4',
    description: 'ระดมมดงาน 40 นายเข้าประจำจุดอุโมงค์ตะวันออก กำลังขุดเจาะชั้นหินแกรนิต พร้อมเสริมคานไม้ยางพารา ป้องกันน้ำหลากช่วงมรสุม',
    detailedSpecs: 'ขุดเจาะอุโมงค์กว้าง 3.5 เมตร ลึก 12 เมตร พร้อมฉีดพ่นเมือกยึดดินและโครงข่ายรากไม้รองรับน้ำหนักได้ไม่น้อยกว่า 5 ตัน',
    status: 'in_progress',
    priority: 'urgent',
    priorityLabel: 'ด่วนมาก',
    isOverdue: true,
    overdueText: 'เลยกำหนด 1 วัน',
    progress: 65,
    dueDate: '24 เม.ย.',
    fullDueDate: '24 เม.ย. 2568',
    department: 'โยธาและสถาปัตย์',
    departmentCode: 'civil',
    assignee: {
      id: 'ant-somchai',
      name: 'สมชาย',
      role: 'โยธาและสถาปัตย์',
      initials: 'สช',
      avatarColor: 'bg-primary/10 text-primary'
    },
    issuer: {
      name: 'คุณวรินทร',
      role: 'ราชินีมด (ผู้บริหาร)'
    },
    attachments: [
      {
        id: 'att-1',
        name: 'b4_granite_drilling_plan.pdf',
        size: '3.1 MB',
        uploader: 'สมชาย',
        uploadedAt: '23 เม.ย. 11:30 น.',
        type: 'pdf'
      }
    ],
    comments: [
      {
        id: 'comm-1',
        author: 'คุณวรินทร (ราชินีมด)',
        role: 'ผู้สั่งการ',
        time: '24 เม.ย. 08:00 น.',
        content: 'ช่วงนี้ความชื้นในดินเพิ่มขึ้น 12% ให้เสริมคานไม้สนคู่ขนานเพื่อความปลอดภัย'
      },
      {
        id: 'comm-2',
        author: 'สมชาย',
        role: 'มดงานโยธา',
        time: '24 เม.ย. 15:45 น.',
        content: 'กำลังเร่งมือครับ พบคอร์หินแข็งจึงชะลอเล็กน้อย คาดว่าจะเสร็จพร้อมส่งตรวจพรุ่งนี้เช้าครับ'
      }
    ]
  },
  {
    id: 'task-2',
    code: 'MOD-077',
    title: 'ส่งมอบโครงสร้างรังอนุบาลตัวอ่อน',
    description: 'รายงานผลอุณหภูมิ 7 วันย้อนหลัง พร้อมเอกสารรับรองความปลอดภัยโครงสร้างคานไม้และระบบระบายอากาศ',
    detailedSpecs: 'วิศวกรโครงสร้างส่งมอบแบบและงานก่อสร้าง พร้อมผลทดสอบอุณหภูมิคงที่ 28.5°C แนบรายงานอุณหภูมิ 7 วันย้อนหลัง พร้อมเอกสารรับรองความปลอดภัยโครงสร้างคานไม้',
    status: 'review',
    priority: 'urgent',
    priorityLabel: 'ด่วนมาก',
    progress: 95,
    dueDate: '26 เม.ย.',
    fullDueDate: '26 เม.ย. 2568',
    department: 'โยธาและสถาปัตย์',
    departmentCode: 'civil',
    assignee: {
      id: 'ant-sthaporn',
      name: 'สถาพร',
      role: 'หัวหน้าช่างรัง',
      initials: 'สภ',
      avatarColor: 'bg-primary-fixed text-on-primary-fixed'
    },
    issuer: {
      name: 'คุณวรินทร',
      role: 'ราชินีมด (ผู้บริหาร)'
    },
    attachments: [
      {
        id: 'att-2',
        name: 'blueprint_nursery_chamber_v2.pdf',
        size: '4.2 MB',
        uploader: 'สถาพร',
        uploadedAt: 'เมื่อวานนี้ 17:00 น.',
        type: 'pdf'
      },
      {
        id: 'att-3',
        name: 'temperature_log_7days.xlsx',
        size: '840 KB',
        uploader: 'ระบบเซ็นเซอร์อัตโนมัติ',
        uploadedAt: 'วันนี้ 08:30 น.',
        type: 'excel'
      }
    ],
    comments: [
      {
        id: 'comm-3',
        author: 'คุณวรินทร (ราชินีมด)',
        role: 'ผู้สั่งการ',
        time: '25 เม.ย. 14:20 น.',
        content: 'ขอให้ตรวจสอบอุณหภูมิห้องตัวอ่อนให้แน่ใจว่าไม่เกิน 29 องศาเซลเซียส ก่อนเปิดใช้งานจริงในวันอาทิตย์นี้'
      },
      {
        id: 'comm-4',
        author: 'สถาพร หัวหน้าช่างรัง',
        role: 'ผู้รับผิดชอบ',
        time: '26 เม.ย. 09:15 น.',
        content: 'ทำการติดตั้งม่านใยแมงมุมกรองความร้อนสองชั้นเรียบร้อยแล้วครับ ตอนนี้อุณหภูมิเฉลี่ยอยู่ที่ 28.3 องศาเซลเซียส พร้อมรับการตรวจรับงานครับ'
      }
    ]
  },
  {
    id: 'task-3',
    code: 'MOD-093',
    title: 'พัฒนาระบบสื่อสารด้วยฟีโรโมน V2.4',
    description: 'อัปเกรดความถี่เสารับสัญญาณเพื่อลดทอนสัญญาณรบกวนบริเวณทางเชื่อมห้องเก็บไข่และคลังเสบียงหลัก',
    detailedSpecs: 'เปลี่ยนสารผสมฟีโรโมนจาก Ester-base เป็น Terpenoid Complex เพื่อคงสภาพสัญญาณได้นานขึ้น 4 เท่าในความชื้นสูง',
    status: 'in_progress',
    priority: 'high',
    priorityLabel: 'ด่วน',
    progress: 40,
    dueDate: '2 พ.ค.',
    fullDueDate: '2 พ.ค. 2568',
    department: 'วิจัยและปลอดภัย',
    departmentCode: 'research',
    assignee: {
      id: 'ant-wichian',
      name: 'วิเชียร',
      role: 'วิจัยและปลอดภัย',
      initials: 'วช',
      avatarColor: 'bg-surface-container text-on-surface'
    },
    issuer: {
      name: 'คุณวรินทร',
      role: 'ราชินีมด (ผู้บริหาร)'
    },
    attachments: [
      {
        id: 'att-4',
        name: 'pheromone_v2_formula.pdf',
        size: '1.8 MB',
        uploader: 'วิเชียร',
        uploadedAt: '22 เม.ย. 10:15 น.',
        type: 'pdf'
      }
    ],
    comments: [
      {
        id: 'comm-5',
        author: 'วิเชียร',
        role: 'มดวิจัย',
        time: '23 เม.ย. 16:00 น.',
        content: 'ผลแล็บเบื้องต้นพบว่าค่ารัศมีการกระจายฟีโรโมนขยายตัวครอบคลุม 150 เมตรในอุโมงค์หลัก'
      }
    ]
  },
  {
    id: 'task-4',
    code: 'MOD-082',
    title: 'รายงานบัญชีคลังเมล็ดพันธุ์ประจำฤดู',
    description: 'รวบรวมตัวเลขเสบียงสุทธิและวิเคราะห์ความพอเพียงช่วงหน้าแล้ง พร้อมแผนจัดสรรปันส่วนมดงาน 1,200 นาย',
    detailedSpecs: 'วิเคราะห์ยอดเมล็ดหญ้า ข้าวสาลี และน้ำหวานสกัด เพื่อสำรองคลังฉุกเฉินอย่างน้อย 90 วัน',
    status: 'review',
    priority: 'normal',
    priorityLabel: 'ปกติ',
    progress: 90,
    dueDate: '27 เม.ย.',
    fullDueDate: '27 เม.ย. 2568',
    department: 'เสบียงและขนส่ง',
    departmentCode: 'logistics',
    assignee: {
      id: 'ant-nutchanat',
      name: 'นุชนาถ',
      role: 'เสบียงและขนส่ง',
      initials: 'นช',
      avatarColor: 'bg-surface-container text-on-surface'
    },
    issuer: {
      name: 'คุณวรินทร',
      role: 'ราชินีมด (ผู้บริหาร)'
    },
    attachments: [
      {
        id: 'att-5',
        name: 'grain_inventory_q2_summary.xlsx',
        size: '1.2 MB',
        uploader: 'นุชนาถ',
        uploadedAt: '26 เม.ย. 14:00 น.',
        type: 'excel'
      }
    ],
    comments: [
      {
        id: 'comm-6',
        author: 'นุชนาถ',
        role: 'เสบียงและขนส่ง',
        time: '26 เม.ย. 15:30 น.',
        content: 'ยอดคลังปัจจุบันมีเสบียงเกินเป้า 14% เตรียมตรวจรับเพื่อปิดรอบบัญชีได้เลยค่ะ'
      }
    ]
  },
  {
    id: 'task-5',
    code: 'MOD-101',
    title: 'จัดซื้อใบไม้เรดวู้ดเกรดพรีเมียม',
    description: 'จัดหาซัพพลายเออร์ 3 เจ้า นำตัวอย่างเข้าวิเคราะห์ความชื้นและสารกันเชื้อราสำหรับปูพื้นรังโซนเหนือ',
    detailedSpecs: 'ติดต่อซัพพลายเออร์ต้นเรดวู้ดภาคเหนือ เปรียบเทียบราคาต่อกิโลกรัมและตรวจสอบใบรับรองความสะอาดปราศจากสารฆ่าแมลง',
    status: 'not_started',
    priority: 'urgent',
    priorityLabel: 'ด่วนมาก',
    progress: 0,
    dueDate: '30 เม.ย.',
    fullDueDate: '30 เม.ย. 2568',
    department: 'มดจัดซื้อ',
    departmentCode: 'purchasing',
    assignee: {
      id: 'ant-somsri',
      name: 'สมศรี',
      role: 'มดจัดซื้อ',
      initials: 'สม',
      avatarColor: 'bg-surface-container text-on-surface'
    },
    issuer: {
      name: 'คุณวรินทร',
      role: 'ราชินีมด (ผู้บริหาร)'
    },
    attachments: [],
    comments: []
  },
  {
    id: 'task-6',
    code: 'MOD-106',
    title: 'สำรวจอุโมงค์ระบายอากาศห้องราชินี',
    description: 'ตรวจสอบการไหลเวียนของออกซิเจนและระดับก๊าซคาร์บอนไดออกไซด์ตลอดแนวปล่องลมตะวันตก',
    detailedSpecs: 'ใช้อุปกรณ์วัดแรงลมและตัวตรวจจับก๊าซ CO2 รายจุด พร้อมบันทึกพิกัดหากมีรอยรั่วหรือสิ่งอุดตัน',
    status: 'not_started',
    priority: 'normal',
    priorityLabel: 'ปกติ',
    progress: 0,
    dueDate: '5 พ.ค.',
    fullDueDate: '5 พ.ค. 2568',
    department: 'ช่างสำรวจ',
    departmentCode: 'civil',
    assignee: {
      id: 'ant-kitti',
      name: 'กิตติ',
      role: 'ช่างสำรวจ',
      initials: 'กต',
      avatarColor: 'bg-surface-container text-on-surface'
    },
    issuer: {
      name: 'สถาพร',
      role: 'หัวหน้าช่างรัง'
    },
    attachments: [],
    comments: []
  },
  {
    id: 'task-7',
    code: 'MOD-065',
    title: 'ซ่อมแซมกำแพงดินแนวชายแดน',
    description: 'ยาแนวช่องดินและเสริมความแข็งแรงของรากไม้รับแรงกระแทกบริเวณจุดตรวจลาดตระเวนรอบนอก',
    detailedSpecs: 'อัดดินเหนียวผสมเส้นใยใบสน 200 กิโลกรัม เคลือบผิวกันซึมน้ำฝน 100% เรียบร้อยสมบูรณ์',
    status: 'completed',
    priority: 'normal',
    priorityLabel: 'ปกติ',
    progress: 100,
    dueDate: '20 เม.ย.',
    fullDueDate: '20 เม.ย. 2568',
    department: 'โยธาและสถาปัตย์',
    departmentCode: 'security',
    assignee: {
      id: 'ant-prayuth',
      name: 'ประยุทธ',
      role: 'ช่างดิน',
      initials: 'ปย',
      avatarColor: 'bg-surface-container text-on-surface'
    },
    issuer: {
      name: 'คุณวรินทร',
      role: 'ราชินีมด (ผู้บริหาร)'
    },
    attachments: [
      {
        id: 'att-6',
        name: 'border_wall_completion_inspection.pdf',
        size: '2.4 MB',
        uploader: 'ประยุทธ',
        uploadedAt: '20 เม.ย. 18:00 น.',
        type: 'pdf'
      }
    ],
    comments: [
      {
        id: 'comm-7',
        author: 'ประยุทธ',
        role: 'ช่างดิน',
        time: '20 เม.ย. 17:30 น.',
        content: 'งานซ่อมกำแพงและยาแนวรากไม้เสร็จสมบูรณ์เรียบร้อยแล้วครับ'
      },
      {
        id: 'comm-8',
        author: 'คุณวรินทร (ราชินีมด)',
        role: 'ผู้ตรวจรับ',
        time: '21 เม.ย. 09:00 น.',
        content: 'อนุมัติการตรวจรับงานเรียบร้อย ขอบใจมดงานช่างดินทุกคน'
      }
    ],
    approvedAt: '21 เม.ย. 2568'
  },
  {
    id: 'task-8',
    code: 'MOD-058',
    title: 'ติดตั้งระบบตรวจวัดความชื้นเซ็นเซอร์',
    description: 'ติดตั้งเสร็จสมบูรณ์ 16 จุด เชื่อมต่อแดชบอร์ดตรวจจับเรียบร้อย ส่งสัญญาณ Real-time',
    detailedSpecs: 'เชื่อมต่อ NodeMCU เสารับสัญญาณ IOT ฟีโรโมน 16 โซน ส่งข้อมูลเข้าคลังข้อมูลรังมดทุก 5 นาที',
    status: 'completed',
    priority: 'normal',
    priorityLabel: 'ปกติ',
    progress: 100,
    dueDate: '18 เม.ย.',
    fullDueDate: '18 เม.ย. 2568',
    department: 'วิจัยและปลอดภัย',
    departmentCode: 'research',
    assignee: {
      id: 'ant-anant',
      name: 'อนันต์',
      role: 'ช่างเทคนิค',
      initials: 'อน',
      avatarColor: 'bg-surface-container text-on-surface'
    },
    issuer: {
      name: 'คุณวรินทร',
      role: 'ราชินีมด (ผู้บริหาร)'
    },
    attachments: [
      {
        id: 'att-7',
        name: 'sensor_grid_map_16nodes.pdf',
        size: '1.9 MB',
        uploader: 'อนันต์',
        uploadedAt: '18 เม.ย. 14:20 น.',
        type: 'pdf'
      }
    ],
    comments: [
      {
        id: 'comm-9',
        author: 'อนันต์',
        role: 'ช่างเทคนิค',
        time: '18 เม.ย. 16:00 น.',
        content: 'ระบบออนไลน์ครบทุก 16 โหนดเรียบร้อยครับ เชื่อมโยงสัญญาณเข้าศูนย์บัญชาการได้ 100%'
      }
    ],
    approvedAt: '19 เม.ย. 2568'
  }
];

export const INITIAL_MEMBERS: ColonyMember[] = [
  {
    id: 'm-1',
    name: 'คุณวรินทร',
    code: 'Q-01',
    role: 'ราชินีมด (ผู้บริหารสูงสุด)',
    rank: 'queen',
    department: 'กองบัญชาการส่วนกลาง',
    initials: 'วร',
    activeTasksCount: 8,
    completedTasksCount: 34,
    pheromoneSignal: 'Alpha-99 (Executive)',
    status: 'active'
  },
  {
    id: 'm-2',
    name: 'สถาพร',
    code: 'OF-04',
    role: 'หัวหน้าช่างรัง',
    rank: 'officer',
    department: 'ฝ่ายโยธาและสถาปัตย์',
    initials: 'สภ',
    activeTasksCount: 3,
    completedTasksCount: 22,
    pheromoneSignal: 'Beta-42 (Engineering)',
    status: 'active'
  },
  {
    id: 'm-3',
    name: 'สร้อยมุก',
    code: 'OF-02',
    role: 'หัวหน้ามดฝ่ายเสบียง',
    rank: 'officer',
    department: 'ฝ่ายเสบียงและขนส่ง',
    initials: 'สม',
    activeTasksCount: 4,
    completedTasksCount: 19,
    pheromoneSignal: 'Beta-18 (Supply)',
    status: 'active'
  },
  {
    id: 'm-4',
    name: 'สมชาย',
    code: 'WK-102',
    role: 'มดงานขุดเจาะโยธา',
    rank: 'worker',
    department: 'ฝ่ายโยธาและสถาปัตย์',
    initials: 'สช',
    activeTasksCount: 2,
    completedTasksCount: 15,
    pheromoneSignal: 'Worker-55',
    status: 'on_duty'
  },
  {
    id: 'm-5',
    name: 'สมศรี',
    code: 'WK-204',
    role: 'มดงานฝ่ายจัดซื้อ',
    rank: 'worker',
    department: 'ฝ่ายจัดซื้อและพัสดุ',
    initials: 'สม',
    activeTasksCount: 1,
    completedTasksCount: 11,
    pheromoneSignal: 'Worker-12',
    status: 'active'
  },
  {
    id: 'm-6',
    name: 'วิเชียร',
    code: 'WK-301',
    role: 'มดวิจัยและฟีโรโมน',
    rank: 'worker',
    department: 'ฝ่ายวิจัยและปลอดภัย',
    initials: 'วช',
    activeTasksCount: 2,
    completedTasksCount: 9,
    pheromoneSignal: 'Worker-88',
    status: 'active'
  },
  {
    id: 'm-7',
    name: 'นุชนาถ',
    code: 'WK-405',
    role: 'มดสารบรรณและคลัง',
    rank: 'worker',
    department: 'ฝ่ายเสบียงและขนส่ง',
    initials: 'นช',
    activeTasksCount: 1,
    completedTasksCount: 14,
    pheromoneSignal: 'Worker-33',
    status: 'active'
  },
  {
    id: 'm-8',
    name: 'กิตติ',
    code: 'WK-502',
    role: 'มดสำรวจเส้นทาง',
    rank: 'worker',
    department: 'ฝ่ายโยธาและสถาปัตย์',
    initials: 'กต',
    activeTasksCount: 1,
    completedTasksCount: 8,
    pheromoneSignal: 'Worker-71',
    status: 'resting'
  },
  {
    id: 'm-9',
    name: 'ประยุทธ',
    code: 'WK-109',
    role: 'ช่างดินแนวหน้า',
    rank: 'worker',
    department: 'ฝ่ายความมั่นคงรอบรัง',
    initials: 'ปย',
    activeTasksCount: 0,
    completedTasksCount: 18,
    pheromoneSignal: 'Worker-09',
    status: 'resting'
  },
  {
    id: 'm-10',
    name: 'อนันต์',
    code: 'WK-314',
    role: 'ช่างเทคนิคเซ็นเซอร์',
    rank: 'worker',
    department: 'ฝ่ายวิจัยและปลอดภัย',
    initials: 'อน',
    activeTasksCount: 0,
    completedTasksCount: 16,
    pheromoneSignal: 'Worker-62',
    status: 'active'
  }
];

export const INITIAL_APPLICANTS: NewMemberApplicant[] = [
  {
    id: 'app-1',
    name: 'พิเชษฐ์ มดงานแรงงานใหม่',
    applyingDept: 'ฝ่ายโยธาและสถาปัตย์',
    specialty: 'เชี่ยวชาญการขนย้ายหินและแบกของหนัก 50 เท่าของน้ำหนักตัว',
    appliedDate: '25 เม.ย. 2568',
    colonyCode: 'REQ-2025-091',
    status: 'pending'
  },
  {
    id: 'app-2',
    name: 'ดวงใจ มดสกัดน้ำหวาน',
    applyingDept: 'ฝ่ายเสบียงและขนส่ง',
    specialty: 'ผ่านการทดสอบสกัดน้ำหวานเกสรดอกไม้บริสุทธิ์เกรด A',
    appliedDate: '26 เม.ย. 2568',
    colonyCode: 'REQ-2025-092',
    status: 'pending'
  }
];

export const COLONY_NOTIFICATIONS = [
  {
    id: 'n-1',
    title: 'มีงานรอการตรวจรับอนุมัติ',
    desc: '#MOD-077 ส่งมอบโครงสร้างรังอนุบาลตัวอ่อน โดย สถาพร',
    time: '15 นาทีที่แล้ว',
    unread: true,
    type: 'review'
  },
  {
    id: 'n-2',
    title: 'แจ้งเตือนงานเกินกำหนดส่ง',
    desc: '#MOD-088 ขยายแนวคลังอาหารชั้นใต้ดิน B-4 เลยกำหนด 1 วัน',
    time: '2 ชั่วโมงที่แล้ว',
    unread: true,
    type: 'warning'
  },
  {
    id: 'n-3',
    title: 'มีมดงานใหม่ยื่นขอเข้าสังกัดรัง',
    desc: 'พิเชษฐ์ และ ดวงใจ รอการอนุมัติ 2 รายการ',
    time: '3 ชั่วโมงที่แล้ว',
    unread: true,
    type: 'member'
  }
];
