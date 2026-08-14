import React, { useState, useEffect } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { getAccreditationList } from '../../lib/api/accreditationApi';
import { Accreditation } from '../../types';
import { ShieldCheck, Award, Calendar, FileText, CheckCircle2 } from 'lucide-react';

interface AkreditasiPageProps {
  onNavigate: (path: string) => void;
}

export const AkreditasiPage: React.FC<AkreditasiPageProps> = ({ onNavigate }) => {
  const [items, setItems] = useState<Accreditation[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<Accreditation | null>(null);

  useEffect(() => {
    getAccreditationList().then(setItems);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="space-y-4">
        <HeaderRunningMotif sectionNumber="bab.06" chapterTitle="penjaminan mutu • akreditasi institusi & prodi" />
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#17356B]">
          Status & Sertifikat Akreditasi
        </h1>
        <p className="text-gray-600 text-base max-w-3xl leading-relaxed">
          Bukti komitmen penjaminan mutu tata kelola perguruan tinggi dan keabsahan sertifikat akreditasi BAN-PT serta LAM-PTKes Indonesia.
        </p>
      </div>

      {/* Summary Banner */}
      <div className="bg-gradient-to-br from-[#17356B] to-[#0F1C2E] text-white rounded-3xl p-8 sm:p-10 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <span className="text-xs font-mono-code text-[#00ADF1]">AKREDITASI INSTITUSI</span>
          <h3 className="text-2xl font-bold font-display">Peringkat "Baik Sekali"</h3>
          <p className="text-xs text-gray-300">Surat Keputusan BAN-PT Nomor: 412/SK/BAN-PT/Akred/PT/VI/2024</p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono-code text-[#00ADF1]">AKREDITASI PRODI KES</span>
          <h3 className="text-2xl font-bold font-display">Terakreditasi LAM-PTKes</h3>
          <p className="text-xs text-gray-300">Seluruh prodi kesehatan memiliki status legal terakreditasi aktif.</p>
        </div>

        <div className="flex items-center justify-center">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/20 text-center space-y-1">
            <ShieldCheck className="w-8 h-8 text-[#00ADF1] mx-auto" />
            <span className="font-bold text-sm block">100% Legal & Terverifikasi</span>
            <span className="text-[10px] text-gray-300 font-mono-code block">PDDIKTI Kemenristekdikti</span>
          </div>
        </div>
      </div>

      {/* Accreditation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((acc) => (
          <div 
            key={acc.id}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 rounded-full bg-[#17356B] text-white font-mono-code text-xs font-bold">
                  {acc.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono-code text-xs font-bold">
                  Peringkat: {acc.accreditationGrade}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-[#17356B]">{acc.title}</h3>
              
              <div className="p-3 rounded-xl bg-[#F6F9FB] border border-gray-100 text-xs font-mono-code space-y-1 text-gray-700">
                <p><strong>No. SK:</strong> {acc.decreeNumber}</p>
                <p><strong>Berlaku S.d:</strong> {acc.validUntil}</p>
              </div>

              <p className="text-gray-600 text-xs leading-relaxed">{acc.content}</p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button 
                onClick={() => setSelectedCertificate(acc)}
                className="text-xs font-bold text-[#00ADF1] hover:text-[#17356B] flex items-center gap-1.5 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Lihat Certificate Preview</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 text-center">
            <h3 className="font-bold text-lg text-[#17356B]">{selectedCertificate.title}</h3>
            <div className="h-64 rounded-xl overflow-hidden border border-gray-200">
              <img src={selectedCertificate.image} alt={selectedCertificate.title} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs text-gray-600 font-mono-code">{selectedCertificate.decreeNumber}</p>
            <button 
              onClick={() => setSelectedCertificate(null)}
              className="w-full bg-[#17356B] text-white py-2.5 rounded-xl font-bold text-xs"
            >
              Tutup Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
