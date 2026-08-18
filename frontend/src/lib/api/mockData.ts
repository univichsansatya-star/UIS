// Mock data for development
// Replace with real API calls in production

export const mockContactInfo = {
  email: 'info@universitasichsansatya.ac.id',
  phone: '+62-123-456-789',
  address: 'Jl. Pendidikan No. 1, Kampus UIS, Kota Bandung',
  operatingHours: 'Senin - Jumat: 08:00 - 17:00 WIB',
};

export const mockStudyPrograms = [
  {
    id: 1,
    name: 'Teknik Informatika',
    slug: 'teknik-informatika',
    facultyId: 1,
    description: 'Program studi terbaik untuk mengembangkan karir di bidang teknologi',
    accreditation: 'A',
    students: 150,
  },
  {
    id: 2,
    name: 'Sistem Informasi',
    slug: 'sistem-informasi',
    facultyId: 1,
    description: 'Fokus pada pengembangan sistem informasi untuk bisnis',
    accreditation: 'A',
    students: 120,
  },
  {
    id: 3,
    name: 'Manajemen',
    slug: 'manajemen',
    facultyId: 2,
    description: 'Persiapan menjadi pemimpin bisnis profesional',
    accreditation: 'A',
    students: 200,
  },
  {
    id: 4,
    name: 'Akuntansi',
    slug: 'akuntansi',
    facultyId: 2,
    description: 'Program keahlian akuntansi dan keuangan',
    accreditation: 'A',
    students: 180,
  },
];

export const mockFaculties = [
  {
    id: 1,
    name: 'Fakultas Teknologi Informasi',
    description: 'Fakultas yang menyelenggarakan program studi di bidang teknologi',
  },
  {
    id: 2,
    name: 'Fakultas Ekonomi Bisnis',
    description: 'Fakultas yang menyelenggarakan program studi di bidang bisnis',
  },
];

export const mockRectorGreeting = `
Assalamu'alaikum Warahmatullahi Wabarakatuh,

Selamat datang di Universitas Ichsan Satya. Kami berkomitmen untuk memberikan pendidikan berkualitas
yang mengintegrasikan nilai-nilai islami dengan perkembangan teknologi terkini.

Dengan didukung oleh dosen-dosen profesional dan fasilitas pembelajaran modern, kami yakin dapat
mempersiapkan mahasiswa menjadi sumber daya manusia yang kompeten dan berakhlak mulia.

Wassalamu'alaikum Warahmatullahi Wabarakatuh.
`;

export const mockCampusStats = [
  { label: 'Mahasiswa Aktif', value: 1250, icon: '👥' },
  { label: 'Program Studi', value: 4, icon: '📚' },
  { label: 'Dosen', value: 85, icon: '🎓' },
  { label: 'Tahun Berdiri', value: 2015, icon: '🏛️' },
];

export const mockPopupAnnouncement = {
  title: 'Pengumuman Penting',
  content: 'Pendaftaran mahasiswa baru tahun akademik 2024/2025 sudah dibuka. Daftarkan diri Anda sekarang!',
  buttonText: 'Daftar Sekarang',
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
  },
  {
    id: 2,
    title: 'Program Magang Internasional',
    excerpt: 'UIS membuka kesempatan magang bagi mahasiswa di universitas partner di luar negeri',
    content: 'Mahasiswa yang tertarik dapat mendaftar melalui portal akademik...',
    image: 'https://via.placeholder.com/600x400',
    date: new Date('2024-08-20'),
    category: 'Beasiswa',
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
  },
  {
    id: 2,
    title: 'Program Akademik Berkualitas',
    description: 'Pilih program studi sesuai minat dan bakat Anda',
    image: 'https://via.placeholder.com/1600x600?text=Akademik',
    ctaLink: '/akademik',
  },
  {
    id: 3,
    title: 'Beasiswa dan Bantuan Finansial',
    description: 'Berbagai beasiswa tersedia untuk mahasiswa berprestasi',
    image: 'https://via.placeholder.com/1600x600?text=Beasiswa',
    ctaLink: '/beasiswa',
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
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    program: 'Manajemen',
    message: 'Dosen-dosen di UIS sangat profesional dan berpengalaman',
    rating: 5,
    image: 'https://via.placeholder.com/100x100?text=Siti',
  },
  {
    id: 3,
    name: 'Rudi Hartono',
    program: 'Akuntansi',
    message: 'UIS memberikan pengalaman praktik yang sangat bermanfaat untuk dunia kerja',
    rating: 5,
    image: 'https://via.placeholder.com/100x100?text=Rudi',
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
