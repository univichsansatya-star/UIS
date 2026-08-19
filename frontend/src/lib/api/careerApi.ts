// Career API
const API_BASE_URL = 'http://localhost:8000/api';

export async function getJobVacancies(field?: string) {
  try {
    const query = field ? `?field=${encodeURIComponent(field)}` : '';
    const response = await fetch(`${API_BASE_URL}/job-vacancies/${query}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching job vacancies:', error);
    return [];
  }
}
