// Document API
const API_BASE_URL = 'http://localhost:8000/api';

export async function getDocuments() {
  try {
    const response = await fetch(`${API_BASE_URL}/documents/`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}

export async function getDocumentCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/document-categories/`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching document categories:', error);
    return [];
  }
}

export async function getGuidelines() {
  try {
    const response = await fetch(`${API_BASE_URL}/guidelines/`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching guidelines:', error);
    return [];
  }
}
