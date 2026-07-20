export interface Project {
  title: string;
  subtitle: string;
  summary: string;
  stack: string[];
  repo?: string;
}

export const projects: Project[] = [
  {
    title: 'AnyLight',
    subtitle: 'MSc Thesis · University of Padova × UNSW Sydney',
    summary:
      'A generalizable multi-agent reinforcement-learning architecture for heterogeneous traffic-signal control. A movement-centric state representation and universal parameter-sharing let a single PPO network govern intersections of any shape, while a cross-attention decoder and centralized critic (CTDE) exploit neighbour information. Evaluated on six synthetic and real-world networks (RESCO / MA2C), it beats classical heuristics and RL baselines by cutting intersection delay under heavy traffic. Research conducted at the UNSW AI Institute in Sydney.',
    stack: ['Python', 'PyTorch', 'PPO / Actor-Critic', 'Cross-Attention', 'SUMO / TraCI'],
  },
  {
    title: 'Legal AI Pipeline',
    subtitle: 'AI Consultancy · 3-month engagement',
    summary:
      'Designed and built an LLM-powered pipeline for a legal-services company to automate legal procedures and document drafting and redaction, combining retrieval, structured extraction, and evaluation/observability to keep outputs reliable on sensitive documents.',
    stack: ['Python', 'LLMs', 'RAG', 'Evals / Langfuse'],
  },
  {
    title: 'env-soundnet',
    subtitle: 'Deep Learning · Research project',
    summary:
      'Environmental sound classification using Spiking Neural Networks (SNNs), an energy-efficient, biologically-inspired alternative to standard deep nets. A study in applying non-mainstream architectures to real audio-recognition tasks.',
    stack: ['Python', 'PyTorch', 'Spiking Neural Networks'],
    repo: 'https://github.com/marcobustaffa/env-soundnet',
  },
  {
    title: 'Hadoop / Parquet Migration',
    subtitle: 'Tec Systems Engineering · R&D',
    summary:
      'Re-architected file storage onto Hadoop HDFS using the Apache Parquet columnar format for a traffic-software platform, reducing storage footprint by more than 70% and improving query speed by 30%.',
    stack: ['Java', 'Apache Hadoop (HDFS)', 'Apache Parquet'],
  },
];
