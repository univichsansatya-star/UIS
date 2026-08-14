import React, { useState, useEffect } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { getScholarships } from '../../lib/api/scholarshipApi';
import { Scholarship } from '../../types';
import { GraduationCap, Award, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

interface BeasiswaPageProps {
  onNavigate: (path: string) => void;
}

export const BeasiswaPage: React.FC<BeasiswaPageProps> = ({ onNavigate }) => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);

  useEffect(() => {
    getScholarships().then(setScholarships);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="space-y-4">
        <HeaderRunningMotif sectionNumber="bab.08" chapterTitle="layanan mahasiswa • beasiswa & bantuan biaya" />
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#17356B]">
          Program Beasiswa UIS
        </h1>
        <p className="text-gray-600 text-base max-w-3xl leading-relaxed">
          Berbagai jalur beasiswa pemerintah, yayasan, dan mitra industri untuk mendukung generasi berprestasi menempuh pendidikan di Universitas Ichsan Satya.
        </p>
      </div>

      {/* Scholarship Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {scholarships.map((sch) => (
          <div 
            key={sch.id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="relative h-56 overflow-hidden">
                <img src={sch.image} alt={sch.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#17356B] text-white text-xs font-mono-code font-bold">
                  Provider: {sch.provider}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="font-display font-bold text-xl text-[#17356B]">{sch.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{sch.summary}</p>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <span className="text-[11px] font-mono-code text-gray-400 block uppercase">Syarat & Kualifikasi Utama:</span>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    {sch.eligibility.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00ADF1]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono-code text-emerald-600 block uppercase">Manfaat Beasiswa:</span>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    {sch.benefits.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
              <span className="text-xs font-mono-code text-gray-400">Batas Pendaftaran: <strong className="text-[#D9232C]">{sch.deadline}</strong></span>
              <button 
                onClick={() => onNavigate('/pmb')}
                className="bg-[#17356B] hover:bg-[#00ADF1] text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5"
              >
                <span>Daftar Beasiswa PMB</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
