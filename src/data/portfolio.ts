import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  ClipboardList,
  Globe,
  GraduationCap,
  Layers,
  MessageSquare,
  Plane,
  RadioTower,
  Server,
  ShieldCheck,
  Ticket,
  Trophy,
} from 'lucide-react';

export const profile = {
  name: 'Yash Drall',
  title: 'Full-Stack Software Developer',
  tagline: 'React.js, Next.js, Flutter & Python',
  email: 'drall.yash@gmail.com',
  phone: '+91 7082661109',
  phoneHref: 'tel:+917082661109',
  linkedin: 'linkedin.com/in/yashdrall01',
  linkedinHref: 'https://linkedin.com/in/yashdrall01',
  location: 'Sonipat, Haryana, India',
  heroIntro:
    'Building scalable web and mobile applications with React.js, Next.js, Flutter, Python, and MySQL. Three years crafting enterprise CRM systems, production-ready platforms, and seamless user experiences, from architecture to deployment.',
  summary:
    'Full Stack Developer with 3 years of experience designing, developing, and deploying scalable web and mobile applications using React.js, Flutter, JavaScript, Python, and MySQL. Experienced in building enterprise CRM systems, responsive user interfaces, role-based access control (RBAC), RESTful API integration, authentication, dashboard development, and business workflow automation. Passionate about delivering high-quality, production-ready applications with excellent user experience.',
};

export const heroStats = [
  { value: 3, suffix: '+', label: 'Years building production software' },
  { value: 200, suffix: '+', label: 'Daily users on one enterprise CRM' },
  { value: 1000, suffix: '+', label: 'Business records handled per day' },
];

export interface Highlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const highlights: Highlight[] = [
  {
    icon: Building2,
    title: 'Enterprise CRM Development',
    description:
      'Built and maintained an enterprise CRM platform used daily by 200+ employees across Sales, Doctors, Accounts, Dispatch, Verification, and Management teams.',
  },
  {
    icon: Layers,
    title: 'Full Stack Delivery',
    description:
      'From Flutter mobile apps to React.js dashboards to Python backends, I own features end-to-end, from database schema to production deployment.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & RBAC',
    description:
      'Implemented secure Role-Based Access Control, JWT authentication, Google OAuth, and OTP-based login for applications handling sensitive business data.',
  },
  {
    icon: Server,
    title: 'Scalable Architecture',
    description:
      'Designed relational MySQL schemas, optimized queries, and built RESTful APIs with Django REST Framework and Flask serving 1,000+ business records per day.',
  },
];

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  technologies: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Full Stack Developer (React.js, Next.js, Python, Django)',
    company: 'Karma Ayurveda Pvt. Ltd.',
    period: 'September 2025 - Present',
    location: 'New Delhi',
    bullets: [
      'Developed and maintained an enterprise CRM platform used daily by more than 200 employees across Sales, Doctors, Accounts, Dispatch, Verification, and Management teams.',
      'Built and optimized modules for lead management, order processing, inventory management, payment tracking, customer management, and MIS reporting, handling over 1,000 business records per day.',
      'Designed and implemented secure Role-Based Access Control (RBAC) with dedicated dashboards and workflows for multiple user roles.',
      'Integrated RESTful APIs with React.js frontend to communicate seamlessly with Python backend services.',
      'Implemented search, filtering, pagination, Excel import/export, reporting, and real-time data management.',
      'Improved frontend performance by optimizing API calls, component rendering, and state management, resulting in faster application response time.',
    ],
    technologies: ['React.js', 'Next.js', 'TypeScript', 'Python', 'Django', 'MySQL', 'RBAC'],
  },
  {
    role: 'Full Stack Developer (React.js, Flutter, Python)',
    company: 'Talentiser',
    period: 'September 2023 - September 2025',
    location: 'Noida, Uttar Pradesh',
    bullets: [
      'Developed and deployed multiple production-ready web and mobile applications using React.js, Flutter, Python, and MySQL.',
      'Built a Flutter-based Fandom application featuring ticket booking, event management, digital wallet, OTP authentication, Email Verification, Google OAuth, and user profile management.',
      'Developed a cross-platform Tour Planner mobile application supporting international tour booking, cruise packages, real-time pricing, and third-party API integration.',
      'Designed and developed a Telecommunication Management System using React.js and Python with modules for user management, service tracking, reporting, and operational dashboards.',
      'Optimized application performance through efficient API handling, reusable components, lazy loading, and effective state management.',
      'Participated in the complete Software Development Life Cycle (SDLC), including requirement analysis, development, debugging, testing, deployment, code reviews, and maintenance.',
    ],
    technologies: ['React.js', 'Flutter', 'Python', 'JavaScript', 'MySQL', 'OAuth', 'OTP Authentication'],
  },
];

