import React from 'react';
import { Logo } from './Logo';
import { mockContactInfo } from '../../lib/api/mockData';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, ShieldCheck, ArrowUp, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#17356B] text-white pt-16 pb-8 border-t border-[#00ADF1]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Intro */}
          <div className="lg:col-span-2 space-y-5">
            <button onClick={() => handleNavClick('/')} className="text-left focus:outline-none">
              <Logo variant="white" />
            </button>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Universitas Ichsan Satya (UIS) adalah transformasi dari STIKes IMC Bintaro. Berkomitmen mencetak lulusan tenaga kesehatan, ilmuwan medis, dan profesional sains teknologi yang unggul, berjiwa humanis, serta berstandar internasional.
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-gray-200">
              <ShieldCheck className="w-5 h-5 text-[#00ADF1] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Terakreditasi Institusi "Baik Sekali"</span>
                <span className="text-gray-300 font-mono-code text-[11px]">SK BAN-PT & LAM-PTKes Indonesia</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 pt-2">
              <a href={mockContactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#00ADF1] flex items-center justify-center transition text-white">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={mockContactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#00ADF1] flex items-center justify-center transition text-white">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={mockContactInfo.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#00ADF1] flex items-center justify-center transition text-white">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Program Studi */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-base text-white border-b border-[#00ADF1]/40 pb-2">Program Studi</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><button onClick={() => handleNavClick('/akademik')} className="hover:text-[#00ADF1] transition">S1 Keperawatan & Ners</button></li>
              <li><button onClick={() => handleNavClick('/akademik')} className="hover:text-[#00ADF1] transition">D3 Keperawatan</button></li>
              <li><button onClick={() => handleNavClick('/akademik')} className="hover:text-[#00ADF1] transition">D3 Kebidanan</button></li>
              <li><button onClick={() => handleNavClick('/akademik')} className="hover:text-[#00ADF1] transition">S1 Kebidanan & Profesi Bidan</button></li>
              <li><button onClick={() => handleNavClick('/akademik')} className="hover:text-[#00ADF1] transition">S1 Farmasi</button></li>
              <li><button onClick={() => handleNavClick('/akademik')} className="hover:text-[#00ADF1] transition">S1 Kesehatan Masyarakat</button></li>
              <li><button onClick={() => handleNavClick('/akademik')} className="hover:text-[#00ADF1] transition">S1 Informatika Medis</button></li>
            </ul>
          </div>

          {/* Col 3: Informasi & Layanan */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-base text-white border-b border-[#00ADF1]/40 pb-2">Layanan & Portal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><button onClick={() => handleNavClick('/pmb')} className="hover:text-[#00ADF1] transition font-semibold text-[#00ADF1]">Pendaftaran PMB 2026</button></li>
              <li><button onClick={() => handleNavClick('/beasiswa')} className="hover:text-[#00ADF1] transition">Informasi Beasiswa</button></li>
              <li><button onClick={() => handleNavClick('/loker')} className="hover:text-[#00ADF1] transition">Bursa Kerja Alumni</button></li>
              <li><button onClick={() => handleNavClick('/pelatihan')} className="hover:text-[#00ADF1] transition">Pelatihan BTCLS & Sertifikasi</button></li>
              <li><button onClick={() => handleNavClick('/download')} className="hover:text-[#00ADF1] transition">Pusat Unduh Dokumen</button></li>
              <li><button onClick={() => handleNavClick('/pedoman')} className="hover:text-[#00ADF1] transition">Pedoman Akademik</button></li>
              <li><button onClick={() => handleNavClick('/tracer-study')} className="hover:text-[#00ADF1] transition">Survei Tracer Study</button></li>
            </ul>
          </div>

          {/* Col 4: Kontak Kampus */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-base text-white border-b border-[#00ADF1]/40 pb-2">Alamat & Kontak</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00ADF1] flex-shrink-0 mt-1" />
                <span className="text-xs">{mockContactInfo.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00ADF1] flex-shrink-0" />
                <span className="text-xs font-mono-code">{mockContactInfo.phone1}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00ADF1] flex-shrink-0" />
                <span className="text-xs font-mono-code">{mockContactInfo.email}</span>
              </p>
              <div className="pt-2">
                <a 
                  href={`https://wa.me/${mockContactInfo.whatsapp.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition"
                >
                  <span>Chat WhatsApp PMB</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2026 Universitas Ichsan Satya (UIS). Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNavClick('/profil')} className="hover:text-white transition">Tentang UIS</button>
            <button onClick={() => handleNavClick('/kontak')} className="hover:text-white transition">Kontak</button>
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-1.5 text-[#00ADF1] hover:text-white transition font-mono-code"
            >
              <span>Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
