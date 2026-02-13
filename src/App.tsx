import { useState, useEffect } from 'react';
import type { Goal, Task, ViewMode, ThemeMode, AppData } from './types';
import { Navigation } from './components/Navigation';
import { GoalsPage } from './pages/GoalsPage';
import { WeeklyPlannerPage } from './pages/WeeklyPlannerPage';
import { cookieService } from './utils/cookieService';
import { exportService } from './utils/exportService';
import { getWeekStart } from './utils/dateUtils';
import './App.css';

const STORAGE_KEY = 'weekly-goal-tracker-data';
const THEME_KEY = 'weekly-goal-tracker-theme';

function App() {
  // Load initial data from cookies
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = cookieService.get<AppData>(STORAGE_KEY);
    return saved?.goals || [];
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = cookieService.get<AppData>(STORAGE_KEY);
    return saved?.tasks || [];
  });

  const [currentView, setCurrentView] = useState<ViewMode>('goals');
  const [weekStart, setWeekStart] = useState<Date>(getWeekStart());
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = cookieService.get<ThemeMode>(THEME_KEY);
    return saved || 'light';
  });

  // Save data to cookies whenever it changes
  useEffect(() => {
    const data: AppData = { goals, tasks };
    cookieService.set(STORAGE_KEY, data);
  }, [goals, tasks]);

  // Save theme preference
  useEffect(() => {
    cookieService.set(THEME_KEY, theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Goal Management
  const handleAddGoal = (goalData: Omit<Goal, 'id' | 'createdDate'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: crypto.randomUUID(),
      createdDate: new Date().toISOString(),
    };
    setGoals([...goals, newGoal]);
  };

  const handleEditGoal = (updatedGoal: Goal) => {
    setGoals(goals.map(g => g.id === updatedGoal.id ? updatedGoal : g));
  };

  const handleDeleteGoal = (id: string) => {
    if (confirm('Are you sure you want to delete this goal? All associated tasks will also be deleted.')) {
      setGoals(goals.filter(g => g.id !== id));
      setTasks(tasks.filter(t => t.goalId !== id));
    }
  };

  // Task Management
  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // Export/Import
  const handleExport = () => {
    const data: AppData = { goals, tasks };
    const timestamp = new Date().toISOString().split('T')[0];
    exportService.exportToJSON(data, `weekly-goal-tracker-${timestamp}.json`);
  };

  const handleImport = (data: AppData) => {
    setGoals(data.goals);
    setTasks(data.tasks);
  };

  // Print Functions
  const handlePrintGoals = () => {
    setCurrentView('goals');
    setTimeout(() => window.print(), 100);
  };

  const handlePrintPlanner = () => {
    setCurrentView('planner');
    setTimeout(() => window.print(), 100);
  };

  // Theme Toggle
  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        onExport={handleExport}
        onImport={handleImport}
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />

      <main className="app-main">
        {currentView === 'goals' ? (
          <GoalsPage
            goals={goals}
            tasks={tasks}
            onAddGoal={handleAddGoal}
            onEditGoal={handleEditGoal}
            onDeleteGoal={handleDeleteGoal}
            onPrintGoals={handlePrintGoals}
          />
        ) : (
          <WeeklyPlannerPage
            weekStart={weekStart}
            tasks={tasks}
            goals={goals}
            onWeekChange={setWeekStart}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
            onPrintPlanner={handlePrintPlanner}
          />
        )}
      </main>
    </div>
  );
}

export default App;
