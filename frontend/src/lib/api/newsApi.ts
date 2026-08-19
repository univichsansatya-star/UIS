// News API
const API_BASE_URL = 'http://localhost:8000/api';

export async function getNewsList(category?: string, search?: string) {
  try {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    const response = await fetch(`${API_BASE_URL}/news/?${params.toString()}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching news list:', error);
    return { results: [] };
  }
}

export async function getNewsBySlug(slug: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/news/?slug=${slug}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return data.results?.[0] || null;
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
}
