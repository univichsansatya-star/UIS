import { Faculty, StudyProgram } from '../../types';
import API_BASE_URL, { extractResults } from './apiConfig';
import { mockFaculties, mockStudyPrograms } from './mockData';

export async function getFaculties(): Promise<Faculty[]> {
  try {
    const [facultyResponse, programResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/fakultas/`),
      fetch(`${API_BASE_URL}/prodi/`),
    ]);
    if (!facultyResponse.ok || !programResponse.ok) throw new Error('Failed to fetch academic data');
    const faculties = extractResults<Faculty>(await facultyResponse.json());
    const programs = extractResults<StudyProgram>(await programResponse.json());
    return faculties.map((faculty) => ({
      ...faculty,
      programs: programs.filter((program) => program.facultyId === faculty.id),
    }));
  } catch (error) {
    console.error('Error fetching faculties:', error);
    return mockFaculties;
  }
}

export async function getStudyProgramBySlug(slug: string): Promise<StudyProgram | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/prodi/${encodeURIComponent(slug)}/`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return extractResults<StudyProgram>(data)[0] || null;
  } catch (error) {
    console.error('Error fetching study program:', error);
    return mockStudyPrograms.find(p => p.slug === slug) || null;
  }
}

export async function getAllStudyPrograms(): Promise<StudyProgram[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/prodi/`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return extractResults(await response.json());
  } catch (error) {
    console.error('Error fetching study programs:', error);
    return mockStudyPrograms;
  }
}
