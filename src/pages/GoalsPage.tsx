import type { Goal, Task } from '../types';
import { GoalsPanel } from '../components/GoalsPanel';
import './GoalsPage.css';

interface GoalsPageProps {
    goals: Goal[];
    tasks: Task[];
    onAddGoal: (goal: Omit<Goal, 'id' | 'createdDate'>) => void;
    onEditGoal: (goal: Goal) => void;
    onDeleteGoal: (id: string) => void;
    onPrintGoals: () => void;
}

export const GoalsPage = ({
    goals,
    tasks,
    onAddGoal,
    onEditGoal,
    onDeleteGoal,
    onPrintGoals,
}: GoalsPageProps) => {
    return (
        <div className="goals-page">
            <div className="page-header">
                <h1>Yearly Goals</h1>
                <button onClick={onPrintGoals} className="print-btn no-print">
                    🖨️ Print Goals
                </button>
            </div>

            <GoalsPanel
                goals={goals}
                tasks={tasks}
                onAddGoal={onAddGoal}
                onEditGoal={onEditGoal}
                onDeleteGoal={onDeleteGoal}
            />
        </div>
    );
};
