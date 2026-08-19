// Mock data for development
// Replace with real API calls in production
import type {Faculty, StudyProgram} from '../../types';

export const mockContactInfo = {
  email: 'info@universitasichsansatya.ac.id',
  phone: '+62-123-456-789',
  phone1: '+62-123-456-789',
  phone2: '+62-812-3456-7890',
  whatsapp: '+6281234567890',
  address: 'Jl. Pendidikan No. 1, Kampus UIS, Kota Bandung',
  operatingHours: 'Senin - Jumat: 08:00 - 17:00 WIB',
  operationalHours: 'Senin - Jumat: 08:00 - 17:00 WIB',
  socialMedia: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    youtube: 'https://www.youtube.com/',
  },
  googleMapsEmbedUrl: 'https://www.google.com/maps?q=Universitas+Ichsan+Satya&output=embed',
};

export const mockStudyPrograms: StudyProgram[] = [
  {
    id: 1,
    name: 'Teknik Informatika',
    slug: 'teknik-informatika',
    facultyId: 1,
    degree: 'S1',
    content: 'Program studi yang memadukan dasar ilmu komputer dengan praktik pengembangan teknologi.',
    durationYears: 4,
    careerOutlooks: ['Software Engineer', 'System Analyst'],
    headOfProgram: 'Dr. Budi Santoso',
    accreditation: 'A',
  },
  {
    id: 2,
    name: 'Sistem Informasi',
    slug: 'sistem-informasi',
    facultyId: 1,
    degree: 'S1',
    content: 'Program studi yang berfokus pada analisis dan pengembangan sistem informasi organisasi.',
    durationYears: 4,
    careerOutlooks: ['Business Analyst', 'System Analyst'],
    headOfProgram: 'Dr. Siti Rahma',
    accreditation: 'A',
  },
  {
    id: 3,
    name: 'Manajemen',
    slug: 'manajemen',
    facultyId: 2,
    degree: 'S1',
    content: 'Program studi untuk membangun kompetensi manajemen dan kepemimpinan bisnis.',
    durationYears: 4,
    careerOutlooks: ['Business Manager', 'Entrepreneur'],
    headOfProgram: 'Dr. Rudi Hartono',
    accreditation: 'A',
  },
  {
    id: 4,
    name: 'Akuntansi',
    slug: 'akuntansi',
    facultyId: 2,
    degree: 'S1',
    content: 'Program studi dengan landasan akuntansi, audit, dan pengelolaan keuangan.',
    durationYears: 4,
    careerOutlooks: ['Accountant', 'Financial Analyst'],
    headOfProgram: 'Dr. Lina Permata',
    accreditation: 'A',
  },
];

export const mockFaculties: Faculty[] = [
  {
    id: 1,
    name: 'Fakultas Teknologi Informasi',
    slug: 'fakultas-teknologi-informasi',
    description: 'Fakultas yang menyelenggarakan program studi di bidang teknologi',
    deanName: 'Dr. Budi Santoso',
    image: 'https://via.placeholder.com/800x500?text=Fakultas+Teknologi+Informasi',
    programs: mockStudyPrograms.filter((program) => program.facultyId === 1),
  },
  {
    id: 2,
    name: 'Fakultas Ekonomi Bisnis',
    slug: 'fakultas-ekonomi-bisnis',
    description: 'Fakultas yang menyelenggarakan program studi di bidang bisnis',
    deanName: 'Dr. Lina Permata',
    image: 'https://via.placeholder.com/800x500?text=Fakultas+Ekonomi+Bisnis',
    programs: mockStudyPrograms.filter((program) => program.facultyId === 2),
  },
];

export const mockRectorGreeting = {
  photo: 'https://via.placeholder.com/500x600?text=Rektor+UIS',
  name: 'Dr. Ichsan Satya',
  title: 'Rektor Universitas Ichsan Satya',
  quote: 'Membangun generasi unggul dengan ilmu, karakter, dan kepedulian.',
  fullMessage: [
    "Assalamu'alaikum Warahmatullahi Wabarakatuh,",
    'Selamat datang di Universitas Ichsan Satya. Kami berkomitmen untuk memberikan pendidikan berkualitas yang mengintegrasikan nilai-nilai islami dengan perkembangan teknologi terkini.',
    'Dengan didukung oleh dosen-dosen profesional dan fasilitas pembelajaran modern, kami yakin dapat mempersiapkan mahasiswa menjadi sumber daya manusia yang kompeten dan berakhlak mulia.',
    "Wassalamu'alaikum Warahmatullahi Wabarakatuh.",
  ],
};

export const mockCampusStats = [
  { label: 'Mahasiswa Aktif', value: 1250, icon: '👥' },
  { label: 'Program Studi', value: 4, icon: '📚' },
  { label: 'Dosen', value: 85, icon: '🎓' },
  { label: 'Tahun Berdiri', value: 2015, icon: '🏛️' },
];

export const mockPopupAnnouncement = {
  isActive: false,
  title: 'Pengumuman Penting',
  description: 'Pendaftaran mahasiswa baru tahun akademik 2024/2025 sudah dibuka. Daftarkan diri Anda sekarang!',
  ctaText: 'Daftar Sekarang',
  ctaLink: '/pmb',
  image: 'https://via.placeholder.com/400x300',
};

