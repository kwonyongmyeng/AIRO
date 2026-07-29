/**
 * AIRO 원페이지 사이트 콘텐츠.
 *
 * 주의: PRD에 따라 학력·경력·수상·수치 지표는 데모용 "가상 데이터"이다.
 * 실제 이력으로 교체할 때는 이 파일만 수정하면 전체 페이지에 반영된다.
 */

export type NavItem = { id: string; label: string };

export const site = {
  brand: "AIRO",
  tagline: "AI 리터러시 전도사",
  ownerName: "권용명",
  ownerNameEn: "Kwon Yong-myeng",
  ownerRole: "AIRO 대표 / 수석 강사",
  /**
   * 프로필 사진 경로. public/images/ 아래에 파일을 넣고 경로를 지정하면
   * 소개 섹션의 이니셜 아바타 대신 사진이 표시된다. (예: "/images/profile.jpg")
   */
  ownerPhoto: "" as string,
  email: "hopeplus7@gmail.com",
  phone: "02-1234-5678",
  officeHours: "평일 09:00 - 18:00 (주말 및 공휴일은 이메일 문의)",
  description:
    "AIRO는 권용명 대표의 AI 교육 전문 브랜드입니다. 최신 AI 기술을 누구나 쉽게 배우고 실무에 적용할 수 있도록 최적의 커리큘럼과 솔루션을 제공합니다.",
} as const;

export const navItems: NavItem[] = [
  { id: "home", label: "홈" },
  { id: "about", label: "강사 소개" },
  { id: "programs", label: "강의 프로그램" },
  { id: "solutions", label: "대상별 솔루션" },
  { id: "portfolio", label: "포트폴리오" },
  { id: "reviews", label: "수강 후기" },
  { id: "insights", label: "인사이트" },
  { id: "contact", label: "문의하기" },
];

/** 히어로 및 소개 섹션 핵심 지표 (가상 데이터) */
export const stats = [
  { label: "누적 강의 횟수", value: 1200, suffix: "+" },
  { label: "누적 수강생 수", value: 38000, suffix: "+" },
  { label: "기업·기관 교육", value: 320, suffix: "+" },
  { label: "평균 만족도", value: 4.9, suffix: "/5.0", decimals: 1 },
];

/** AIRO Method — 강의 철학 */
export const method = [
  {
    key: "A",
    title: "Accessible",
    korean: "쉬운 접근",
    description: "누구나 쉽게 접근하고 이해할 수 있는 AI 교육",
  },
  {
    key: "I",
    title: "Innovative",
    korean: "혁신적 전환",
    description: "기존의 방식을 혁신하는 AI 활용 프로세스",
  },
  {
    key: "R",
    title: "Real-world",
    korean: "실무 적용",
    description: "이론을 넘어 실무에 즉시 적용 가능한 솔루션",
  },
  {
    key: "O",
    title: "Outcome",
    korean: "성과 중심",
    description: "학습이 조직의 성과로 이어지는 결과 중심 설계",
  },
];

/** 학력 (가상 데이터) */
export const education = [
  {
    period: "2019.03 – 2021.02",
    school: "한국과학기술대학원",
    degree: "인공지능학과 공학석사",
    note: "학위논문: 생성형 AI 기반 직무교육 설계 모델 연구",
  },
  {
    period: "2007.03 – 2014.02",
    school: "한빛대학교",
    degree: "산업디자인학과 학사 (경영학 부전공)",
    note: "디자인·기술 융합 트랙 이수",
  },
  {
    period: "2023.06 – 2023.11",
    school: "AI Literacy Institute",
    degree: "국제 AI 리터러시 교육 지도자 과정 수료",
    note: "교수설계·평가체계 트랙",
  },
];

/** 경력 (가상 데이터) */
export const career = [
  {
    period: "2022.01 – 현재",
    company: "AIRO",
    role: "대표 / 수석 강사",
    points: [
      "기업·공공기관·대학 대상 AI 실무 교육 커리큘럼 총괄",
      "AIRO Method 기반 단계별 학습 로드맵 개발",
      "생성형 AI 도입 컨설팅 및 사내 강사 양성 과정 운영",
    ],
  },
  {
    period: "2019.03 – 2021.12",
    company: "넥스트웨이브 인재개발원",
    role: "AI 교육팀 팀장",
    points: [
      "전사 디지털 전환 교육 체계 설계 및 운영",
      "연간 200회 이상 사내·외부 교육 과정 기획",
    ],
  },
  {
    period: "2015.02 – 2019.02",
    company: "한성테크놀로지",
    role: "프로덕트 디자이너 (UX)",
    points: [
      "B2B SaaS 제품 UI/UX 설계 및 디자인 시스템 구축",
      "디자인-개발 협업 프로세스 표준화",
    ],
  },
  {
    period: "2013.03 – 2015.01",
    company: "크리에이티브랩",
    role: "콘텐츠 기획자",
    points: ["브랜드 콘텐츠 기획 및 캐릭터 IP 프로젝트 참여"],
  },
];

