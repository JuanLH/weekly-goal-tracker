import { useState } from 'react';
import type { Goal } from '../App.tsx';
import { GoalCard } from './GoalCard.tsx';
import './PlannerGrid.css';

interface PlannerGridProps {
    goals: Goal[];
    onAddGoal: (text: string, category: string) => void;
    onToggleGoal: (id: string) => void;
    onDeleteGoal: (id: string) => void;
    onUpdateGoal: (id: string, text: string) => void;
}

const categories = ['Daily', 'Weekly', 'Monthly', 'Long-term'];

export const PlannerGrid = ({
    goals,
    onAddGoal,
    onToggleGoal,
    onDeleteGoal,
    onUpdateGoal,
}: PlannerGridProps) => {
    const [newGoalText, setNewGoalText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Daily');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newGoalText.trim()) {
            onAddGoal(newGoalText.trim(), selectedCategory);
            setNewGoalText('');
        }
    };

    const getGoalsByCategory = (category: string) => {
        return goals.filter(goal => goal.category === category);
    };

    return (
        <div className="planner-container">
            <form onSubmit={handleSubmit} className="add-goal-form no-print">
                <input
                    type="text"
                    value={newGoalText}
                    onChange={(e) => setNewGoalText(e.target.value)}
                    placeholder="Enter a new goal..."
                    className="goal-input"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="category-select"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <button type="submit" className="add-btn">Add Goal</button>
            </form>

            <div className="planner-grid">
                {categories.map(category => (
                    <div key={category} className="category-column">
                        <h2 className="category-title">{category}</h2>
                        <div className="goals-list">
                            {getGoalsByCategory(category).map(goal => (
                                <GoalCard
                                    key={goal.id}
                                    goal={goal}
                                    onToggle={onToggleGoal}
                                    onDelete={onDeleteGoal}
                                    onUpdate={onUpdateGoal}
                                />
                            ))}
                            {getGoalsByCategory(category).length === 0 && (
                                <p className="empty-message">No goals yet</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
