// LPPM (Research) API
import API_BASE_URL, { extractResults } from './apiConfig';

export async function getResearchNews() {
  try {
    const response = await fetch(`${API_BASE_URL}/lppm/`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return extractResults(await response.json());
  } catch (error) {
    console.error('Error fetching research news:', error);
    return [];
  }
}