/** 인증 및 자격 (가상 데이터) */
export const certificates = [
  "생성형 AI 활용 지도사 1급",
  "프롬프트 엔지니어링 전문가(PEP)",
  "직업능력개발훈련교사 3급",
  "정보처리기사",
  "Google Cloud Generative AI Fundamentals",
  "SQL 개발자(SQLD)",
];

/** 주요 강의 이력 */
export const highlights = [
  "삼성전자, 현대자동차 등 주요 대기업 AI 실무 교육",
  "행정안전부, 과학기술정보통신부 등 정부기관 디지털 전환 특강",
  "서울대학교, 연세대학교 등 주요 대학 AI 리터러시 강연",
  "국내 최대 규모 AI 컨퍼런스 메인 스피커 참여",
];

export type Program = {
  id: string;
  title: string;
  summary: string;
  hours: string;
  levels: { level: string; title: string; topics: string[] }[];
};

/** 강의 프로그램 */
export const programs: Program[] = [
  {
    id: "chatgpt",
    title: "ChatGPT 실전 활용",
    summary: "프롬프트 엔지니어링부터 업무 자동화까지",
    hours: "8시간",
    levels: [
      {
        level: "입문 과정",
        title: "기초 개념 및 프롬프트 작성법",
        topics: ["AI의 이해", "기본 프롬프트 구조", "일상 활용 사례"],
      },
      {
        level: "중급 과정",
        title: "업무 생산성 향상 및 실전 활용",
        topics: ["보고서 자동화", "데이터 분석", "GPTs 커스텀 챗봇"],
      },
      {
        level: "고급 과정",
        title: "프롬프트 엔지니어링 마스터",
        topics: ["복합 프롬프트 설계", "API 연동 기초", "비즈니스 모델링"],
      },
    ],
  },
  {
    id: "emoticon",
    title: "이모티콘 AI 창작",
    summary: "AI로 나만의 캐릭터 디자인과 수익화 실현",
    hours: "10시간",
    levels: [
      {
        level: "입문 과정",
        title: "캐릭터 컨셉 및 AI 생성 기초",
        topics: ["캐릭터 기획", "이미지 생성 AI 기초", "프롬프트 기초"],
      },
      {
        level: "중급 과정",
        title: "캐릭터 일관성 및 감정 표현",
        topics: ["일관된 캐릭터 생성", "감정별 프롬프트", "모션 기초"],
      },
      {
        level: "고급 과정",
        title: "플랫폼 등록 및 수익화 전략",
        topics: ["제안용 가이드 제작", "플랫폼별 심사 기준", "마케팅 전략"],
      },
    ],
  },
  {
    id: "figma",
    title: "Figma AI 디자인",
    summary: "AI 도구를 활용한 차세대 UI/UX 디자인 프로세스",
    hours: "12시간",
    levels: [
      {
        level: "입문 과정",
        title: "Figma 기초 및 AI 플러그인",
        topics: ["Figma 기본 인터페이스", "AI 플러그인 설치", "기초 레이아웃"],
      },
      {
        level: "중급 과정",
        title: "AI 기반 UI/UX 설계 프로세스",
        topics: ["와이어프레임 자동화", "디자인 시스템 구축", "AI 프로토타이핑"],
      },
      {
        level: "고급 과정",
        title: "차세대 디자인 워크플로우",
        topics: ["디자인-코드 연동", "AI 협업 툴 활용", "실무 프로젝트"],
      },
    ],
  },
  {
    id: "premium",
    title: "AI 통합 실전 과정",
    summary: "콘텐츠 자동화부터 수익화까지, 프리미엄 통합 커리큘럼",
    hours: "16시간",
    levels: [
      {
        level: "콘텐츠 자동화",
        title: "글, 이미지, 영상 제작 자동화",
        topics: ["멀티모달 AI 활용", "콘텐츠 파이프라인 구축", "SNS 자동화"],
      },
      {
        level: "퍼스널 브랜딩",
        title: "AI로 구축하는 나만의 브랜드",
        topics: ["브랜드 보이스 설정", "AI 기반 퍼스널 마케팅", "커뮤니티 빌딩"],
      },
      {
        level: "수익화 시스템",
        title: "AI 비즈니스 모델 구축",
        topics: ["AI 서비스 기획", "수익화 로드맵", "지속 가능한 비즈니스"],
      },
    ],
  },
];

