export interface ExperienceNode {
  id: string;
  period: string;
  title: string;
  type: "Full-Time" | "Contract" | "Education";
  company: string;
  highlights: string[];
}

export const experienceData: ExperienceNode[] = [
  {
    id: 'exp-1',
    period: '2025 – Present',
    title: 'Full-stack Developer',
    type: "Full-Time",
    company: 'MakerPath',
    highlights: [
      'Architected scalable backend systems using Node.js, TypeScript, and strict layer-based directory structures.',
      'Designed relational database models in PostgreSQL using Prisma ORM and Zod schema validation.',
      'Developed reusable React.js and Next.js interfaces, directly improving product UX and internal workflows.',
    ],
  },
  {
    id: 'exp-2',
    period: 'Feb 2024 – Oct 2025',
    title: 'Full-stack Developer',
    type: "Contract",
    company: 'Remote',
    highlights: [
      'Developed and maintained full-stack web applications asynchronously using React.js, Node.js, and SQL.',
      'Troubleshot production issues and implemented secure, permission-based access controls (RBAC).',
    ],
  },
  {
    id: 'exp-3',
    period: 'October 2024',
    title: 'Software Engineering',
    type: "Education",
    company: 'FPT University',
    highlights: [
      'Graduated with a GPA of 8.33/10.',
      'Established foundational knowledge in software design, clean code, and algorithms.',
    ],
  },
];