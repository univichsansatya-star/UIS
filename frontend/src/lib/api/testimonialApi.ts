// Testimonial API
import API_BASE_URL, { extractResults } from './apiConfig';

export async function getTestimonials() {
  try {
    const response = await fetch(`${API_BASE_URL}/testimoni/`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return extractResults(await response.json());
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}
