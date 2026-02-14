import { useState } from 'react';
import type { Task, Goal } from '../types';
import { TaskCard } from './TaskCard';
import { formatDateISO } from '../utils/dateUtils';
import './DayColumn.css';

interface DayColumnProps {
    date: Date;
    dayName: string;
    tasks: Task[];
    goals: Goal[];
    onAddTask: (task: Omit<Task, 'id'>) => void;
    onEditTask: (task: Task) => void;
    onDeleteTask: (id: string) => void;
    onToggleComplete: (id: string) => void;
}

export const DayColumn = ({
    date,
    dayName,
    tasks,
    goals,
    onAddTask,
    onEditTask,
    onDeleteTask,
    onToggleComplete,
}: DayColumnProps) => {
    const [newTaskText, setNewTaskText] = useState('');
    const [selectedGoalId, setSelectedGoalId] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTaskText.trim() && selectedGoalId) {
            onAddTask({
                text: newTaskText.trim(),
                goalId: selectedGoalId,
                completed: false,
                date: formatDateISO(date),
            });
            setNewTaskText('');
            setSelectedGoalId('');
            setShowForm(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        try {
            const taskData = JSON.parse(e.dataTransfer.getData('application/json')) as Task;
            const newDate = formatDateISO(date);

            // Update the task with the new date
            onEditTask({
                ...taskData,
                date: newDate,
            });
        } catch (error) {
            console.error('Error dropping task:', error);
        }
    };

    const isToday = new Date().toDateString() === date.toDateString();

    return (
        <div
            className={`day-column ${isToday ? 'today' : ''} ${isDragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="day-header">
                <h3 className="day-name">{dayName}</h3>
                <span className="day-date">{date.getDate()}</span>
            </div>

            <button
                onClick={() => setShowForm(!showForm)}
                className="add-task-btn no-print"
            >
                {showForm ? '✕' : '+'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="task-form no-print">
                    <textarea
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                        placeholder="Task description"
                        className="task-input"
                        rows={2}
                        autoFocus
                    />
                    <select
                        value={selectedGoalId}
                        onChange={(e) => setSelectedGoalId(e.target.value)}
                        className="goal-select"
                        required
                    >
                        <option value="">Select a goal</option>
                        {goals.map(goal => (
                            <option key={goal.id} value={goal.id}>{goal.title}</option>
                        ))}
                    </select>
                    <button type="submit" className="submit-task-btn">Add</button>
                </form>
            )}

            <div className="tasks-list">
                {tasks.length === 0 ? (
                    <p className="no-tasks">{isDragOver ? 'Drop here' : 'No tasks'}</p>
                ) : (
                    tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            goals={goals}
                            onEdit={onEditTask}
                            onDelete={onDeleteTask}
                            onToggleComplete={onToggleComplete}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
