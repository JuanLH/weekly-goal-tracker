/**
 * Date Utilities
 * Helper functions for date manipulation and formatting
 */

/**
 * Get the start of the week (Monday) for a given date
 */
export const getWeekStart = (date: Date = new Date()): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
};

/**
 * Get all 7 days of the week (Mon-Sun) starting from a given date
 */
export const getWeekDays = (startDate: Date = new Date()): Date[] => {
    const weekStart = getWeekStart(startDate);
    const days: Date[] = [];

    for (let i = 0; i < 7; i++) {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + i);
        days.push(day);
    }

    return days;
};

/**
 * Format date as YYYY-MM-DD
 */
export const formatDateISO = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Format date as "Mon, Jan 1"
 */
export const formatDateShort = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
};

/**
 * Format date as "Monday"
 */
export const formatDayName = (date: Date): string => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
};

/**
 * Get the next week's start date
 */
export const getNextWeek = (currentWeekStart: Date): Date => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(currentWeekStart.getDate() + 7);
    return nextWeek;
};

/**
 * Get the previous week's start date
 */
export const getPreviousWeek = (currentWeekStart: Date): Date => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(currentWeekStart.getDate() - 7);
    return prevWeek;
};

/**
 * Check if two dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
    return formatDateISO(date1) === formatDateISO(date2);
};

/**
 * Parse ISO date string to Date object
 */
export const parseISODate = (dateString: string): Date => {
    return new Date(dateString);
};
