import type { Task, Goal } from '../types';
import { TaskCard } from './TaskCard';
import { useState } from 'react';
import './UnscheduledTaskList.css';

interface UnscheduledTaskListProps {
    tasks: Task[];
    goals: Goal[];
    onAddTask: (task: Omit<Task, 'id'>) => void;
    onEditTask: (task: Task) => void;
    onDeleteTask: (id: string) => void;
    onToggleComplete: (id: string) => void;
}

export const UnscheduledTaskList = ({
    tasks,
    goals,
    onAddTask,
    onEditTask,
    onDeleteTask,
    onToggleComplete,
}: UnscheduledTaskListProps) => {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTaskText, setNewTaskText] = useState('');
    const [selectedGoalId, setSelectedGoalId] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);

    const handleAddClick = () => {
        if (goals.length === 0) {
            alert('Please add at least one goal first.');
            return;
        }
        setSelectedGoalId(goals[0].id);
        setIsAddingTask(true);
    };

    const handleSaveTask = () => {
        if (!newTaskText.trim()) {
            alert('Please enter a task description.');
            return;
        }

        onAddTask({
            text: newTaskText,
            goalId: selectedGoalId,
            completed: false,
            // No date - this is an unscheduled task
        });

        setNewTaskText('');
        setIsAddingTask(false);
    };

    const handleCancel = () => {
        setNewTaskText('');
        setIsAddingTask(false);
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

            // Remove the date to make it unscheduled
            onEditTask({
                ...taskData,
                date: undefined,
            });
        } catch (error) {
            console.error('Error dropping task:', error);
        }
    };

    return (
        <div
            className={`unscheduled-task-list ${isDragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="sidebar-header">
                <h2>📋 Task Backlog</h2>
                <button onClick={handleAddClick} className="add-task-btn" title="Add unscheduled task">
                    + Add
                </button>
            </div>

            <div className="sidebar-description">
                <p>{isDragOver ? '🎯 Drop task here to unschedule' : 'Tasks waiting to be scheduled'}</p>
            </div>

            <div className="unscheduled-tasks">
                {tasks.length === 0 && !isAddingTask && (
                    <div className="empty-state">
                        <p>{isDragOver ? 'Drop task here' : 'No unscheduled tasks'}</p>
                        {!isDragOver && <p className="hint">Click "+ Add" to create a task</p>}
                    </div>
                )}

                {isAddingTask && (
                    <div className="add-task-form">
                        <select
                            value={selectedGoalId}
                            onChange={(e) => setSelectedGoalId(e.target.value)}
                            className="goal-select"
                        >
                            {goals.map(goal => (
                                <option key={goal.id} value={goal.id}>
                                    {goal.title}
                                </option>
                            ))}
                        </select>
                        <textarea
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            placeholder="Enter task description..."
                            className="task-input"
                            autoFocus
                        />
                        <div className="form-actions">
                            <button onClick={handleSaveTask} className="save-btn">
                                Save
                            </button>
                            <button onClick={handleCancel} className="cancel-btn">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        goals={goals}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                        onToggleComplete={onToggleComplete}
                    />
                ))}
            </div>
        </div>
    );
};
