/**
 * Local API Service - Replaces Base44 SDK
 * Uses Firestore for data storage
 */

import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Waitlist Signup Service
export const waitlistService = {
    async create(signupData) {
        try {
            const docRef = await addDoc(collection(db, 'waitlist_signups'), {
                ...signupData,
                createdAt: serverTimestamp(),
                status: 'pending'
            });
            return { id: docRef.id, ...signupData };
        } catch (error) {
            console.error('Error creating waitlist signup:', error);
            throw error;
        }
    },

    async getAll() {
        try {
            const q = query(
                collection(db, 'waitlist_signups'),
                orderBy('createdAt', 'desc')
            );
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error fetching waitlist signups:', error);
            return [];
        }
    },

    async getByType(signupType) {
        try {
            const q = query(
                collection(db, 'waitlist_signups'),
                where('signup_type', '==', signupType),
                orderBy('createdAt', 'desc')
            );
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error fetching waitlist signups by type:', error);
            return [];
        }
    }
};

// App Logs Service (for navigation tracking - optional)
export const appLogsService = {
    async logPageView(pageName, userId = null) {
        try {
            await addDoc(collection(db, 'app_logs'), {
                type: 'page_view',
                pageName,
                userId,
                timestamp: serverTimestamp(),
                userAgent: navigator.userAgent
            });
        } catch (error) {
            // Silently fail - logging shouldn't break the app
            console.debug('Log error:', error);
        }
    }
};

// Export a unified API object for backwards compatibility
export const localApi = {
    waitlist: waitlistService,
    logs: appLogsService
};

export default localApi;
