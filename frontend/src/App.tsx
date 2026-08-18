import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PopupModal } from './components/ui/PopupModal';

// Pages
import { HomePage } from './components/pages/HomePage';
import { ProfilPage } from './components/pages/ProfilPage';
import { AkademikPage } from './components/pages/AkademikPage';
import { ProdiPage } from './components/pages/ProdiPage';
import { BeritaPage } from './components/pages/BeritaPage';
import { BeritaDetailPage } from './components/pages/BeritaDetailPage';
import { AkreditasiPage } from './components/pages/AkreditasiPage';
import { PmbPage } from './components/pages/PmbPage';
import { BeasiswaPage } from './components/pages/BeasiswaPage';
import { PelatihanPage } from './components/pages/PelatihanPage';
import { LokerPage } from './components/pages/LokerPage';
import { DownloadPage } from './components/pages/DownloadPage';
import { PedomanPage } from './components/pages/PedomanPage';
import { LppmPage } from './components/pages/LppmPage';
import { TestimoniPage } from './components/pages/TestimoniPage';
import { TracerStudyPage } from './components/pages/TracerStudyPage';
import { AkademikRegistrationPage } from './components/pages/AkademikRegistrationPage';
import { KontakPage } from './components/pages/KontakPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [routeParam, setRouteParam] = useState<string | undefined>(undefined);
  const [showPopup, setShowPopup] = useState<boolean>(true);

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath, routeParam]);

  const handleNavigate = (path: string, param?: string) => {
    setCurrentPath(path);
    setRouteParam(param);
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={handleNavigate} />;
      
      case '/profil':
        return <ProfilPage onNavigate={handleNavigate} />;

      case '/akademik':
        return <AkademikPage onNavigate={handleNavigate} />;

      case '/prodi':
        return <ProdiPage prodiId={routeParam ? Number(routeParam) : 1} onNavigate={handleNavigate} />;

      case '/berita':
        if (routeParam) {
          return <BeritaDetailPage slug={routeParam} onNavigate={handleNavigate} />;
        }
        return <BeritaPage onNavigate={handleNavigate} />;

      case '/akreditasi':
        return <AkreditasiPage onNavigate={handleNavigate} />;

      case '/pmb':
        return <PmbPage onNavigate={handleNavigate} />;

      case '/beasiswa':
        return <BeasiswaPage onNavigate={handleNavigate} />;

      case '/pelatihan':
        return <PelatihanPage onNavigate={handleNavigate} />;

      case '/loker':
        return <LokerPage onNavigate={handleNavigate} />;

      case '/download':
        return <DownloadPage onNavigate={handleNavigate} />;

      case '/pedoman':
        return <PedomanPage onNavigate={handleNavigate} />;

      case '/lppm':
        return <LppmPage onNavigate={handleNavigate} />;

      case '/testimoni':
        return <TestimoniPage onNavigate={handleNavigate} />;

      case '/tracer-study':
        return <TracerStudyPage onNavigate={handleNavigate} />;

      case '/daftar-skripsi':
        return <AkademikRegistrationPage type="skripsi" onNavigate={handleNavigate} />;

      case '/daftar-sidang':
        return <AkademikRegistrationPage type="sidang" onNavigate={handleNavigate} />;

      case '/daftar-wisuda':
        return <AkademikRegistrationPage type="wisuda" onNavigate={handleNavigate} />;

      case '/daftar-camping':
        return <AkademikRegistrationPage type="camping" onNavigate={handleNavigate} />;

      case '/kontak':
        return <KontakPage onNavigate={handleNavigate} />;

      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F9FB] text-gray-800 font-sans selection:bg-[#00ADF1] selection:text-white">
      {/* Announcement Popup Modal */}
      <PopupModal isOpen={showPopup} onClose={() => setShowPopup(false)} onNavigate={handleNavigate} />

      {/* Primary Sticky Navigation Header */}
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />

      {/* Dynamic Page Main Content */}
      <main className="flex-1 pb-16">
        {renderPage()}
      </main>

      {/* Universal Footer Component */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
