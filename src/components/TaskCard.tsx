import { useState } from 'react';
import type { Task, Goal } from '../types';
import './TaskCard.css';

interface TaskCardProps {
    task: Task;
    goals: Goal[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (id: string) => void;
}

export const TaskCard = ({ task, goals, onEdit, onDelete, onToggleComplete }: TaskCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);
    const [editGoalId, setEditGoalId] = useState(task.goalId);

    const goal = goals.find(g => g.id === task.goalId);

    const handleSave = () => {
        if (editText.trim() && editGoalId) {
            onEdit({
                ...task,
                text: editText.trim(),
                goalId: editGoalId,
            });
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditText(task.text);
        setEditGoalId(task.goalId);
        setIsEditing(false);
    };

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('application/json', JSON.stringify(task));
    };

    return (
        <div
            className={`task-card ${task.completed ? 'completed' : ''}`}
            draggable={!isEditing}
            onDragStart={handleDragStart}
        >
            {isEditing ? (
                <div className="task-edit-mode">
                    <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="task-text-input"
                        placeholder="Task description"
                        rows={2}
                        autoFocus
                    />
                    <select
                        value={editGoalId}
                        onChange={(e) => setEditGoalId(e.target.value)}
                        className="task-goal-select"
                    >
                        <option value="">Select a goal</option>
                        {goals.map(g => (
                            <option key={g.id} value={g.id}>{g.title}</option>
                        ))}
                    </select>
                    <div className="task-edit-actions">
                        <button onClick={handleSave} className="save-btn">✓</button>
                        <button onClick={handleCancel} className="cancel-btn">✕</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="task-content">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggleComplete(task.id)}
                            className="task-checkbox"
                        />
                        <div className="task-info">
                            <span className="task-text">{task.text}</span>
                            {goal && <span className="task-goal-label">{goal.title}</span>}
                        </div>
                    </div>
                    <div className="task-actions no-print">
                        <button onClick={() => setIsEditing(true)} className="edit-btn" title="Edit task">
                            ✏️
                        </button>
                        <button onClick={() => onDelete(task.id)} className="delete-btn" title="Delete task">
                            🗑️
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
