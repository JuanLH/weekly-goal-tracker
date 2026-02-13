import { useRef } from 'react';
import type { ViewMode, ThemeMode } from '../types';
import { exportService } from '../utils/exportService';
import type { AppData } from '../types';
import './Navigation.css';

interface NavigationProps {
    currentView: ViewMode;
    onViewChange: (view: ViewMode) => void;
    onExport: () => void;
    onImport: (data: AppData) => void;
    theme: ThemeMode;
    onThemeToggle: () => void;
}

export const Navigation = ({
    currentView,
    onViewChange,
    onExport,
    onImport,
    theme,
    onThemeToggle,
}: NavigationProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const data = await exportService.importFromJSON(file);
                onImport(data);
                alert('Data imported successfully!');
            } catch (error) {
                alert('Failed to import data. Please check the file format.');
            }
            // Reset input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <nav className="navigation">
            <div className="nav-brand">
                <h1>📋 Weekly Goal Tracker</h1>
            </div>

            <div className="nav-tabs">
                <button
                    className={`nav-tab ${currentView === 'goals' ? 'active' : ''}`}
                    onClick={() => onViewChange('goals')}
                >
                    🎯 Goals
                </button>
                <button
                    className={`nav-tab ${currentView === 'planner' ? 'active' : ''}`}
                    onClick={() => onViewChange('planner')}
                >
                    📅 Weekly Planner
                </button>
            </div>

            <div className="nav-actions">
                <button onClick={onExport} className="action-btn export-btn" title="Export data">
                    📥 Export
                </button>
                <button onClick={handleImportClick} className="action-btn import-btn" title="Import data">
                    📤 Import
                </button>
                <button onClick={onThemeToggle} className="action-btn theme-btn" title="Toggle theme">
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>
        </nav>
    );
};
