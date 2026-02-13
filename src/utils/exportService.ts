import type { AppData } from '../types';

/**
 * Export Service
 * Utilities for exporting and importing application data
 */

export const exportService = {
    /**
     * Export data as JSON file download
     */
    exportToJSON: (data: AppData, filename: string = 'weekly-goal-tracker-data.json'): void => {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },

    /**
     * Import data from JSON file
     */
    importFromJSON: (file: File): Promise<AppData> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const content = e.target?.result as string;
                    const data = JSON.parse(content) as AppData;

                    // Validate data structure
                    if (!data.goals || !data.tasks || !Array.isArray(data.goals) || !Array.isArray(data.tasks)) {
                        throw new Error('Invalid data format');
                    }

                    resolve(data);
                } catch (error) {
                    reject(new Error('Failed to parse JSON file'));
                }
            };

            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };

            reader.readAsText(file);
        });
    },
};
