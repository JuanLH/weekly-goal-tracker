import { useState } from 'react';
import type { Goal } from '../types';
import './GoalCard.css';

interface GoalCardProps {
    goal: Goal;
    onEdit: (goal: Goal) => void;
    onDelete: (id: string) => void;
    completedTasks: number;
    totalTasks: number;
}

export const GoalCard = ({ goal, onEdit, onDelete, completedTasks, totalTasks }: GoalCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(goal.title);
    const [editDescription, setEditDescription] = useState(goal.description || '');

    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const handleSave = () => {
        if (editTitle.trim()) {
            onEdit({
                ...goal,
                title: editTitle.trim(),
                description: editDescription.trim() || undefined,
            });
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditTitle(goal.title);
        setEditDescription(goal.description || '');
        setIsEditing(false);
    };

    return (
        <div className="goal-card">
            {isEditing ? (
                <div className="goal-edit-mode">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="goal-title-input"
                        placeholder="Goal title"
                        autoFocus
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="goal-description-input"
                        placeholder="Description (optional)"
                        rows={3}
                    />
                    <div className="goal-edit-actions">
                        <button onClick={handleSave} className="save-btn">✓ Save</button>
                        <button onClick={handleCancel} className="cancel-btn">✕ Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="goal-header">
                        <h3 className="goal-title">{goal.title}</h3>
                        <div className="goal-actions no-print">
                            <button onClick={() => setIsEditing(true)} className="edit-btn" title="Edit goal">
                                ✏️
                            </button>
                            <button onClick={() => onDelete(goal.id)} className="delete-btn" title="Delete goal">
                                🗑️
                            </button>
                        </div>
                    </div>

                    {goal.description && (
                        <p className="goal-description">{goal.description}</p>
                    )}

                    <div className="goal-progress">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                        <span className="progress-text">
                            {completedTasks} / {totalTasks} tasks ({progress}%)
                        </span>
                    </div>

                    <div className="goal-meta">
                        <span className="goal-date">Created: {new Date(goal.createdDate).toLocaleDateString()}</span>
                    </div>
                </>
            )}
        </div>
    );
};
