// Document API
import API_BASE_URL, { extractResults } from './apiConfig';

export async function getDocuments(category?: string) {
  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const response = await fetch(`${API_BASE_URL}/download/files/${query}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return extractResults(await response.json());
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}

export async function getDocumentCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/download/categories/`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return extractResults(await response.json());
  } catch (error) {
    console.error('Error fetching document categories:', error);
    return [];
  }
}

export async function getGuidelines() {
  try {
    const response = await fetch(`${API_BASE_URL}/pedoman/`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return extractResults(await response.json());
  } catch (error) {
    console.error('Error fetching guidelines:', error);
    return [];
  }
}
