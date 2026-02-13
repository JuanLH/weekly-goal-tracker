/**
 * Cookie Service
 * Utilities for reading and writing data to browser cookies
 */

export const cookieService = {
    /**
     * Set a cookie with JSON data
     */
    set: (name: string, value: any, days: number = 365): void => {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        const jsonValue = JSON.stringify(value);
        document.cookie = `${name}=${encodeURIComponent(jsonValue)};expires=${expires.toUTCString()};path=/`;
    },

    /**
     * Get a cookie and parse JSON data
     */
    get: <T>(name: string): T | null => {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                const value = decodeURIComponent(c.substring(nameEQ.length, c.length));
                try {
                    return JSON.parse(value) as T;
                } catch {
                    return null;
                }
            }
        }
        return null;
    },

    /**
     * Delete a cookie
     */
    delete: (name: string): void => {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    },
};
