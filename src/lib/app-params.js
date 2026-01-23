/**
 * Application Parameters
 * Simplified configuration without Base44 dependencies
 */

// Helper to convert camelCase to snake_case
const toSnakeCase = (str) => str.replace(/([A-Z])/g, '_$1').toLowerCase();

// Get app parameter from URL or localStorage
const getAppParamValue = (paramName, { defaultValue = null } = {}) => {
	const storage = typeof window !== 'undefined' ? window.localStorage : null;
	const storageKey = `app_${toSnakeCase(paramName)}`;

	// First check URL params
	if (typeof window !== 'undefined') {
		const urlParams = new URLSearchParams(window.location.search);
		const urlValue = urlParams.get(paramName);
		if (urlValue) {
			if (storage) storage.setItem(storageKey, urlValue);
			return urlValue;
		}
	}

	// Then check localStorage
	if (storage) {
		const storedValue = storage.getItem(storageKey);
		if (storedValue) return storedValue;
	}

	return defaultValue;
};

// Clear all stored app parameters
const clearAppParams = () => {
	const storage = typeof window !== 'undefined' ? window.localStorage : null;
	if (storage) {
		storage.removeItem('app_access_token');
	}
};

// Export app configuration
export const appParams = {
	appBaseUrl: getAppParamValue("app_base_url", { defaultValue: 'http://localhost:5173' }),
	clearAppParams
};
