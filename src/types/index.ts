export interface Goal {
    id: string;
    title: string;
    description?: string;
    createdDate: string;
}

export interface Task {
    id: string;
    text: string;
    goalId: string;
    completed: boolean;
    date?: string; // ISO date format (YYYY-MM-DD) - optional for unscheduled tasks
}

export interface AppData {
    goals: Goal[];
    tasks: Task[];
}

export type ViewMode = 'goals' | 'planner';

export type ThemeMode = 'light' | 'dark';
