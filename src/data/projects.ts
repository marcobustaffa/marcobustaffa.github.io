export interface Project {
  title: string;
  stack: string[];
  summary: string;
  repo?: string;
}

export const projects: Project[] = [
  {
    title: 'AnyLight',
    stack: ['Python', 'PyTorch', 'Deep RL', 'PPO', 'SUMO'],
    summary:
      'Multi-agent reinforcement learning that coordinates entire traffic-signal networks, generalizing across intersections of any shape. MSc thesis, carried out at the UNSW AI Institute in Sydney.',
  },
  {
    title: 'Legal AI Pipeline',
    stack: ['Python', 'LLMs', 'RAG', 'Langfuse'],
    summary:
      'An LLM pipeline that automates legal procedures and document drafting and redaction, with retrieval and evaluation to keep outputs reliable. Built as a consultant for a legal-services company.',
  },
  {
    title: 'env-soundnet',
    stack: ['Python', 'PyTorch', 'Spiking Neural Networks'],
    summary:
      'Environmental sound classification with Spiking Neural Networks, an energy-efficient alternative to standard deep nets.',
    repo: 'https://github.com/marcobustaffa/env-soundnet',
  },
];
