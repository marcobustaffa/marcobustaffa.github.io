export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['Python', 'Java', 'SQL', 'C++', 'JavaScript'],
  },
  {
    label: 'ML / AI',
    items: [
      'Deep Reinforcement Learning',
      'Multi-Agent RL',
      'LLMs & RAG',
      'LLM Evals & Observability (Langfuse)',
      'Spiking Neural Networks',
      'PyTorch',
    ],
  },
  {
    label: 'Data & Infra',
    items: ['Apache Hadoop', 'Apache Spark', 'Apache Parquet', 'MongoDB', 'InfluxDB', 'Docker'],
  },
  {
    label: 'Tools & Foundations',
    items: ['Git', 'Linux', 'R', 'Cloud-Native / Microservices'],
  },
];