export interface Project {
  icon: LucideIcon;
  title: string;
  category: string;
  description: string;
  stack: string[];
}

export const projects: Project[] = [
  {
    icon: MessageSquare,
    title: 'ChatSpace',
    category: 'Private AI Message Vault',
    description:
      'A private full-stack messaging platform for text, media, documents, voice notes, and reminders, with a local AI pipeline that extracts summaries, tasks, and verified due dates.',
    stack: ['Next.js', 'React', 'TypeScript', 'MySQL', 'Ollama'],
  },
  {
    icon: Building2,
    title: 'Enterprise CRM System',
    category: 'Enterprise Platform',
    description:
      'Lead allocation, order lifecycle, payments, and MIS reporting, with secure RBAC dashboards for Admin, Sales, Doctors, Accounts, Dispatch, and Verification teams.',
    stack: ['React.js', 'Python', 'MySQL'],
  },
  {
    icon: Ticket,
    title: 'Fandom Mobile Application',
    category: 'Cross-Platform Mobile',
    description:
      'Android and iOS app with ticket booking, event management, a digital wallet, Google OAuth, OTP login, and real-time event updates.',
    stack: ['Flutter', 'REST APIs'],
  },
  {
    icon: Plane,
    title: 'Tour Planner Mobile App',
    category: 'Travel Booking',
    description:
      'Booking app for international tours and cruise packages, with real-time pricing, availability, and itinerary management through third-party APIs.',
    stack: ['Flutter'],
  },
  {
    icon: RadioTower,
    title: 'Telecommunication Management',
    category: 'Operations Dashboard',
    description:
      'Full-stack platform for customer management, service tracking, operational dashboards, and reporting with secure user management.',
    stack: ['React.js', 'Python'],
  },
  {
    icon: Trophy,
    title: 'Soccer Premier League',
    category: 'Sports Platform',
    description:
      'Responsive web app for managing teams, matches, player statistics, league standings, and fixtures with reusable components and dynamic content updates.',
    stack: ['React.js'],
  },
  {
    icon: Globe,
    title: 'GCC Circle',
    category: 'Freelance, Full Stack',
    description:
      'Complete website for events, blogs, leadership pages, registrations, and content management, deployed on a Hostinger VPS with Nginx, SSL, and PM2.',
    stack: ['Next.js', 'MySQL'],
  },
  {
    icon: ClipboardList,
    title: 'Purchase Order Management',
    category: 'Freelance, Business Tool',
    description:
      'Vendor, purchase order, approval, and invoice management with RBAC, dashboard reporting, Excel import/export, and full order lifecycle tracking.',
    stack: ['React.js', 'Python', 'MySQL'],
  },
];

export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { title: 'Frontend', items: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Responsive Design'] },
  { title: 'Mobile', items: ['Flutter', 'Dart', 'React Native'] },
  { title: 'Backend', items: ['Python', 'Django', 'Django REST Framework', 'Flask', 'FastAPI', 'Java', 'Microservices'] },
  { title: 'Data', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Query Optimization', 'Indexing', 'ORM'] },
  { title: 'Security', items: ['JWT Authentication', 'Google OAuth', 'OTP Authentication', 'RBAC', 'API Security'] },
  { title: 'Cloud & DevOps', items: ['AWS EC2', 'AWS S3', 'Docker', 'GitHub Actions', 'CI/CD', 'Linux', 'Nginx', 'PM2'] },
  { title: 'AI & LLM', items: ['LangChain', 'LangGraph', 'RAG', 'Vector Databases', 'FAISS', 'Pinecone', 'Hugging Face'] },
  { title: 'Practices', items: ['REST APIs', 'Agile', 'SDLC', 'Testing', 'Performance Optimization', 'Git & GitHub'] },
];

export const education = {
  degree: 'Bachelor of Technology (Biomedical Engineering)',
  school: 'Deenbandhu Chhotu Ram University of Science and Technology (DCRUST), Murthal',
  period: '2019 - 2023',
  score: 'CGPA 8.04 / 10',
  icon: GraduationCap,
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];
