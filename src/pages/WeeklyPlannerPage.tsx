import type { Task, Goal } from '../types';
import { WeeklyGrid } from '../components/WeeklyGrid';
import { UnscheduledTaskList } from '../components/UnscheduledTaskList';
import { getNextWeek, getPreviousWeek, formatDateShort } from '../utils/dateUtils';
import './WeeklyPlannerPage.css';

interface WeeklyPlannerPageProps {
    weekStart: Date;
    tasks: Task[];
    goals: Goal[];
    onWeekChange: (newWeekStart: Date) => void;
    onAddTask: (task: Omit<Task, 'id'>) => void;
    onEditTask: (task: Task) => void;
    onDeleteTask: (id: string) => void;
    onToggleComplete: (id: string) => void;
    onPrintPlanner: () => void;
}

export const WeeklyPlannerPage = ({
    weekStart,
    tasks,
    goals,
    onWeekChange,
    onAddTask,
    onEditTask,
    onDeleteTask,
    onToggleComplete,
    onPrintPlanner,
}: WeeklyPlannerPageProps) => {
    const handlePreviousWeek = () => {
        onWeekChange(getPreviousWeek(weekStart));
    };

    const handleNextWeek = () => {
        onWeekChange(getNextWeek(weekStart));
    };

    const handleToday = () => {
        onWeekChange(new Date());
    };

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    // Filter tasks into scheduled and unscheduled
    const scheduledTasks = tasks.filter(task => task.date);
    const unscheduledTasks = tasks.filter(task => !task.date);

    return (
        <div className="weekly-planner-page">
            <div className="planner-header">
                <div className="week-navigation no-print">
                    <button onClick={handlePreviousWeek} className="nav-btn">
                        ◀ Previous
                    </button>
                    <button onClick={handleToday} className="today-btn">
                        Today
                    </button>
                    <button onClick={handleNextWeek} className="nav-btn">
                        Next ▶
                    </button>
                </div>

                <h1 className="week-title">
                    Week of {formatDateShort(weekStart)} - {formatDateShort(weekEnd)}
                </h1>

                <button onClick={onPrintPlanner} className="print-btn no-print">
                    🖨️ Print Planner
                </button>
            </div>

            {goals.length === 0 ? (
                <div className="no-goals-warning">
                    <p>⚠️ Please add at least one yearly goal before creating tasks.</p>
                </div>
            ) : (
                <div className="planner-content">
                    <aside className="sidebar no-print">
                        <UnscheduledTaskList
                            tasks={unscheduledTasks}
                            goals={goals}
                            onAddTask={onAddTask}
                            onEditTask={onEditTask}
                            onDeleteTask={onDeleteTask}
                            onToggleComplete={onToggleComplete}
                        />
                    </aside>
                    <div className="planner-main">
                        <WeeklyGrid
                            weekStart={weekStart}
                            tasks={scheduledTasks}
                            goals={goals}
                            onAddTask={onAddTask}
                            onEditTask={onEditTask}
                            onDeleteTask={onDeleteTask}
                            onToggleComplete={onToggleComplete}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
