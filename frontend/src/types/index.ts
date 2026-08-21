// TypeScript Interfaces for Universitas Ichsan Satya (UIS)

export type NewsCategory = 'Akademik' | 'Pengumuman' | 'Prestasi' | 'Kegiatan' | 'Penelitian';

export interface News {
  id: number;
  slug: string;
  title: string;
  category: NewsCategory;
  coverImage: string;
  publishedAt: string; // ISO format e.g. "2026-07-28"
  author: string;
  summary: string;
  content: string; // rich text/HTML
  videoUrl?: string;
  viewsCount?: number;
}

export interface StudyProgram {
  id: number;
  name: string;
  slug: string;
  degree: 'D3' | 'S1' | 'Profesi' | 'S2';
  accreditation: 'Unggul' | 'Baik Sekali' | 'Baik' | 'A' | 'B';
  content: string;
  facultyId: number;
  durationYears: number;
  careerOutlooks: string[];
  headOfProgram: string;
  iconName?: string;
}

export interface Faculty {
  id: number;
  name: string;
  slug: string;
  description: string;
  deanName: string;
  programs: StudyProgram[];
  image: string;
}

export interface Accreditation {
  id: number;
  title: string;
  category: 'Institusi' | 'Program Studi';
  accreditationGrade: 'Unggul' | 'Baik Sekali' | 'Baik' | 'A' | 'B';
  decreeNumber: string; // No SK BAN-PT / LAM-PTKes
  validUntil: string;
  content: string;
  image: string;
  slug: string;
}

export interface Speaker {
  id: number;
  name: string;
  role: string;
  photo: string;
  institution?: string;
}

export interface Training {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  registrationLink: string;
  status: 'upcoming' | 'past';
  speakers: Speaker[];
  fee: string;
  quotaLeft?: number;
}

export interface JobVacancy {
  id: number;
  title: string;
  companyName: string;
  location: string;
  field: 'Keperawatan' | 'Kebidanan' | 'Farmasi' | 'Teknologi Informasi' | 'Manajemen Rumah Sakit' | 'Umum';
  description: string;
  requirements: string[];
  openDate: string;
  closeDate: string;
  image: string;
  isPublished: boolean;
  contactEmail: string;
}

export interface Scholarship {
  id: number;
  title: string;
  provider: 'KIP-Kuliah' | 'Yayasan Ichsan Satya' | 'Pemerintah Daerah' | 'Mitra Industri';
  image: string;
  summary: string;
  eligibility: string[];
  benefits: string[];
  deadline: string;
  isPublished: boolean;
}

export interface AdmissionApplication {
  fullName: string;
  nik: string;
  birthPlace: string;
  birthDate: string;
  gender: 'L' | 'P';
  religion: string;
  address: string;
  phoneNumber: string;
  email: string;
  previousSchool: string;
  graduationYear: string;
  previousMajor: string;
  chosenProgramId: number;
  fatherName: string;
  motherName: string;
  guardianName?: string;
  parentOccupation: string;
  parentIncome: string;
}

export interface Testimonial {
  id: number;
  name: string;
  graduateYear: string;
  programName: string;
  currentJob: string;
  company: string;
  quote: string;
  photo: string;
}

export interface DocumentCategory {
  id: number;
  name: string;
}

export interface DocumentItem {
  id: number;
  title: string;
  categoryId: number;
  fileSize: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX';
  downloadUrl: string;
  updatedAt: string;
  description?: string;
}

export interface GuidelineItem {
  id: number;
  title: string;
  category: string;
  targetAudience: 'Mahasiswa' | 'Dosen & Staff' | 'Umum';
  fileSize: string;
  fileType: 'PDF';
  downloadUrl: string;
  updatedAt: string;
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
}

export interface RectorGreeting {
  name: string;
  title: string;
  photo: string;
  quote: string;
  fullMessage: string[];
}

export interface CampusStats {
  studentsCount: number;
  alumniCount: number;
  studyProgramsCount: number;
  employedRatePercentage: number;
  accreditationGrade: string;
}

export interface VideoTour {
  id: number;
  title: string;
  youtubeEmbedUrl: string;
  description: string;
}

export interface VisionMission {
  id: number;
  vision: string;
  missions: string[];
}

export interface CampusProfileSection {
  id: number;
  title: string;
  slug: string;
  content: string;
  order: number;
}

export interface PopupAnnouncement {
  id: number;
  title: string;
  image: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
}

export interface ContactInfo {
  address: string;
  phone1: string;
  phone2: string;
  whatsapp: string;
  email: string;
  pmbEmail: string;
  operationalHours: string;
  googleMapsEmbedUrl: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
  };
}

export interface ResearchNews {
  id: number;
  slug: string;
  title: string;
  category: 'Penelitian' | 'Pengabdian Masyarakat' | 'Jurnal & Publikasi';
  author: string;
  publishedAt: string;
  coverImage: string;
  abstract: string;
  content: string;
  downloadPdfUrl?: string;
}

export interface AcademicRegistrationForm {
  type: 'skripsi' | 'sidang' | 'wisuda' | 'camping';
  nim: string;
  fullName: string;
  studyProgramId: number;
  email: string;
  phone: string;
  thesisTitle?: string;
  advisorName?: string;
  academicYear?: string;
  notes?: string;
}

export interface TracerStudySubmission {
  nim: string;
  fullName: string;
  studyProgramId: number;
  graduationYear: string;
  employmentStatus: 'Bekerja' | 'Wirausaha' | 'Lanjut Studi' | 'Mencari Kerja';
  companyName?: string;
  jobTitle?: string;
  firstJobTimeMonths?: number;
  monthlySalaryRange?: string;
  relevanceToMajor: 'Sangat Sesuai' | 'Sesuai' | 'Kurang Sesuai' | 'Tidak Sesuai';
  feedbackForCampus: string;
}