/** 대상별 솔루션 */
export const solutions = [
  {
    id: "enterprise",
    title: "기업 강의",
    titleEn: "Enterprise",
    summary:
      "기업의 생산성 향상과 실질적인 업무 자동화를 위한 맞춤형 교육 솔루션입니다.",
    items: [
      {
        name: "업무 자동화",
        desc: "반복적인 업무를 AI로 자동화하여 핵심 업무에 집중할 수 있는 환경 구축",
      },
      {
        name: "생산성 향상",
        desc: "보고서 작성, 데이터 분석, 아이디어 빌딩 등 전반적인 업무 속도 개선",
      },
      {
        name: "맞춤 커리큘럼",
        desc: "산업군별, 직무별 특성을 반영한 최적화된 교육 내용 제공",
      },
    ],
  },
  {
    id: "government",
    title: "정부기관 강의",
    titleEn: "Government",
    summary:
      "공공 서비스의 디지털 전환과 공무원의 AI 활용 역량 강화를 위한 전문 교육입니다.",
    items: [
      {
        name: "디지털 전환 교육",
        desc: "공공 부문의 AI 도입 전략과 성공 사례 분석을 통한 혁신 마인드 제고",
      },
      {
        name: "공무원 AI 활용",
        desc: "행정 업무 효율화 및 대민 서비스 개선을 위한 실전 AI 도구 활용법",
      },
      {
        name: "정책 기반 교육",
        desc: "국가 AI 정책 방향과 연계된 실무 중심의 교육 커리큘럼 구성",
      },
    ],
  },
  {
    id: "university",
    title: "대학 강의",
    titleEn: "University",
    summary:
      "미래 인재 양성을 위한 AI 리터러시 교육과 취업·창업 연계 프로그램을 제공합니다.",
    items: [
      {
        name: "AI 리터러시",
        desc: "전공에 상관없이 누구나 갖춰야 할 AI 기본 소양과 윤리 교육",
      },
      {
        name: "창업 교육",
        desc: "AI 도구를 활용한 비즈니스 모델 기획 및 MVP 제작 실습",
      },
      {
        name: "취업 연계 프로그램",
        desc: "기업이 원하는 AI 활용 역량을 갖춘 실무형 인재 양성 로드맵",
      },
    ],
  },
];

/** 포트폴리오 (강의 사례) */
export const portfolio = [
  {
    title: "S전자 임직원 AI 실무 교육",
    category: "기업 사례",
    desc: "전 부서 대상 ChatGPT 활용 업무 자동화 커리큘럼 진행",
    tags: ["업무 자동화", "프롬프트 엔지니어링"],
  },
  {
    title: "H자동차 디자인팀 AI 워크숍",
    category: "기업 사례",
    desc: "Figma AI 및 이미지 생성 AI를 활용한 디자인 프로세스 혁신",
    tags: ["디자인 혁신", "Figma AI"],
  },
  {
    title: "행정안전부 디지털 전환 특강",
    category: "기관 사례",
    desc: "공공 서비스 혁신을 위한 AI 도입 전략 및 실무 교육",
    tags: ["디지털 전환", "공공 혁신"],
  },
  {
    title: "S대학교 AI 리터러시 캠프",
    category: "대학 사례",
    desc: "전공 무관 대학생 대상 AI 기초 및 취업 역량 강화 프로그램",
    tags: ["AI 리터러시", "취업 준비"],
  },
  {
    title: "K공사 사내 강사 양성 과정",
    category: "기관 사례",
    desc: "사내 지식 전파를 위한 AI 교수법 및 콘텐츠 제작 교육",
    tags: ["강사 양성", "콘텐츠 제작"],
  },
  {
    title: "Y대학교 창업 지원단 AI 멘토링",
    category: "대학 사례",
    desc: "예비 창업자 대상 AI 도구 활용 MVP 제작 및 마케팅 전략",
    tags: ["창업 지원", "MVP 제작"],
  },
];

/** 교육 성과 지표 (가상 데이터) */
export const outcomes = [
  { label: "업무 효율성 (Efficiency)", before: "100%", after: "280%", ratio: 0.36 },
  { label: "콘텐츠 제작 속도 (Speed)", before: "8시간 / 건", after: "1.5시간 / 건", ratio: 0.19 },
  { label: "보고서 작성 시간 (Reporting)", before: "5시간 / 건", after: "1시간 / 건", ratio: 0.2 },
];

