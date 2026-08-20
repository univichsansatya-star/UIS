// Career API
import API_BASE_URL, { extractResults } from './apiConfig';

export async function getJobVacancies(field?: string) {
  try {
    const query = field ? `?field=${encodeURIComponent(field)}` : '';
    const response = await fetch(`${API_BASE_URL}/loker/${query}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return extractResults(await response.json());
  } catch (error) {
    console.error('Error fetching job vacancies:', error);
    return [];
  }
}
