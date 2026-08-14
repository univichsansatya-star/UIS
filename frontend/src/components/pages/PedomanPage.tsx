import React, { useState, useEffect } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { getGuidelines } from '../../lib/api/documentApi';
import { GuidelineItem } from '../../types';
import { BookOpen, Download, ShieldCheck, Users } from 'lucide-react';

interface PedomanPageProps {
  onNavigate: (path: string) => void;
}

export const PedomanPage: React.FC<PedomanPageProps> = ({ onNavigate }) => {
  const [guidelines, setGuidelines] = useState<GuidelineItem[]>([]);

  useEffect(() => {
    getGuidelines().then(setGuidelines);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-4">
        <HeaderRunningMotif sectionNumber="bab.12" chapterTitle="tata tertib & pedoman • buku panduan resmi" />
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#17356B]">
          Buku Pedoman & Panduan Akademik
        </h1>
        <p className="text-gray-600 text-base max-w-3xl leading-relaxed">
          Buku petunjuk operasional penulisan skripsi/KTI, panduan praktek klinik keperawatan & kebidanan (PKK), serta kode etik civitas akademika UIS.
        </p>
      </div>

      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guidelines.map((g) => (
          <div 
            key={g.id}
            className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-[#17356B]/10 text-[#17356B] font-mono-code text-[11px] font-bold">
                Target: {g.targetAudience}
              </span>

              <h3 className="font-display font-bold text-lg text-[#17356B]">{g.title}</h3>
              <p className="text-xs text-gray-500 font-mono-code">Kategori: {g.category}</p>
              
              <div className="p-3 rounded-xl bg-[#F6F9FB] text-xs font-mono-code text-gray-600 space-y-1">
                <p>Format: {g.fileType}</p>
                <p>Ukuran: {g.fileSize}</p>
                <p>Revisi Terakhir: {g.updatedAt}</p>
              </div>
            </div>

            <button 
              onClick={() => alert(`Mengunduh pedoman: ${g.title}`)}
              className="w-full bg-[#17356B] hover:bg-[#00ADF1] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Unduh PDF Pedoman</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
