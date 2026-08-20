import React, { useEffect, useState } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { mockRectorGreeting, mockCampusStats } from '../../lib/api/mockData';
import { getCampusStats, getRectorGreeting } from '../../lib/api/contentApi';
import { BookOpen, Target, ShieldCheck, Users, Building, Sparkles, CheckCircle2, Award } from 'lucide-react';

interface ProfilPageProps {
  onNavigate: (path: string) => void;
}

export const ProfilPage: React.FC<ProfilPageProps> = ({ onNavigate }) => {
  const [rectorGreeting, setRectorGreeting] = useState(mockRectorGreeting);
  const [campusStats, setCampusStats] = useState(mockCampusStats);

  useEffect(() => {
    getRectorGreeting().then(setRectorGreeting);
    getCampusStats().then(setCampusStats);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-16">
      
      {/* Header */}
      <div className="space-y-4">
        <HeaderRunningMotif sectionNumber="bab.02" chapterTitle="profil institusi • sejarah & visi misi" />
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#17356B]">
          Profil Universitas Ichsan Satya
        </h1>
        <p className="text-gray-600 text-base max-w-3xl leading-relaxed">
          Mengenal lebih dekat institusi perguruan tinggi kesehatan dan teknologi di Bintaro yang berkomitmen melahirkan lulusan unggul berstandar internasional.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-4"><strong className="block text-xl text-[#17356B]">{campusStats.studentsCount}</strong><span className="text-xs text-gray-500">Mahasiswa</span></div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4"><strong className="block text-xl text-[#17356B]">{campusStats.alumniCount}</strong><span className="text-xs text-gray-500">Alumni</span></div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4"><strong className="block text-xl text-[#17356B]">{campusStats.studyProgramsCount}</strong><span className="text-xs text-gray-500">Program studi</span></div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4"><strong className="block text-xl text-[#17356B]">{campusStats.employedRatePercentage}%</strong><span className="text-xs text-gray-500">Serapan kerja</span></div>
      </div>

      {/* 1. SEJARAH TRANSFORMASI */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00ADF1]/10 text-[#00ADF1] flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono-code text-[#00ADF1] uppercase font-semibold">Rekam Jejak Institusi</span>
            <h2 className="font-display font-bold text-2xl text-[#17356B]">Sejarah Dari STIKes IMC Hingga Universitas</h2>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            Universitas Ichsan Satya (UIS) bermula dari berdirinya Sekolah Tinggi Ilmu Kesehatan (STIKes) IMC Bintaro di bawah naungan Yayasan Ichsan Satya. Didirikan dengan landasan kepedulian tinggi terhadap pemenuhan tenaga keperawatan dan kebidanan bermutu di Indonesia, khususnya wilayah Jabodetabek.
          </p>
          <p>
            Berada di lokasi strategis Bintaro Sektor 9, STIKes IMC Bintaro tumbuh pesat dengan melengkapi laboratorium simulasi medis berstandar rumah sakit serta menjalin ikatan erat dengan Rumah Sakit Ichsan Medical Centre (IMC) Bintaro sebagai rumah sakit pendidikan utama.
          </p>
          <p>
            Pada tahun 2021, merespons kebutuhan era transformasi digital dan interdisiplin sains, STIKes IMC Bintaro resmi bertransformasi menjadi <strong>Universitas Ichsan Satya (UIS)</strong>. Transformasi ini memperluas mandat akademik institusi dengan membuka Fakultas Sains, Teknologi & Bisnis Digital, melengkapi Fakultas Keperawatan & Kebidanan dan Fakultas Ilmu Kesehatan.
          </p>
        </div>

        {/* Timeline highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div className="p-4 rounded-xl bg-[#F6F9FB] border border-gray-200">
            <span className="font-mono-code text-[#00ADF1] font-bold text-lg block">Tahun 2004</span>
            <span className="text-xs text-gray-700 font-semibold block mt-1">Pendirian STIKes IMC Bintaro</span>
            <span className="text-[11px] text-gray-500 block mt-1">Fokus awal pada program D3 Keperawatan & Kebidanan.</span>
          </div>

          <div className="p-4 rounded-xl bg-[#F6F9FB] border border-gray-200">
            <span className="font-mono-code text-[#00ADF1] font-bold text-lg block">Tahun 2015</span>
            <span className="text-xs text-gray-700 font-semibold block mt-1">Pembukaan S1 Keperawatan & Profesi Ners</span>
            <span className="text-[11px] text-gray-500 block mt-1">Pengembangan jenjang sarjana & profesi kesehatan.</span>
          </div>

          <div className="p-4 rounded-xl bg-[#F6F9FB] border border-gray-200">
            <span className="font-mono-code text-[#D9232C] font-bold text-lg block">Tahun 2021 - Sekarang</span>
            <span className="text-xs text-gray-700 font-semibold block mt-1">Transformasi Universitas Ichsan Satya</span>
            <span className="text-[11px] text-gray-500 block mt-1">Penambahan prodi Farmasi, Kesmas, & Informatika Medis.</span>
          </div>
        </div>
      </section>

      {/* 2. VISI & MISI */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* VISI */}
        <div className="bg-gradient-to-br from-[#17356B] to-[#0F1C2E] text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ADF1]/20 text-[#00ADF1] font-mono-code text-xs font-semibold">
            <Target className="w-4 h-4" />
            <span>VISI INSTITUSI 2030</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-white">Visi Universitas Ichsan Satya</h2>
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed italic border-l-4 border-[#00ADF1] pl-4">
            "Menjadi Perguruan Tinggi Unggul di Bidang Kesehatan dan Teknologi Berbasis Humanis, Kompetitif, serta Berdaya Saing Global pada Tahun 2030."
          </p>
        </div>

        {/* MISI */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-mono-code text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>MISI STRATEGIS</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-[#17356B]">Misi Perguruan Tinggi</h2>
          <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00ADF1] flex-shrink-0 mt-0.5" />
              <span>Menyelenggarakan pendidikan tinggi berkualitas dengan kurikulum yang adekuat, adaptif terhadap perkembangan teknologi medis digital.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00ADF1] flex-shrink-0 mt-0.5" />
              <span>Melakukan penelitian sains terapan dan kesehatan yang inovatif serta dipublikasikan di jurnal terakreditasi nasional dan internasional.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00ADF1] flex-shrink-0 mt-0.5" />
              <span>Menyelenggarakan pengabdian kepada masyarakat berbasis pemberdayaan kesehatan keluarga dan masyarakat berbasis komunitas.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00ADF1] flex-shrink-0 mt-0.5" />
              <span>Memperluas kemitraan strategis dengan rumah sakit, dunia industri, dan lembaga kesehatan internasional untuk penyaluran lulusan.</span>
            </li>
          </ul>
        </div>

      </section>

      {/* 3. SAMBUTAN LENGKAP REKTOR */}
      <section id="sambutan" className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm space-y-6 scroll-mt-24">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-60 rounded-2xl overflow-hidden shadow-lg border-2 border-[#00ADF1] flex-shrink-0">
            <img 
                src={rectorGreeting.photo} 
                alt={rectorGreeting.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 flex-1">
            <span className="text-xs font-mono-code text-[#00ADF1] uppercase font-semibold">Sambutan Rektor</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#17356B]">{rectorGreeting.name}</h2>
            <p className="text-xs font-mono-code text-gray-500">{rectorGreeting.title}</p>
            <blockquote className="italic text-gray-700 text-sm border-l-4 border-[#00ADF1] pl-3 py-1">
              "{rectorGreeting.quote}"
            </blockquote>
          </div>
        </div>

        <div className="space-y-4 text-sm text-gray-700 leading-relaxed border-t border-gray-100 pt-6">
          {rectorGreeting.fullMessage.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* 4. STRUKTUR ORGANISASI */}
      <section id="organisasi" className="space-y-6 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono-code text-[#00ADF1] uppercase font-semibold">Tatakelola Kampus</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#17356B]">Struktur Organisasi Pimpinan</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center space-y-3 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#17356B] text-white flex items-center justify-center font-bold text-xl mx-auto">
              R
            </div>
            <h3 className="font-bold text-sm text-[#17356B]">Dr. Hj. Royani, M.Kep.</h3>
            <span className="text-xs font-mono-code text-[#00ADF1] block">Rektor UIS</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center space-y-3 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#00ADF1] text-white flex items-center justify-center font-bold text-xl mx-auto">
              WR1
            </div>
            <h3 className="font-bold text-sm text-[#17356B]">Dr. apt. Hendra Gunawan, M.Si.</h3>
            <span className="text-xs font-mono-code text-[#00ADF1] block">Wakil Rektor I (Bidang Akademik)</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center space-y-3 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xl mx-auto">
              WR2
            </div>
            <h3 className="font-bold text-sm text-[#17356B]">Dra. Hj. Nunung Maria, M.M.</h3>
            <span className="text-xs font-mono-code text-[#00ADF1] block">Wakil Rektor II (Keuangan & SDM)</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center space-y-3 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xl mx-auto">
              WR3
            </div>
            <h3 className="font-bold text-sm text-[#17356B]">Nsr. Ahmad Hidayat, M.Kep.</h3>
            <span className="text-xs font-mono-code text-[#00ADF1] block">Wakil Rektor III (Kemahasiswaan & Kerjasama)</span>
          </div>
        </div>
      </section>

      {/* 5. SARANA & PRASARANA GALERI */}
      <section id="fasilitas" className="space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <span className="text-xs font-mono-code text-[#00ADF1] uppercase font-semibold">Sarana Belajar & Praktek</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#17356B]">Fasilitas Laboratorium & Kampus</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop" alt="Lab Simulasi Medis" className="w-full h-48 object-cover" />
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-base text-[#17356B]">Lab Simulasi Keperawatan Gawat Darurat</h3>
              <p className="text-gray-600 text-xs">High-fidelity manikin simulasi henti jantung, ventilator, dan bed perawatan intensif.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop" alt="Lab Farmasi" className="w-full h-48 object-cover" />
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-base text-[#17356B]">Laboratorium Farmasi & Instrumentasi HPLC</h3>
              <p className="text-gray-600 text-xs">Peralatan komplit formulasi obat steril, pembuatan kapsul, dan kromatografi instrumen.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop" alt="Perpustakaan Digital" className="w-full h-48 object-cover" />
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-base text-[#17356B]">Perpustakaan Digital Medis</h3>
              <p className="text-gray-600 text-xs">Ruang baca ber-AC, akses jaringan jurnal terindeks Scopus, ProQuest, & Springer.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
