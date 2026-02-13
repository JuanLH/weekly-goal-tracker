# 📋 Weekly Goal Tracker

A comprehensive goal tracking application built with React 19.2 and TypeScript. Track yearly goals and link weekly tasks to achieve them with cookie-based persistence, import/export, and print functionality.

![React](https://img.shields.io/badge/React-19.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple)

## ✨ Features

### 📊 Goals Management
- Create, edit, and delete yearly goals
- Track progress with automatic completion percentage
- View all tasks associated with each goal
- Optional goal descriptions

### 📅 Weekly Planner
- Monday-Sunday weekly grid layout
- Navigate between weeks (Previous/Next/Today)
- Add tasks for each day linked to yearly goals
- Mark tasks as complete
- Edit and delete tasks inline
- Today's date highlighted

### 💾 Data Persistence
- Automatic cookie-based storage
- Data persists across browser sessions
- No backend required

### 📥📤 Import/Export
- Export all data as JSON file
- Import data from JSON file
- Backup and restore functionality

### 🖨️ Print Features
- Print Goals: Clean printable goal list
- Print Weekly Planner: Optimized weekly grid layout
- Landscape mode for planner printing
- Hidden controls in print view

### 🎨 UI/UX
- Modern, responsive design
- Light/Dark mode toggle
- Smooth animations and transitions
- Mobile-friendly layout
- Premium gradient styling

## 🚀 Quick Start

```bash
npm install && npm run dev
```

The application will be available at `http://localhost:5173/`

## 📖 Usage Guide

### 1. Add Yearly Goals
1. Navigate to the "Goals" tab
2. Click "+ Add Goal"
3. Enter goal title and optional description
4. Click "Add Goal"

### 2. Create Weekly Tasks
1. Navigate to the "Weekly Planner" tab
2. Click the "+" button on any day
3. Enter task description
4. Select which goal this task relates to
5. Click "Add"

### 3. Manage Tasks
- **Complete**: Click the checkbox
- **Edit**: Click the pencil icon
- **Delete**: Click the trash icon

### 4. Navigate Weeks
- **Previous Week**: Click "◀ Previous"
- **Next Week**: Click "Next ▶"
- **Current Week**: Click "Today"

### 5. Export/Import Data
- **Export**: Click "📥 Export" to download JSON file
- **Import**: Click "📤 Import" and select JSON file

### 6. Print
- **Print Goals**: Click "🖨️ Print Goals" on Goals page
- **Print Planner**: Click "🖨️ Print Planner" on Weekly Planner page

## 🏗️ Project Structure

```
src/
├── components/
│   ├── GoalCard.tsx          # Individual goal display
│   ├── GoalsPanel.tsx        # Goals list and form
│   ├── TaskCard.tsx          # Individual task display
│   ├── DayColumn.tsx         # Single day column
│   ├── WeeklyGrid.tsx        # 7-day grid layout
│   └── Navigation.tsx        # Top navigation bar
├── pages/
│   ├── GoalsPage.tsx         # Goals management page
│   └── WeeklyPlannerPage.tsx # Weekly planner page
├── types/
│   └── index.ts              # TypeScript interfaces
├── utils/
│   ├── cookieService.ts      # Cookie management
│   ├── exportService.ts      # Import/export utilities
│   └── dateUtils.ts          # Date manipulation
├── App.tsx                   # Main application
└── main.tsx                  # Entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📋 Data Model

### Goal
```typescript
{
  id: string;
  title: string;
  description?: string;
  createdDate: string;
}
```

### Task
```typescript
{
  id: string;
  text: string;
  goalId: string;
  completed: boolean;
  date: string; // YYYY-MM-DD
}
```

## 🎯 Key Features Explained

### Goal Progress Tracking
Each goal automatically calculates its completion percentage based on:
- Total tasks linked to the goal
- Number of completed tasks
- Formula: (completed tasks / total tasks) × 100%

### Cookie Persistence
- Data saved automatically on every change
- 365-day cookie expiration
- JSON serialization for complex data structures

### Print Optimization
- `@media print` CSS rules
- Hidden interactive elements
- Landscape mode for weekly planner
- Clean, professional layout

### Dark Mode
- Toggle between light and dark themes
- Preference saved in cookies
- Smooth transitions
- Optimized contrast

## 🌟 Bonus Features Implemented

✅ **Goal Progress Indicator** - Visual progress bars on each goal  
✅ **Light/Dark Mode Toggle** - Theme switcher with persistence  
✅ **Today Highlighting** - Current day highlighted in planner  
✅ **Week Navigation** - Easy navigation between weeks  
✅ **Responsive Design** - Works on all screen sizes

## 📱 Responsive Breakpoints

- **Desktop**: 7-column grid (1200px+)
- **Tablet**: 3-column grid (768px - 1200px)
- **Mobile**: 1-column stack (<768px)

## 🖨️ Print Layouts

### Goals Print
- One column layout
- Full goal details
- Progress indicators
- Creation dates

### Weekly Planner Print
- 7-column grid (landscape)
- All tasks visible
- Goal labels shown
- Date headers

## 💡 Tips

1. **Start with Goals**: Add your yearly goals before creating tasks
2. **Link Everything**: Every task must be linked to a goal
3. **Regular Backups**: Export your data regularly
4. **Print Planning**: Use print feature for physical planning
5. **Dark Mode**: Switch to dark mode for night planning

## 📄 License

This is a starter project - use it however you'd like!

---

**Start tracking your goals today!** 🎯
