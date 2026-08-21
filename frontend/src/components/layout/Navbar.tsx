import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { MagneticPmbButton } from '../ui/MagneticPmbButton';
import { mockContactInfo } from '../../lib/api/mockData';
import { 
  Phone, Mail, Calendar, ChevronDown, Menu, X, ArrowRight, 
  GraduationCap, BookOpen, Award, ShieldCheck, FileText, 
  Briefcase, UserCheck, HelpCircle, PhoneCall, Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Main Navigation Bar */}
      <nav className={`w-full bg-white transition-all duration-300 ${isScrolled ? 'shadow-md py-3' : 'py-4 border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center">
          {/* Logo */}
          <button onClick={() => handleNavClick('/')} className="text-left focus:outline-none">
            <Logo />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button 
              onClick={() => handleNavClick('/')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${currentPath === '/' ? 'text-[#00ADF1] bg-[#00ADF1]/10' : 'text-[#0F1C2E] hover:text-[#00ADF1] hover:bg-gray-50'}`}
            >
              Beranda
            </button>

            {/* Profil Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('profil')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => handleNavClick('/profil')}
                className={`px-3 py-2 text-sm font-semibold rounded-lg flex items-center gap-1 transition ${currentPath.startsWith('/profil') ? 'text-[#00ADF1] bg-[#00ADF1]/10' : 'text-[#0F1C2E] hover:text-[#00ADF1] hover:bg-gray-50'}`}
              >
                Profil Kampus
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'profil' ? 'rotate-180 text-[#00ADF1]' : ''}`} />
              </button>

              {activeDropdown === 'profil' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn">
                  <button onClick={() => handleNavClick('/profil')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[#00ADF1] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#00ADF1]" />
                    <span>Sejarah & Visi Misi</span>
                  </button>
                  <button onClick={() => handleNavClick('/profil#sambutan')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[#00ADF1] flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#17356B]" />
                    <span>Sambutan Rektor</span>
                  </button>
                  <button onClick={() => handleNavClick('/profil#organisasi')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[#00ADF1] flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Struktur Organisasi</span>
                  </button>
                  <button onClick={() => handleNavClick('/profil#fasilitas')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[#00ADF1] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span>Sarana & Prasarana</span>
                  </button>
                  <button onClick={() => handleNavClick('/akreditasi')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[#00ADF1] flex items-center gap-2 border-t border-gray-100 mt-1 pt-2">
                    <ShieldCheck className="w-4 h-4 text-[#0E7C86]" />
                    <span>Akreditasi Institusi</span>
                  </button>
                </div>
              )}
            </div>

            {/* Akademik */}
            <button 
              onClick={() => handleNavClick('/akademik')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${currentPath.startsWith('/akademik') ? 'text-[#00ADF1] bg-[#00ADF1]/10' : 'text-[#0F1C2E] hover:text-[#00ADF1] hover:bg-gray-50'}`}
            >
              Fakultas & Prodi
            </button>

            {/* Informasi & Layanan Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('layanan')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className={`px-3 py-2 text-sm font-semibold rounded-lg flex items-center gap-1 transition ${['/beasiswa', '/loker', '/pelatihan', '/pedoman', '/download', '/lppm'].includes(currentPath) ? 'text-[#00ADF1] bg-[#00ADF1]/10' : 'text-[#0F1C2E] hover:text-[#00ADF1] hover:bg-gray-50'}`}
              >
                Layanan & Info
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'layanan' ? 'rotate-180 text-[#00ADF1]' : ''}`} />
              </button>

              {activeDropdown === 'layanan' && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-1.5 text-[11px] font-mono-code font-semibold text-gray-400 uppercase">Layanan Mahasiswa</div>
                  <button onClick={() => handleNavClick('/beasiswa')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#00ADF1] flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#00ADF1]" />
                    <span>Info Beasiswa</span>
                  </button>
                  <button onClick={() => handleNavClick('/loker')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#00ADF1] flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    <span>Karir & Lowongan Kerja</span>
                  </button>
                  <button onClick={() => handleNavClick('/pelatihan')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#00ADF1] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D9232C]" />
                    <span>Pelatihan & Sertifikasi</span>
                  </button>
                  
                  <div className="px-4 py-1.5 text-[11px] font-mono-code font-semibold text-gray-400 uppercase mt-2 pt-2 border-t border-gray-100">Riset & Dokumentasi</div>
                  <button onClick={() => handleNavClick('/lppm')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#00ADF1] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#17356B]" />
                    <span>LPPM & Penelitian</span>
                  </button>
                  <button onClick={() => handleNavClick('/pedoman')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#00ADF1] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span>Buku Pedoman</span>
                  </button>
                  <button onClick={() => handleNavClick('/download')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#00ADF1] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-teal-600" />
                    <span>Pusat Unduh Berkas</span>
                  </button>
                </div>
              )}
            </div>

            {/* Registrasi Akademik Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('registrasi')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className={`px-3 py-2 text-sm font-semibold rounded-lg flex items-center gap-1 transition ${currentPath.startsWith('/daftar-') ? 'text-[#00ADF1] bg-[#00ADF1]/10' : 'text-[#0F1C2E] hover:text-[#00ADF1] hover:bg-gray-50'}`}
              >
                Layanan Akademik
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'registrasi' ? 'rotate-180 text-[#00ADF1]' : ''}`} />
              </button>

              {activeDropdown === 'registrasi' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn">
                  <button onClick={() => handleNavClick('/daftar-skripsi')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[#00ADF1]">
                    Pendaftaran Skripsi / KTI
                  </button>
                  <button onClick={() => handleNavClick('/daftar-sidang')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[#00ADF1]">
                    Pendaftaran Sidang Akhir
                  </button>
                  <button onClick={() => handleNavClick('/daftar-wisuda')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[#00ADF1]">
                    Pendaftaran Wisuda
                  </button>
                  <button onClick={() => handleNavClick('/daftar-camping')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[#00ADF1]">
                    Pendaftaran Camping Mahasiswa
                  </button>
                  <button onClick={() => handleNavClick('/tracer-study')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[#00ADF1] border-t border-gray-100 mt-1 pt-2">
                    Survei Alumni (Tracer Study)
                  </button>
                </div>
              )}
            </div>

            {/* Berita */}
            <button 
              onClick={() => handleNavClick('/berita')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${currentPath.startsWith('/berita') ? 'text-[#00ADF1] bg-[#00ADF1]/10' : 'text-[#0F1C2E] hover:text-[#00ADF1] hover:bg-gray-50'}`}
            >
              Berita
            </button>

            {/* Kontak */}
            <button 
              onClick={() => handleNavClick('/kontak')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${currentPath === '/kontak' ? 'text-[#00ADF1] bg-[#00ADF1]/10' : 'text-[#0F1C2E] hover:text-[#00ADF1] hover:bg-gray-50'}`}
            >
              Kontak
            </button>
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <MagneticPmbButton onClick={() => handleNavClick('/pmb')} />
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#00ADF1] rounded-lg border border-gray-200 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white border-b border-gray-200 shadow-2xl z-40 max-h-[85vh] overflow-y-auto animate-fadeIn">
          <div className="p-4 space-y-2">
            <button 
              onClick={() => handleNavClick('/pmb')}
              className="w-full bg-[#D9232C] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mb-4 shadow-md"
            >
              <span>Daftar Mahasiswa Baru (PMB)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button onClick={() => handleNavClick('/')} className="w-full text-left px-3 py-2.5 font-semibold text-gray-800 hover:bg-gray-50 rounded-lg">
              Beranda
            </button>

            <button onClick={() => handleNavClick('/profil')} className="w-full text-left px-3 py-2.5 font-semibold text-gray-800 hover:bg-gray-50 rounded-lg">
              Profil Kampus & Visi Misi
            </button>

            <button onClick={() => handleNavClick('/akademik')} className="w-full text-left px-3 py-2.5 font-semibold text-gray-800 hover:bg-gray-50 rounded-lg">
              Fakultas & Program Studi
            </button>

            <button onClick={() => handleNavClick('/akreditasi')} className="w-full text-left px-3 py-2.5 font-semibold text-gray-800 hover:bg-gray-50 rounded-lg">
              Status Akreditasi
            </button>

            <button onClick={() => handleNavClick('/beasiswa')} className="w-full text-left px-3 py-2.5 font-semibold text-gray-800 hover:bg-gray-50 rounded-lg">
              Informasi Beasiswa
            </button>

            <button onClick={() => handleNavClick('/pelatihan')} className="w-full text-left px-3 py-2.5 font-semibold text-gray-800 hover:bg-gray-50 rounded-lg">
              Pelatihan & Event
            </button>

            <button onClick={() => handleNavClick('/loker')} className="w-full text-left px-3 py-2.5 font-semibold text-gray-800 hover:bg-gray-50 rounded-lg">
              Lowongan Kerja Alumni
            </button>

            <div className="border-t border-gray-100 my-2 pt-2 text-xs font-mono-code text-gray-400 px-3 uppercase">Pusat Layanan Mahasiswa</div>

            <button onClick={() => handleNavClick('/daftar-skripsi')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Form Skripsi / KTI
            </button>
            <button onClick={() => handleNavClick('/daftar-wisuda')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Form Pendaftaran Wisuda
            </button>
            <button onClick={() => handleNavClick('/tracer-study')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Survei Tracer Study
            </button>

            <button onClick={() => handleNavClick('/berita')} className="w-full text-left px-3 py-2.5 font-semibold text-gray-800 hover:bg-gray-50 rounded-lg">
              Berita & Pengumuman
            </button>

            <button onClick={() => handleNavClick('/kontak')} className="w-full text-left px-3 py-2.5 font-semibold text-gray-800 hover:bg-gray-50 rounded-lg">
              Hubungi Kami
            </button>

            <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-1 px-3">
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#00ADF1]" /> {mockContactInfo.phone1}</p>
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#00ADF1]" /> {mockContactInfo.email}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
