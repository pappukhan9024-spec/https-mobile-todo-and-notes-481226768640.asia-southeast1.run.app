export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate: string; // format: YYYY-MM-DD
  category: string;
  subtasks: Subtask[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  folder: string;
  color: string; // e.g., 'amber' | 'sky' | 'rose' | 'emerald' | 'purple' | 'slate'
  updatedAt: string;
  tags: string[];
}

export interface CustomTimer {
  id: string;
  name: string;
  minutes: number;
  seconds: number;
  color: 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky' | 'purple';
}
