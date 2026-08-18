// Admission API functions
// These should connect to your backend API

const API_BASE_URL = 'http://localhost:8000/api';

export interface AdmissionApplicationData {
  fullName: string;
  email: string;
  phone: string;
  chosenProgramId: number;
  highSchool: string;
  graduationYear: number;
}

export interface AcademicRegistrationForm {
  studyProgramId: number;
  registrationType: string;
  notes?: string;
}

// Submit admission application
export async function submitAdmissionApplication(data: AdmissionApplicationData) {
  try {
    const response = await fetch(`${API_BASE_URL}/admissions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting admission application:', error);
    throw error;
  }
}

// Submit academic registration
export async function submitAcademicRegistration(data: AcademicRegistrationForm) {
  try {
    const response = await fetch(`${API_BASE_URL}/academics/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting academic registration:', error);
    throw error;
  }
}

// Submit tracer study
export async function submitTracerStudy(data: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/tracer-studies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting tracer study:', error);
    throw error;
  }
}

// Get study programs
export async function getStudyPrograms() {
  try {
    const response = await fetch(`${API_BASE_URL}/programs-public/`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching study programs:', error);
    throw error;
  }
}

// Get news
export async function getNews() {
  try {
    const response = await fetch(`${API_BASE_URL}/news/`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

// Get news detail
export async function getNewsDetail(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/news/${id}/`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching news detail:', error);
    throw error;
  }
}

// Get content (pages)
export async function getContent(slug: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/content/?slug=${slug}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results?.[0] || null;
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
}