export const mockNews = [
  {
    id: 1,
    title: 'Wisuda Gelombang 1 Tahun 2024',
    excerpt: 'Acara wisuda mahasiswa angkatan 2020 akan dilaksanakan pada bulan Oktober 2024',
    content: 'Upacara wisuda akan dihadiri oleh Rektor, Dekan, dan seluruh civitas akademika...',
    image: 'https://via.placeholder.com/600x400',
    date: new Date('2024-09-15'),
    category: 'Akademik',
    slug: 'wisuda-gelombang-1-2024',
    coverImage: 'https://via.placeholder.com/600x400',
    publishedAt: '2024-09-15',
    author: 'Humas UIS',
    summary: 'Acara wisuda mahasiswa angkatan 2020 akan dilaksanakan pada bulan Oktober 2024',
  },
  {
    id: 2,
    title: 'Program Magang Internasional',
    excerpt: 'UIS membuka kesempatan magang bagi mahasiswa di universitas partner di luar negeri',
    content: 'Mahasiswa yang tertarik dapat mendaftar melalui portal akademik...',
    image: 'https://via.placeholder.com/600x400',
    date: new Date('2024-08-20'),
    category: 'Beasiswa',
    slug: 'program-magang-internasional',
    coverImage: 'https://via.placeholder.com/600x400',
    publishedAt: '2024-08-20',
    author: 'Humas UIS',
    summary: 'UIS membuka kesempatan magang bagi mahasiswa di universitas partner di luar negeri',
  },
];

export const mockBeasiswa = [
  {
    id: 1,
    name: 'Beasiswa Penuh UIS',
    description: 'Beasiswa penuh untuk mahasiswa berprestasi dari keluarga kurang mampu',
    amount: 'Biaya kuliah + Stipend bulanan',
    requirements: ['IPK minimal 3.5', 'Pendapatan keluarga di bawah UMK'],
  },
  {
    id: 2,
    name: 'Beasiswa Akademik',
    description: 'Beasiswa untuk mahasiswa dengan prestasi akademik luar biasa',
    amount: 'Biaya kuliah',
    requirements: ['IPK minimal 3.7', 'Rekomendasi dosen'],
  },
];

export const mockHeroSlides = [
  {
    id: 1,
    title: 'Selamat Datang di UIS',
    description: 'Universitas dengan standar pendidikan internasional',
    image: 'https://via.placeholder.com/1600x600?text=UIS+Campus',
    ctaLink: '/profil',
    ctaText: 'Kenali UIS',
  },
  {
    id: 2,
    title: 'Program Akademik Berkualitas',
    description: 'Pilih program studi sesuai minat dan bakat Anda',
    image: 'https://via.placeholder.com/1600x600?text=Akademik',
    ctaLink: '/akademik',
    ctaText: 'Lihat Akademik',
  },
  {
    id: 3,
    title: 'Beasiswa dan Bantuan Finansial',
    description: 'Berbagai beasiswa tersedia untuk mahasiswa berprestasi',
    image: 'https://via.placeholder.com/1600x600?text=Beasiswa',
    ctaLink: '/beasiswa',
    ctaText: 'Lihat Beasiswa',
  },
];

export const mockTestimonials = [
  {
    id: 1,
    name: 'Budi Santoso',
    program: 'Teknik Informatika',
    message: 'Pendidikan di UIS sangat membantu saya dalam mengembangkan karir di bidang teknologi',
    rating: 5,
    image: 'https://via.placeholder.com/100x100?text=Budi',
    photo: 'https://via.placeholder.com/100x100?text=Budi',
    quote: 'Pendidikan di UIS sangat membantu saya dalam mengembangkan karir di bidang teknologi',
    programName: 'Teknik Informatika',
    graduateYear: 2024,
    currentJob: 'Software Engineer',
    company: 'Teknologi Nusantara',
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    program: 'Manajemen',
    message: 'Dosen-dosen di UIS sangat profesional dan berpengalaman',
    rating: 5,
    image: 'https://via.placeholder.com/100x100?text=Siti',
    photo: 'https://via.placeholder.com/100x100?text=Siti',
    quote: 'Dosen-dosen di UIS sangat profesional dan berpengalaman',
    programName: 'Manajemen',
    graduateYear: 2024,
    currentJob: 'Business Analyst',
    company: 'Satya Group',
  },
  {
    id: 3,
    name: 'Rudi Hartono',
    program: 'Akuntansi',
    message: 'UIS memberikan pengalaman praktik yang sangat bermanfaat untuk dunia kerja',
    rating: 5,
    image: 'https://via.placeholder.com/100x100?text=Rudi',
    photo: 'https://via.placeholder.com/100x100?text=Rudi',
    quote: 'UIS memberikan pengalaman praktik yang sangat bermanfaat untuk dunia kerja',
    programName: 'Akuntansi',
    graduateYear: 2023,
    currentJob: 'Financial Analyst',
    company: 'Prima Konsultan',
  },
];

export const mockAccreditations = [
  {
    id: 1,
    name: 'Akreditasi Institusi',
    level: 'A',
    year: 2023,
    body: 'BAN-PT',
  },
  {
    id: 2,
    name: 'Program Teknik Informatika',
    level: 'A',
    year: 2023,
    body: 'ABET',
  },
  {
    id: 3,
    name: 'Program Manajemen',
    level: 'A',
    year: 2022,
    body: 'AACSB',
  },
];
