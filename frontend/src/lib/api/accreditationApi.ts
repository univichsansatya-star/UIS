// Accreditation API
import API_BASE_URL, { extractResults } from './apiConfig';

export async function getAccreditationList() {
  try {
    const response = await fetch(`${API_BASE_URL}/akreditasi/`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return extractResults(await response.json());
  } catch (error) {
    console.error('Error fetching accreditations:', error);
    return [];
  }
}
