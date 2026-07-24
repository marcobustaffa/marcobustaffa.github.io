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
      'Scikit-learn',
    ],
  },
  {
    label: 'Data & Analytics',
    items: ['Pandas', 'NumPy', 'Matplotlib', 'R'],
  },
  {
    label: 'Big Data & Infra',
    items: ['Apache Hadoop', 'Apache Spark', 'Apache Parquet', 'MongoDB', 'InfluxDB', 'Docker', 'Linux'],
  },
  {
    label: 'Web & Software Eng',
    items: ['React', 'Angular', 'REST APIs', 'Git', 'Cloud-Native / Microservices'],
  },
];
