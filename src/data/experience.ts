export interface Role {
  title: string;
  org: string;
  period: string;
  highlights: string[];
}

export const roles: Role[] = [
  {
    title: 'Software Developer (Backend)',
    org: 'Tec Systems Engineering (Tecsen)',
    period: 'Jun 2021 – Oct 2022',
    highlights: [
      'Built and maintained Java backend modules powering core traffic-software operations.',
      'Drove the cloud-native strategy: a monolith-to-microservices roadmap projected to cut maintenance cost 20% and raise availability and scalability 30%.',
      'With the Head of R&D, migrated file storage to Hadoop HDFS and Apache Parquet: 70%+ less storage, 30% faster queries.',
      'Built a data-exchange module for vehicular-traffic data between Tecsen and Enel X.',
      'Maintained and optimised an OpenVPN network for secure cross-system communication.',
    ],
  },
  {
    title: 'AI Engineer (Consultant)',
    org: 'Legal-services company',
    period: '3-month engagement',
    highlights: [
      'Designed and built an LLM pipeline to automate legal procedures and document drafting and redaction, with evaluation and observability to keep outputs reliable.',
    ],
  },
];
