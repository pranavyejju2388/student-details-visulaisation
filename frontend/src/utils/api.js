const API_BASE_URL = 'http://localhost:8080/api/events'; // Changed to match your Spring Boot port

/**
 * Fetches events grouped by category
 * @returns {Promise<Array>} Array of events grouped by category
 */
export const fetchEventsGroupedByCategory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/group-by-category`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching events grouped by category:', error);
    throw error;
  }
};

/**
 * Fetches achievement distribution data
 * @returns {Promise<Array>} Array of achievement distribution data
 */
export const fetchAchievementDistribution = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/achievement-distribution`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching achievement distribution:', error);
    throw error;
  }
};

/**
 * Fetches events over time data
 * @returns {Promise<Array>} Array of events over time
 */
export const fetchEventsOverTime = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/events-over-time`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching events over time:', error);
    throw error;
  }
};

/**
 * Fetches filtered events based on provided filters
 * @param {Object} filters - Filter criteria
 * @param {string} [filters.department] - Department filter
 * @param {string} [filters.fromYear] - Start year filter
 * @param {string} [filters.toYear] - End year filter
 * @param {string} [filters.category] - Event category filter
 * @param {string} [filters.type] - Event type filter
 * @returns {Promise<Array>} Array of filtered events
 */
export const fetchFilteredEvents = async (filters = {}) => {
  try {
    const { department, fromYear, toYear, category, type } = filters;
    
    // Construct query parameters, only including non-empty values
    const params = new URLSearchParams();
    if (department && department !== 'all') params.append('department', department);
    if (fromYear && fromYear !== 'all') params.append('fromYear', fromYear);
    if (toYear && toYear !== 'all') params.append('toYear', toYear);
    if (category && category !== 'all') params.append('category', category);
    if (type) params.append('type', type); // Only include type if provided

    const response = await fetch(`${API_BASE_URL}/filter?${params.toString()}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching filtered events:', error);
    throw error;
  }
};

// Optionally, you could add a function to fetch all available filter options
export const fetchFilterOptions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter-options`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error;
  }
};