export interface Project {
  id: string;
  span: string;
  category: string;
  title: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
}
export const projects: Project[] = [
  {
    id: 'sensor-tracking',
    span: 'md:col-span-3', // Takes 3/4 of the first row
    category: 'Full-Stack Platform',
    title: 'Sensor Tracking System',
    description: 'A mock platform demonstrating continuous, real-time bidirectional data flow replacing standard REST polling.',
    techStack: ['Node.js', 'Next.js', 'WebSockets'],
    liveLink: 'https://build-sense-iota.vercel.app/map',
    githubLink: 'https://github.com/TruongCongTri/BuildSense.git',
  },
  {
    id: 'rbac-module',
    span: 'md:col-span-1', // Takes 1/4 of the first row (Narrow)
    category: 'Security',
    title: 'Auth & RBAC',
    description: 'Hybrid authorization module utilizing Redis caching to eliminate latency bottlenecks.',
    techStack: ['Node.js', 'Redis'],
    githubLink: 'https://github.com/TruongCongTri/be-role_based_access_control-nodejs',
  },
  {
    id: 'be-boilerplate',
    span: 'md:col-span-2', // Takes 2/4 (Half) of the second row
    category: 'Architecture',
    title: 'Backend Boilerplate',
    description: 'Strict layer-based directory structures ensuring a mathematically predictable, highly scalable codebase.',
    techStack: ['Express', 'Prisma', 'Zod'],
    githubLink: 'https://github.com/TruongCongTri/enterprise-node-boilerplate',
  },
  {
    id: 'fe-boilerplate',
    span: 'md:col-span-2', // Takes 2/4 (Half) of the second row
    category: 'Architecture',
    title: 'Frontend Boilerplate',
    description: 'Standardized React routing and component setups designed to accelerate AI-assisted feature generation.',
    techStack: ['React.js', 'Next.js', 'Tailwind'],
    githubLink: 'https://github.com/TruongCongTri/enterprise-next-boilerplate',
  },
];