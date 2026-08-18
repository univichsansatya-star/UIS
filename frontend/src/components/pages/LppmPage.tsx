import React, { useState, useEffect } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { getResearchNews } from '../../lib/api/lppmApi';
import { ResearchNews } from '../../types';
import { BookOpen, Calendar, User, Download, ArrowRight, ShieldCheck, Microscope } from 'lucide-react';

interface LppmPageProps {
  onNavigate: (path: string, param?: string) => void;
}

export const LppmPage: React.FC<LppmPageProps> = ({ onNavigate }) => {
  const [items, setItems] = useState<ResearchNews[]>([]);

  useEffect(() => {
    getResearchNews().then(setItems);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-4">
        <HeaderRunningMotif sectionNumber="bab.05" chapterTitle="tri dharma • lppm & riset inovasi" />
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#17356B]">
          LPPM & Riset Pengabdian Masyarakat
        </h1>
        <p className="text-gray-600 text-base max-w-3xl leading-relaxed">
          Lembaga Penelitian dan Pengabdian kepada Masyarakat (LPPM) Universitas Ichsan Satya mengampu publikasi jurnal ilmiah, riset herbal medis, dan aksi bakti sehat masyarakat.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#17356B] text-white p-6 rounded-3xl space-y-2">
          <Microscope className="w-8 h-8 text-[#00ADF1]" />
          <h3 className="font-bold text-lg font-display">Riset Herbal & Sains Medis</h3>
          <p className="text-xs text-gray-300">Fokus riset terapan senyawa alami lokal dan penapisan bioaktivitas obat.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-2 shadow-sm">
          <BookOpen className="w-8 h-8 text-[#17356B]" />
          <h3 className="font-bold text-lg font-display text-[#17356B]">Jurnal Ilmiah Ichsan Satya</h3>
          <p className="text-xs text-gray-600">Publikasi berkala ilmiah terakreditasi SINTA bidang keperawatan & kesehatan.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-2 shadow-sm">
          <ShieldCheck className="w-8 h-8 text-emerald-600" />
          <h3 className="font-bold text-lg font-display text-[#17356B]">Bakti Sehat Masyarakat</h3>
          <p className="text-xs text-gray-600">Pemberdayaan Posyandu, edukasi stunting, dan pemeriksaan kesehatan gratis.</p>
        </div>
      </div>

      {/* Research Articles Listing */}
      <div className="space-y-8">
        <h2 className="font-display font-bold text-2xl text-[#17356B]">Publikasi & Laporan Penelitian Terbaru</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((r) => (
            <article 
              key={r.id}
              className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={r.coverImage} alt={r.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#17356B] text-white font-mono-code text-xs font-bold">
                    {r.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-[#00ADF1]" />
                    <span>{r.publishedAt}</span>
                    <span>•</span>
                    <User className="w-3.5 h-3.5 text-[#00ADF1]" />
                    <span>{r.author}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#17356B] leading-snug">{r.title}</h3>

                  <div className="p-3 rounded-xl bg-[#F6F9FB] border border-gray-100">
                    <span className="text-[11px] font-mono-code text-gray-400 block uppercase font-bold mb-1">Abstrak Penelitian:</span>
                    <p className="text-xs text-gray-700 italic leading-relaxed">{r.abstract}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
                <button 
                  onClick={() => alert(`Mengunduh Jurnal PDF: ${r.title}`)}
                  className="bg-[#17356B] hover:bg-[#00ADF1] text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Naskah Publikasi</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

    </div>
  );
};
