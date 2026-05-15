export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
  embeddable: boolean;
  year?: number;
}
export const projects: Project[] = [
  {
    id: 'interview-prep-coach',
    category: 'AI Platform',
    title: 'Live AI Interview Coach',
    description: 'A mock platform demonstrating live AI voice interview practice. Engineered to allow users to engage in realistic, full-length mock interviews or practice specific technical topics in real-time.',
    techStack: ['Next.js', 'WebSockets', 'AI Voice API', 'Tailwind'],
    liveLink: 'https://interview-prep-coach-murex.vercel.app',
    githubLink: 'https://github.com/TruongCongTri/interview-prep-coach.git',
    embeddable: true, // Flag to enable the live iframe feature
    year: 2026,
  },
  {
    id: 'sensor-tracking',
    category: 'Full-Stack Platform',
    title: 'Sensor Tracking System',
    description: 'A mock platform demonstrating continuous, real-time bidirectional data flow replacing standard REST polling.',
    techStack: ['Node.js', 'Next.js', 'WebSockets'],
    liveLink: 'https://build-sense-iota.vercel.app/map',
    githubLink: 'https://github.com/TruongCongTri/BuildSense.git',
    embeddable: true,
    year: 2026
  },
  {
    id: 'rbac-module',
    category: 'Security',
    title: 'Auth & RBAC',
    description: 'Hybrid authorization module utilizing Redis caching to eliminate latency bottlenecks.',
    techStack: ['Node.js', 'Redis'],
    githubLink: 'https://github.com/TruongCongTri/be-role_based_access_control-nodejs',
    embeddable: false,
    year: 2025,
  },
  {
    id: 'be-boilerplate',
    category: 'Architecture',
    title: 'Backend Boilerplate',
    description: 'Strict layer-based directory structures ensuring a mathematically predictable, highly scalable codebase.',
    techStack: ['Express', 'Prisma', 'Zod'],
    githubLink: 'https://github.com/TruongCongTri/enterprise-node-boilerplate',
    embeddable: false,
    year: 2026,
  },
  {
    id: 'fe-boilerplate',
    category: 'Architecture',
    title: 'Frontend Boilerplate',
    description: 'Standardized React routing and component setups designed to accelerate AI-assisted feature generation.',
    techStack: ['React.js', 'Next.js', 'Tailwind'],
    githubLink: 'https://github.com/TruongCongTri/enterprise-next-boilerplate',
    embeddable: false,
    year: 2026,
  },
];