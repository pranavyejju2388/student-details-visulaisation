// api.js
const API_BASE_URL = 'http://localhost:5173/api/events';

// Fetch events grouped by category
export const fetchEventsGroupedByCategory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/group-by-category`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Events grouped by category:', data);
    return data;
  } catch (error) {
    console.error('Error fetching events grouped by category:', error);
    throw error;
  }
};

// Fetch achievement distribution
export const fetchAchievementDistribution = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/achievement-distribution`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Achievement distribution:', data);
    return data;
  } catch (error) {
    console.error('Error fetching achievement distribution:', error);
    throw error;
  }
};

// Fetch events over time
export const fetchEventsOverTime = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/events-over-time`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Events over time:', data);
    return data;
  } catch (error) {
    console.error('Error fetching events over time:', error);
    throw error;
  }
};

// Fetch filtered events
export const fetchFilteredEvents = async (filters) => {
  try {
    const { department, fromYear, toYear, category } = filters;
    const params = new URLSearchParams({
      department: department === 'all' ? '' : department,
      fromYear: fromYear === 'all' ? '' : fromYear,
      toYear: toYear === 'all' ? '' : toYear,
      category: category === 'all' ? '' : category,
      type: 'Technical' // Assuming you want to filter by technical events
    });

    const response = await fetch(`${API_BASE_URL}/filter?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Filtered events:', data);
    return data;
  } catch (error) {
    console.error('Error fetching filtered events:', error);
    throw error;
  }
};