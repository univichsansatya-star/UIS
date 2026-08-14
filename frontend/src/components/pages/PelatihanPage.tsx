import React, { useState, useEffect } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { getTrainingList } from '../../lib/api/trainingApi';
import { Training } from '../../types';
import { Calendar, Clock, MapPin, Users, Award, ExternalLink, ArrowRight } from 'lucide-react';

interface PelatihanPageProps {
  onNavigate: (path: string, param?: string) => void;
}

export const PelatihanPage: React.FC<PelatihanPageProps> = ({ onNavigate }) => {
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    getTrainingList().then(setTrainings);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="space-y-4">
        <HeaderRunningMotif sectionNumber="bab.09" chapterTitle="pengembangan profesi • pelatihan & webinar" />
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#17356B]">
          Pelatihan & Sertifikasi Profesi
        </h1>
        <p className="text-gray-600 text-base max-w-3xl leading-relaxed">
          Program pelatihan klinis ber-SKP (BTCLS, GATS), workshop rekam medis digital, dan webinar kesehatan nasional bagi mahasiswa, alumni, serta praktisi medis.
        </p>
      </div>

      {/* Training List Grid */}
      <div className="space-y-8">
        {trainings.map((t) => (
          <div 
            key={t.id}
            className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            <div className="lg:col-span-5 h-64 lg:h-auto relative">
              <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
              <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase ${t.status === 'upcoming' ? 'bg-emerald-600 text-white' : 'bg-gray-600 text-white'}`}>
                {t.status === 'upcoming' ? 'Akan Datang' : 'Selesai'}
              </span>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#17356B]">{t.title}</h3>
                <p className="text-xs text-[#00ADF1] font-mono-code font-semibold">{t.subtitle}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-code text-gray-600 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#00ADF1]" />
                    <span>{t.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#00ADF1]" />
                    <span>{t.startTime} - {t.endTime} WIB</span>
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-[#00ADF1]" />
                    <span>{t.location}</span>
                  </div>
                </div>

                <p className="text-gray-700 text-xs leading-relaxed pt-2">{t.description}</p>

                {/* Speakers Preview */}
                <div className="pt-2">
                  <span className="text-[11px] font-mono-code text-gray-400 uppercase block mb-2">Narasumber / Pembicara:</span>
                  <div className="flex flex-wrap gap-4">
                    {t.speakers.map((sp) => (
                      <div key={sp.id} className="flex items-center gap-2">
                        <img src={sp.photo} alt={sp.name} className="w-8 h-8 rounded-full object-cover border border-[#00ADF1]" />
                        <div className="text-[11px]">
                          <span className="font-bold text-[#17356B] block leading-none">{sp.name}</span>
                          <span className="text-gray-500 font-mono-code text-[10px]">{sp.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono-code text-gray-500 block">Investasi / Biaya:</span>
                  <span className="font-bold text-base text-[#D9232C]">{t.fee}</span>
                </div>

                <a 
                  href={t.registrationLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#17356B] hover:bg-[#00ADF1] text-white font-bold py-2.5 px-6 rounded-xl text-xs transition flex items-center gap-2 shadow-md"
                >
                  <span>Daftar Peserta Pelatihan</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
