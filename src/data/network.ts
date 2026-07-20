// Nodes for the ambient background knowledge graph. Cluster IDs group related
// technologies so the layout naturally forms loose neighbourhoods:
//   0 = Languages, 1 = ML / AI, 2 = Data / Infra
export interface NetworkNode {
  id: string;
  label: string;
  cluster: 0 | 1 | 2;
}

export interface NetworkEdge {
  source: string;
  target: string;
}

export const networkNodes: NetworkNode[] = [
  // Languages
  { id: 'python', label: 'Python', cluster: 0 },
  { id: 'java', label: 'Java', cluster: 0 },
  { id: 'typescript', label: 'TypeScript', cluster: 0 },
  { id: 'sql', label: 'SQL', cluster: 0 },
  // ML / AI
  { id: 'pytorch', label: 'PyTorch', cluster: 1 },
  { id: 'rl', label: 'RL', cluster: 1 },
  { id: 'ppo', label: 'PPO', cluster: 1 },
  { id: 'multiagent', label: 'Multi-agent', cluster: 1 },
  { id: 'attention', label: 'Cross-attention', cluster: 1 },
  { id: 'snn', label: 'Spiking NN', cluster: 1 },
  { id: 'llms', label: 'LLMs', cluster: 1 },
  { id: 'rag', label: 'RAG', cluster: 1 },
  // Data / Infra
  { id: 'hadoop', label: 'Hadoop', cluster: 2 },
  { id: 'parquet', label: 'Parquet', cluster: 2 },
  { id: 'sumo', label: 'SUMO', cluster: 2 },
  { id: 'docker', label: 'Docker', cluster: 2 },
  { id: 'cloud', label: 'Cloud-native', cluster: 2 },
  { id: 'langfuse', label: 'Langfuse', cluster: 2 },
];

export const networkEdges: NetworkEdge[] = [
  // Languages
  { source: 'python', target: 'sql' },
  { source: 'typescript', target: 'python' },
  { source: 'java', target: 'cloud' },
  // ML / AI
  { source: 'python', target: 'pytorch' },
  { source: 'pytorch', target: 'rl' },
  { source: 'rl', target: 'ppo' },
  { source: 'rl', target: 'multiagent' },
  { source: 'ppo', target: 'attention' },
  { source: 'multiagent', target: 'attention' },
  { source: 'pytorch', target: 'snn' },
  { source: 'pytorch', target: 'llms' },
  { source: 'llms', target: 'rag' },
  // Data / Infra + cross-links
  { source: 'hadoop', target: 'parquet' },
  { source: 'python', target: 'hadoop' },
  { source: 'sql', target: 'hadoop' },
  { source: 'docker', target: 'cloud' },
  { source: 'multiagent', target: 'sumo' },
  { source: 'llms', target: 'langfuse' },
];
