import type { Task, Goal } from '../types';
import { DayColumn } from './DayColumn';
import { getWeekDays, formatDateISO, formatDayName } from '../utils/dateUtils';
import './WeeklyGrid.css';

interface WeeklyGridProps {
    weekStart: Date;
    tasks: Task[];
    goals: Goal[];
    onAddTask: (task: Omit<Task, 'id'>) => void;
    onEditTask: (task: Task) => void;
    onDeleteTask: (id: string) => void;
    onToggleComplete: (id: string) => void;
}

export const WeeklyGrid = ({
    weekStart,
    tasks,
    goals,
    onAddTask,
    onEditTask,
    onDeleteTask,
    onToggleComplete,
}: WeeklyGridProps) => {
    const weekDays = getWeekDays(weekStart);

    const getTasksForDay = (date: Date): Task[] => {
        const dateStr = formatDateISO(date);
        return tasks.filter(task => task.date === dateStr);
    };

    return (
        <div className="weekly-grid">
            {weekDays.map((day, index) => (
                <DayColumn
                    key={index}
                    date={day}
                    dayName={formatDayName(day)}
                    tasks={getTasksForDay(day)}
                    goals={goals}
                    onAddTask={onAddTask}
                    onEditTask={onEditTask}
                    onDeleteTask={onDeleteTask}
                    onToggleComplete={onToggleComplete}
                />
            ))}
        </div>
    );
};
