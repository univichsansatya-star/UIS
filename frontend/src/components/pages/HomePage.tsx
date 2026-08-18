import React, { useState, useEffect } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { 
  mockHeroSlides, 
  mockRectorGreeting, 
  mockCampusStats, 
  mockFaculties, 
  mockNews, 
  mockTestimonials,
  mockAccreditations
} from '../../lib/api/mockData';
import { 
  ArrowRight, ShieldCheck, GraduationCap, Award, Users, Play, 
  ChevronLeft, ChevronRight, CheckCircle2, Sparkles, Building,
  FileCheck, Calendar, BookOpen, Stethoscope, HeartPulse, Laptop
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string, param?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mockHeroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % mockHeroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + mockHeroSlides.length) % mockHeroSlides.length);

  return (
    <div className="space-y-16 pt-6 pb-12">
      
      {/* 2. SLIDER HIGHLIGHT CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-[#0F1C2E] group">
          <div 
            onClick={() => onNavigate(mockHeroSlides[currentSlide].ctaLink)}
            className="relative w-full aspect-[16/7] sm:aspect-[16/6] md:aspect-[16/5.5] flex items-center justify-center cursor-pointer overflow-hidden"
          >
            <img 
              key={currentSlide}
              src={mockHeroSlides[currentSlide].image} 
              alt={mockHeroSlides[currentSlide].title} 
              className="w-full h-full object-cover transition-all duration-700 hover:scale-[1.01]"
            />
            {/* Subtle bottom gradient for button/indicator visibility */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between p-4 sm:p-6 pointer-events-none">
              <div className="hidden sm:flex items-center gap-2 pointer-events-auto">
                <button 
                  onClick={(e) => { e.stopPropagation(); onNavigate(mockHeroSlides[currentSlide].ctaLink); }}
                  className="bg-[#D9232C] hover:bg-[#b81b23] text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm inline-flex items-center gap-2 transition shadow-lg transform hover:scale-105"
                >
                  <span>{mockHeroSlides[currentSlide].ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Slider Navigation Arrows */}
          <button 
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-[#17356B] text-white flex items-center justify-center transition focus:outline-none border border-white/20 shadow-md"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-[#17356B] text-white flex items-center justify-center transition focus:outline-none border border-white/20 shadow-md"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 right-6 flex items-center gap-2 z-10">
            {mockHeroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                className={`h-2.5 rounded-full transition-all ${currentSlide === idx ? 'w-8 bg-[#00ADF1] shadow' : 'w-2.5 bg-white/60 hover:bg-white'}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. SAMBUTAN REKTOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <HeaderRunningMotif sectionNumber="bab.01" chapterTitle="profil • sambutan rektor" />
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-[#00ADF1]/30">
              <img 
                src={mockRectorGreeting.photo} 
                alt={mockRectorGreeting.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#17356B] to-transparent p-4 text-white text-center">
                <p className="font-bold text-sm">{mockRectorGreeting.name}</p>
                <p className="text-[11px] text-[#00ADF1] font-mono-code mt-0.5">{mockRectorGreeting.title}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#00ADF1] font-semibold uppercase">
              <GraduationCap className="w-4 h-4" />
              <span>Pesan Kepemimpinan Institusi</span>
            </div>
            
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#17356B] leading-snug">
              "Transformasi Pendidikan Kesehatan Untuk Masa Depan Humanis & Berteknologi."
            </h2>

            <blockquote className="italic text-gray-700 text-base sm:text-lg border-l-4 border-[#00ADF1] pl-4 py-1">
              "{mockRectorGreeting.quote}"
            </blockquote>

            <p className="text-gray-600 text-sm leading-relaxed">
              {mockRectorGreeting.fullMessage[0]}
            </p>

            <div>
              <button 
                onClick={() => onNavigate('/profil')}
                className="inline-flex items-center gap-2 text-[#00ADF1] hover:text-[#17356B] font-bold text-sm transition"
              >
                <span>Baca Sambutan Lengkap Rektor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROGRAM STUDI & FAKULTAS QUICK LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <HeaderRunningMotif sectionNumber="bab.02" chapterTitle="akademik • fakultas & program studi" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-mono-code text-[#00ADF1] font-semibold uppercase">Pilihan Pendidikan Terbaik</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#17356B] mt-1">
              Fakultas & Program Studi Unggulan UIS
            </h2>
          </div>
          <button 
            onClick={() => onNavigate('/akademik')}
            className="text-sm font-bold text-[#17356B] hover:text-[#00ADF1] flex items-center gap-1.5 transition"
          >
            <span>Lihat Semua Kurikulum</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Faculty Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockFaculties.map((fac) => (
            <div 
              key={fac.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={fac.image} 
                    alt={fac.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                    <span className="px-3 py-1 rounded-full bg-[#17356B]/90 text-white text-xs font-mono-code font-semibold">
                      {fac.programs.length} Program Studi
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-display font-bold text-lg text-[#17356B] group-hover:text-[#00ADF1] transition">
                    {fac.name}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                    {fac.description}
                  </p>

                  <div className="pt-3 border-t border-gray-100">
                    <span className="text-[11px] font-mono-code text-gray-400 block mb-2 uppercase">Prodi Tersedia:</span>
                    <ul className="space-y-1.5">
                      {fac.programs.map((prog) => (
                        <li key={prog.id} className="text-xs text-gray-700 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00ADF1]" />
                          <span className="font-semibold">{prog.name}</span>
                          <span className="ml-auto text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                            {prog.accreditation}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button 
                  onClick={() => onNavigate('/akademik')}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#17356B] text-[#17356B] hover:bg-[#17356B] hover:text-white font-bold text-xs transition text-center"
                >
                  Detail Fakultas & Pendaftaran
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BERITA TERBARU & PENGUMUMAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <HeaderRunningMotif sectionNumber="bab.03" chapterTitle="kegiatan • berita & pengumuman" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-mono-code text-[#00ADF1] font-semibold uppercase">Informasi Civitas Akademika</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#17356B] mt-1">
              Berita & Agenda Terkini Kampus
            </h2>
          </div>
          <button 
            onClick={() => onNavigate('/berita')}
            className="text-sm font-bold text-[#17356B] hover:text-[#00ADF1] flex items-center gap-1.5 transition"
          >
            <span>Lihat Arsip Berita</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockNews.slice(0, 3).map((item) => (
            <article 
              key={item.id}
              onClick={() => onNavigate('/berita', item.slug)}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={item.coverImage} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#17356B]/90 text-white text-[11px] font-mono-code">
                    {item.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-[#00ADF1]" />
                    <span>{item.publishedAt}</span>
                    <span>•</span>
                    <span>{item.author}</span>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#17356B] group-hover:text-[#00ADF1] transition line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-xs line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <span className="text-xs font-bold text-[#00ADF1] flex items-center gap-1 group-hover:translate-x-1 transition">
                  <span>Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONI ALUMNI CAROUSEL */}
      <section className="bg-[#17356B] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono-code text-[#00ADF1] font-semibold uppercase tracking-wider">Kisah Sukses Lulusan</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Kiprah Alumni UIS di Dunia Kerja
            </h2>
            <p className="text-gray-300 text-sm">
              Alumni Universitas Ichsan Satya terbukti unggul dan siap bersaing di rumah sakit, klinik, industri farmasi, hingga wirausaha kesehatan.
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/20 relative shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-[#00ADF1] flex-shrink-0 shadow-lg">
                <img 
                  src={mockTestimonials[testimonialIndex].photo} 
                  alt={mockTestimonials[testimonialIndex].name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-center md:text-left flex-1">
                <blockquote className="italic text-base sm:text-lg text-gray-100 font-sans leading-relaxed">
                  "{mockTestimonials[testimonialIndex].quote}"
                </blockquote>

                <div>
                  <h4 className="font-bold text-lg text-white">{mockTestimonials[testimonialIndex].name}</h4>
                  <p className="text-xs text-[#00ADF1] font-mono-code">
                    Lulusan {mockTestimonials[testimonialIndex].programName} ({mockTestimonials[testimonialIndex].graduateYear})
                  </p>
                  <p className="text-xs text-gray-300 font-semibold mt-1">
                    {mockTestimonials[testimonialIndex].currentJob} — {mockTestimonials[testimonialIndex].company}
                  </p>
                </div>
              </div>
            </div>

            {/* Nav Arrows */}
            <div className="flex justify-center md:justify-end gap-3 pt-6 border-t border-white/10 mt-6">
              <button 
                onClick={() => setTestimonialIndex((prev) => (prev - 1 + mockTestimonials.length) % mockTestimonials.length)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00ADF1] text-white flex items-center justify-center transition focus:outline-none"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setTestimonialIndex((prev) => (prev + 1) % mockTestimonials.length)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00ADF1] text-white flex items-center justify-center transition focus:outline-none"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VIDEO PROFIL KAMPUS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <HeaderRunningMotif sectionNumber="bab.04" chapterTitle="multimedia • video profil kampus" />

        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 relative h-72 sm:h-96 bg-black flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" 
              alt="Video Profil UIS" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#D9232C] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition cursor-pointer">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <div>
                <span className="font-mono-code text-xs text-[#00ADF1] uppercase tracking-wider block">Official Video Profile</span>
                <span className="font-display font-bold text-xl sm:text-2xl">Jelajahi Suasana Kampus UIS Bintaro</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 flex flex-col justify-center space-y-6">
            <span className="text-xs font-mono-code text-[#00ADF1] font-semibold uppercase">Fasilitas & Lingkungan Belajar</span>
            <h3 className="font-display font-bold text-2xl text-[#17356B]">
              Fasilitas Laboratorium Medis Modern Serta Akses Transportasi Strategis
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Kampus UIS terletak di kawasan Bintaro Sektor 9 yang strategis, mudah dijangkau dari Stasiun KRL Sudimara/Jurangmangu dan pintu tol Kunciran-Bintaro.
            </p>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Lab Simulasi Keperawatan & Kebidanan High-Fidelity</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Lab Farmasi Steril, Kimia, & Instrumentasi HPLC</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Perpustakaan Digital Medis (E-Journal ProQuest & ScienceDirect)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. BIG PMB CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-[#17356B] via-[#00ADF1] to-[#17356B] rounded-3xl p-8 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden space-y-6">
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white font-mono-code text-xs font-bold uppercase tracking-wider">
              Pendaftaran Mahasiswa Baru TA 2026/2027
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white leading-tight">
              Mulai Langkah Masuk Dunia Kesehatan & Teknologi Bersama UIS.
            </h2>
            <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
              Manfaatkan beasiswa potongan biaya gedung hingga 50% dan kemudahan cicilan biaya kuliah per bulan. Pendaftaran dapat dilakukan secara online 24 jam.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => onNavigate('/pmb')}
                className="w-full sm:w-auto bg-[#D9232C] hover:bg-[#b81b23] text-white font-bold py-3.5 px-8 rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Daftar PMB Online Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onNavigate('/kontak')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-3.5 px-6 rounded-xl text-sm transition"
              >
                Konsultasi WhatsApp PMB
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