/** 수강 후기 */
export const testimonials = [
  {
    name: "김*현",
    role: "기업 담당자",
    quote:
      "처음에는 AI가 막연하게 느껴졌는데, 실무 중심 강의를 듣고 나서 우리 팀의 보고서 작성 및 자료 조사 시간이 획기적으로 단축되었습니다.",
  },
  {
    name: "이*영",
    role: "수강생",
    quote:
      "그림을 전혀 못 그리는 저도 AI 도구를 활용해 이모티콘 작가로 데뷔할 수 있는 용기를 얻었습니다. 컨셉 설정부터 플랫폼 등록까지 상세했습니다.",
  },
  {
    name: "박*준",
    role: "프리랜서 디자이너",
    quote:
      "Figma AI 기능을 활용한 효율적인 UI/UX 설계 방법을 배우고 나서 작업 속도가 비약적으로 향상되었습니다.",
  },
  {
    name: "최*서",
    role: "대학생",
    quote:
      "대학 강의에서 들었던 AI 이론보다 훨씬 실용적이고 재미있었습니다. 취업 준비 과정의 구체적인 로드맵을 그려주셔서 감사합니다.",
  },
  {
    name: "정*우",
    role: "공무원",
    quote:
      "공공 서비스 혁신을 위한 AI 도입 방안에 대해 심도 있는 인사이트를 얻었습니다. 디지털 전환 시기에 꼭 필요한 교육입니다.",
  },
  {
    name: "한*지",
    role: "창업가",
    quote:
      "마케팅 문구 작성, 이미지 생성 등을 AI로 해결하는 법을 배웠습니다. 비용 절감과 퀄리티 향상을 동시에 잡았습니다.",
  },
  {
    name: "윤*호",
    role: "직장인",
    quote:
      "반복적인 엑셀 작업과 이메일 작성을 AI로 자동화하는 법을 배우고 나서 삶의 질이 달라졌습니다.",
  },
  {
    name: "조*희",
    role: "개발자",
    quote:
      "단순한 사용법을 넘어 AI의 원리를 이해하고 최적의 결과를 이끌어내는 질문법을 익혔습니다.",
  },
];

/** 인사이트 (블로그) */
export const insights = [
  {
    title: "ChatGPT 프롬프트 엔지니어링 10계명",
    category: "ChatGPT 프롬프트",
    desc: "AI로부터 최상의 결과물을 이끌어내기 위한 핵심 질문법을 공개합니다.",
  },
  {
    title: "2026년 AI 트렌드 분석: 생성형 AI의 미래",
    category: "트렌드 분석",
    desc: "올해 주목해야 할 AI 기술 트렌드와 비즈니스 적용 방안을 살펴봅니다.",
  },
  {
    title: "디자이너를 위한 Figma AI 활용 꿀팁",
    category: "AI 활용법",
    desc: "디자인 프로세스를 획기적으로 단축시키는 AI 플러그인과 기능을 소개합니다.",
  },
  {
    title: "이모티콘 작가 데뷔, AI로 1주일 만에 끝내기",
    category: "AI 활용법",
    desc: "아이디어 기획부터 플랫폼 등록까지, AI와 함께하는 초고속 창작 가이드입니다.",
  },
  {
    title: "기업 내 AI 도입 시 주의해야 할 3가지",
    category: "트렌드 분석",
    desc: "성공적인 디지털 전환을 위해 반드시 체크해야 할 보안과 윤리 가이드라인입니다.",
  },
  {
    title: "업무 자동화의 시작: 나만의 GPTs 만들기",
    category: "AI 활용법",
    desc: "코딩 없이도 누구나 만들 수 있는 맞춤형 AI 비서 제작법을 알려드립니다.",
  },
];

/** 무료 자료실 */
export const resources = [
  {
    title: "ChatGPT 프롬프트 치트 시트 (PDF)",
    category: "프롬프트 PDF",
    desc: "실무에서 바로 쓰는 50가지 핵심 프롬프트 모음집",
  },
  {
    title: "2026 필수 AI 툴 리스트 100선",
    category: "AI 툴 리스트",
    desc: "업무 효율을 10배 높여주는 분야별 AI 도구 총정리",
  },
  {
    title: "비즈니스 AI 자동화 로드맵",
    category: "실행 전략",
    desc: "기업 내 AI 도입을 위한 단계별 실행 전략 보고서",
  },
];

/** 문의 폼 옵션 */
export const inquiryTypes = ["일반 문의", "강의 문의", "협업 제안", "견적 요청"];

export const scheduleOptions = ["평일 오전", "평일 오후", "주말 오전", "주말 오후"];
