import { useState, useRef, useEffect } from 'react';
import type { Task, Goal } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPen, faTrash, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
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
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const goal = goals.find(g => g.id === task.goalId);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

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

    const handleEditClick = () => {
        setMenuOpen(false);
        setIsEditing(true);
    };

    const handleDeleteClick = () => {
        setMenuOpen(false);
        onDelete(task.id);
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
                        <button onClick={handleSave} className="save-btn">
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button onClick={handleCancel} className="cancel-btn">
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
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

                    <div className="task-menu no-print" ref={menuRef}>
                        <button
                            className="task-menu-btn"
                            onClick={() => setMenuOpen(prev => !prev)}
                            title="Task actions"
                        >
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                        {menuOpen && (
                            <div className="task-menu-dropdown">
                                <button onClick={handleEditClick} className="menu-item edit-item">
                                    <FontAwesomeIcon icon={faPen} /> Edit
                                </button>
                                <button onClick={handleDeleteClick} className="menu-item delete-item">
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
