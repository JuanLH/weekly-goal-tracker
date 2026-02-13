import { useState } from 'react';
import type { Goal, Task } from '../types';
import { GoalCard } from './GoalCard';
import './GoalsPanel.css';

interface GoalsPanelProps {
    goals: Goal[];
    tasks: Task[];
    onAddGoal: (goal: Omit<Goal, 'id' | 'createdDate'>) => void;
    onEditGoal: (goal: Goal) => void;
    onDeleteGoal: (id: string) => void;
}

export const GoalsPanel = ({ goals, tasks, onAddGoal, onEditGoal, onDeleteGoal }: GoalsPanelProps) => {
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTitle.trim()) {
            onAddGoal({
                title: newTitle.trim(),
                description: newDescription.trim() || undefined,
            });
            setNewTitle('');
            setNewDescription('');
            setShowForm(false);
        }
    };

    const getGoalStats = (goalId: string) => {
        const goalTasks = tasks.filter(task => task.goalId === goalId);
        const completedTasks = goalTasks.filter(task => task.completed).length;
        return { completed: completedTasks, total: goalTasks.length };
    };

    return (
        <div className="goals-panel">
            <div className="goals-header">
                <h2>Yearly Goals</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="add-goal-btn no-print"
                >
                    {showForm ? '✕ Cancel' : '+ Add Goal'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="goal-form no-print">
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Goal title"
                        className="goal-input"
                        autoFocus
                    />
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Description (optional)"
                        className="goal-textarea"
                        rows={3}
                    />
                    <button type="submit" className="submit-btn">Add Goal</button>
                </form>
            )}

            <div className="goals-list">
                {goals.length === 0 ? (
                    <div className="empty-state">
                        <p>No goals yet. Add your first yearly goal to get started!</p>
                    </div>
                ) : (
                    goals.map(goal => {
                        const stats = getGoalStats(goal.id);
                        return (
                            <GoalCard
                                key={goal.id}
                                goal={goal}
                                onEdit={onEditGoal}
                                onDelete={onDeleteGoal}
                                completedTasks={stats.completed}
                                totalTasks={stats.total}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};
