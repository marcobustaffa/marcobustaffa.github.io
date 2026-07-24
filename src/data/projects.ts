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
    repo: 'https://github.com/marcobustaffa/AnyLight',
  },
  {
    title: 'Legal AI Pipeline',
    stack: ['Python', 'LLMs', 'RAG', 'Langfuse'],
    summary:
      'An end-to-end LLM pipeline for automated legal document parsing, information extraction, and data validation, with a Langfuse evaluation and observability framework reaching 92% accuracy on extraction and legal-proceeding classification. Built as an AI consultant for One-Sky-Solutions.',
  },
  {
    title: 'env-soundnet',
    stack: ['Python', 'PyTorch', 'Spiking Neural Networks'],
    summary:
      'Environmental sound classification with Spiking Neural Networks, an energy-efficient alternative to standard deep nets.',
    repo: 'https://github.com/marcobustaffa/env-soundnet',
  },
  {
    title: 'Login Warrior',
    stack: ['React', 'WebGL', 'Data Analytics'],
    summary:
      'Security anomaly detection over massive login-record datasets: a high-performance React + WebGL engine that plots large-scale security events so suspicious patterns stand out. Built with Zucchetti, owning the full SDLC in a team.',
    repo: 'https://github.com/marcobustaffa/LoginWarrior',
  },
];
