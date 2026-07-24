export interface Role {
  title: string;
  org: string;
  period: string;
  highlights: string[];
}

export const roles: Role[] = [
  {
    title: 'AI Engineer (Consultant)',
    org: 'One-Sky-Solutions',
    period: 'Mar 2026 – Jun 2026',
    highlights: [
      'Engineered an end-to-end proof of concept for automated legal document parsing, information extraction, and data validation with large language models.',
      'Stood up a Langfuse evaluation and observability framework, reaching 92% accuracy on data extraction and legal-proceeding classification.',
    ],
  },
  {
    title: 'Research Intern',
    org: 'UNSW AI Institute (CRUISE group)',
    period: 'Sep 2025 – Feb 2026',
    highlights: [
      'Researched multi-agent reinforcement learning with the CRUISE group, the foundation of my MSc thesis (AnyLight).',
      'Explored RL policies that coordinate city-scale traffic-signal networks and generalize across intersection layouts.',
    ],
  },
  {
    title: 'Software Developer (Backend)',
    org: 'Tec Systems Engineering (Tecsen)',
    period: 'Jun 2022 – Oct 2023',
    highlights: [
      'Built and maintained Java backend modules powering core traffic-software operations.',
      'Drove the cloud-native strategy: a monolith-to-microservices roadmap projected to cut maintenance cost 20% and raise availability and scalability 30%.',
      'With the Head of R&D, migrated file storage to Hadoop HDFS and Apache Parquet: 70%+ less storage, 30% faster queries.',
      'Built a data-exchange module for vehicular-traffic data between Tecsen and Enel X.',
      'Maintained and optimised an OpenVPN network for secure cross-system communication.',
    ],
  },
];
