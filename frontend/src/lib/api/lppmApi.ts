// LPPM (Research) API
const API_BASE_URL = 'http://localhost:8000/api';

export async function getResearchNews() {
  try {
    const response = await fetch(`${API_BASE_URL}/research/`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching research news:', error);
    return [];
  }
}
