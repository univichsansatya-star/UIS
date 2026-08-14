import React, { useState, useEffect } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { mockStudyPrograms, mockFaculties } from '../../lib/api/mockData';
import { StudyProgram } from '../../types';
import { 
  Award, BookOpen, GraduationCap, Building2, CheckCircle2, 
  ArrowLeft, ArrowRight, UserCheck 
} from 'lucide-react';

interface ProdiPageProps {
  prodiId: number;
  onNavigate: (path: string, param?: string) => void;
}

export const ProdiPage: React.FC<ProdiPageProps> = ({ prodiId, onNavigate }) => {
  const [prodi, setProdi] = useState<StudyProgram | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'tuition'>('overview');

  useEffect(() => {
    const data = mockStudyPrograms.find(p => p.id === prodiId) || mockStudyPrograms[0];
    setProdi(data);
    setActiveTab('overview');
  }, [prodiId]);

  if (!prodi) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#17356B]">Program Studi Tidak Ditemukan</h2>
        <button onClick={() => onNavigate('/akademik')} className="text-xs font-bold text-[#00ADF1] underline">
          Kembali ke Daftar Akademik
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Back Link */}
      <button 
        onClick={() => onNavigate('/akademik')}
        className="inline-flex items-center gap-2 text-xs font-mono-code font-bold text-[#00ADF1] hover:text-[#17356B] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Fakultas & Akademik</span>
      </button>

      {/* Hero Header Banner */}
      <div className="relative bg-gradient-to-br from-[#17356B] to-[#0F1C2E] text-white rounded-3xl p-8 sm:p-12 overflow-hidden shadow-xl">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#00ADF1] text-white font-mono-code text-xs font-bold">
              Jenjang {prodi.degree}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white font-mono-code text-xs font-bold border border-white/20">
              Akreditasi: {prodi.accreditation}
            </span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl leading-tight">
            {prodi.name}
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {prodi.content}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono-code text-gray-300">
            <span>Kaprodi: <strong className="text-[#00ADF1]">{prodi.headOfProgram}</strong></span>
            <span>•</span>
            <span>Masa Studi: {prodi.durationYears} Tahun</span>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate('/pmb')}
              className="bg-[#D9232C] hover:bg-[#b81b23] text-white font-bold py-3 px-6 rounded-xl text-xs transition shadow-lg flex items-center gap-2"
            >
              <span>Daftar Prodi Ini (PMB 2026)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('/download')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl text-xs transition border border-white/20"
            >
              Unduh Kurikulum PDF
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-gray-200 overflow-x-auto space-x-6 text-xs font-mono-code font-bold">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`pb-3 border-b-2 transition whitespace-nowrap ${activeTab === 'overview' ? 'border-[#17356B] text-[#17356B]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
        >
          Gambaran Umum & Prospek Karir
        </button>
        <button 
          onClick={() => setActiveTab('curriculum')}
          className={`pb-3 border-b-2 transition whitespace-nowrap ${activeTab === 'curriculum' ? 'border-[#17356B] text-[#17356B]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
        >
          Fasilitas & Jejaring RS
        </button>
        <button 
          onClick={() => setActiveTab('tuition')}
          className={`pb-3 border-b-2 transition whitespace-nowrap ${activeTab === 'tuition' ? 'border-[#17356B] text-[#17356B]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
        >
          Rincian Biaya Kuliah (UKT)
        </button>
      </div>

      {/* Tab 1: Overview & Profil Lulusan */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
          {/* Vision & Mission */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono-code text-[#00ADF1] font-bold uppercase">Deskripsi Kurikulum</span>
              <p className="text-xs text-gray-700 leading-relaxed bg-[#F6F9FB] p-4 rounded-2xl border border-gray-100">
                {prodi.content}
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono-code text-[#17356B] font-bold uppercase">Keunggulan Prodi</span>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00ADF1] flex-shrink-0 mt-0.5" />
                  <span>Jejaring Praktek Klinik Utama di Rumah Sakit IMC Bintaro & RSUP Fatmawati</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00ADF1] flex-shrink-0 mt-0.5" />
                  <span>Kurikulum Berbasis Kompetensi & Pembekalan Sertifikasi Profesi (BTCLS / GATS / Rekam Medis)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00ADF1] flex-shrink-0 mt-0.5" />
                  <span>Laboratorium Mini Hospital & Lab Komputer SIMRS Berstandar Industri</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Profil Lulusan */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
            <span className="text-xs font-mono-code text-[#17356B] font-bold uppercase block">Prospek Karir & Lulusan</span>
            <div className="space-y-3">
              {prodi.careerOutlooks.map((cp, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F6F9FB] border border-gray-100 flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-[#17356B] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-xs text-[#17356B]">{cp}</h4>
                    <p className="text-[11px] text-gray-500 font-mono-code pt-0.5">Kompetensi unggul & siap diserap lapangan kerja.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Curriculum / Facilities */}
      {activeTab === 'curriculum' && (
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
          <h3 className="font-display font-bold text-xl text-[#17356B]">Fasilitas Praktikum & Rumah Sakit Mitras</h3>
          <p className="text-xs text-gray-600">Mahasiswa {prodi.name} mendapatkan kesempatan praktek lapangan dan pengayaan klinis di institusi mitra resmi UIS.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#F6F9FB] border border-gray-100 space-y-1">
              <h4 className="font-bold text-xs text-[#17356B]">Laboratorium Keperawatan Kritis & Gawat Darurat</h4>
              <p className="text-[11px] text-gray-600">Dilengkapi manekin pasien dewasa, anak, dan bayi interaktif.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F9FB] border border-gray-100 space-y-1">
              <h4 className="font-bold text-xs text-[#17356B]">Laboratorium Farmasi & Formulasi Sediaan</h4>
              <p className="text-[11px] text-gray-600">Alat ekstraksi herbal, titrasi, serta instrumen analisa farmasetika.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F9FB] border border-gray-100 space-y-1">
              <h4 className="font-bold text-xs text-[#17356B]">Rumah Sakit Jejaring IMC Bintaro</h4>
              <p className="text-[11px] text-gray-600">Rumah sakit swasta tipe B dengan layanan trauma center & keperawatan holistik.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F9FB] border border-gray-100 space-y-1">
              <h4 className="font-bold text-xs text-[#17356B]">RSUP Fatmawati & RSUD Tangerang Selatan</h4>
              <p className="text-[11px] text-gray-600">Rumah sakit rujukan nasional tempat mahasiswa menyelesaikan Kepaniteraan Klinik/Praktek.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Tuition Fee */}
      {activeTab === 'tuition' && (
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
          <h3 className="font-display font-bold text-xl text-[#17356B]">Rincian Transparansi Biaya Studi</h3>
          <p className="text-xs text-gray-600">Skema pembayaran angsuran flat tanpa biaya tersembunyi selama masa studi normal.</p>
          
          <div className="p-6 rounded-2xl bg-[#17356B] text-white space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-xs font-mono-code text-gray-300">SPP / Biaya Kuliah Per Semester:</span>
              <span className="font-bold text-xl text-[#00ADF1] font-mono-code">Rp 4.500.000 - Rp 6.500.000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono-code text-gray-300">Estimasi Uang Pangkal / Gedung:</span>
              <span className="font-bold text-base text-white font-mono-code">Rp 8.000.000 (Dapat Diangsur 4x)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
            <p className="font-bold">Beasiswa Potongan SPP:</p>
            <p>Tersedia potongan hingga 50% Uang Pangkal bagi calon mahasiswa pendaftar Gelombang 1 dan jalur Rapor.</p>
          </div>
        </div>
      )}

    </div>
  );
};
