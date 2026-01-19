/**
 * Simple Local Storage Adapter to mimic Firestore for this demo.
 * This ensures data persistence across page reloads without needing a live database index.
 */

const STORAGE_KEYS = {
    USERS: 'camana_users',
    REPORTS: 'camana_reports'
};

export const localDB = {
    // User Methods
    saveUser: (user) => {
        try {
            const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '{}');
            users[user.uid] = {
                ...user,
                lastLogin: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
            return true;
        } catch (e) {
            console.error('LocalDB Save User Error:', e);
            return false;
        }
    },

    getUser: (uid) => {
        try {
            const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '{}');
            return users[uid] || null;
        } catch (e) {
            return null;
        }
    },

    // Report Methods
    saveReport: (report) => {
        try {
            const reports = JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]');
            const newReport = {
                id: `rpt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                ...report,
                generatedAt: new Date().toISOString() // Store as ISO string for simpler serialization
            };
            reports.unshift(newReport); // Add to beginning
            localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
            return newReport;
        } catch (e) {
            console.error('LocalDB Save Report Error:', e);
            return null;
        }
    },

    getReports: (userId) => {
        try {
            const reports = JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]');
            // Filter by user ID and sort by date descending
            return reports
                .filter(r => r.userId === userId)
                .sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt));
        } catch (e) {
            return [];
        }
    },

    // Initialize (Optional clearing or setup)
    clear: () => {
        localStorage.removeItem(STORAGE_KEYS.USERS);
        localStorage.removeItem(STORAGE_KEYS.REPORTS);
    }
};
