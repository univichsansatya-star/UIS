import API_BASE_URL, { extractResults } from './apiConfig';

export interface AdmissionApplicationData {
  fullName: string;
  email: string;
  phone: string;
  chosenProgramId: number;
  previousSchool: string;
  graduationYear: string;
}

export interface AcademicRegistrationForm {
  studyProgramId: number;
  registrationType: string;
  notes?: string;
}

// Submit admission application
export async function submitAdmissionApplication(data: AdmissionApplicationData) {
  try {
    const response = await fetch(`${API_BASE_URL}/pmb/register/`, {
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
    const response = await fetch(`${API_BASE_URL}/layanan-akademik/submit/`, {
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
    const response = await fetch(`${API_BASE_URL}/tracer-study/submit/`, {
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
    const response = await fetch(`${API_BASE_URL}/prodi/`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return extractResults(await response.json());
  } catch (error) {
    console.error('Error fetching study programs:', error);
    throw error;
  }
}

// Get news
export async function getNews() {
  try {
    const response = await fetch(`${API_BASE_URL}/berita/`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return extractResults(await response.json());
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

// Get news detail
export async function getNewsDetail(slug: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/berita/${encodeURIComponent(slug)}/`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching news detail:', error);
    throw error;
  }
}

