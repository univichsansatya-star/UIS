import React, { useEffect, useState } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { mockFaculties, mockStudyPrograms } from '../../lib/api/mockData';
import { getFaculties, getAllStudyPrograms } from '../../lib/api/facultyApi';
import { StudyProgram } from '../../types';
import { GraduationCap, Award, CheckCircle2, ArrowRight, BookOpen, Clock, UserCheck, ChevronRight, Sparkles } from 'lucide-react';

interface AkademikPageProps {
  onNavigate: (path: string) => void;
  selectedProdiSlug?: string;
}

export const AkademikPage: React.FC<AkademikPageProps> = ({ onNavigate, selectedProdiSlug }) => {
  const [faculties, setFaculties] = useState(mockFaculties);
  const [studyPrograms, setStudyPrograms] = useState(mockStudyPrograms);
  const [selectedProdi, setSelectedProdi] = useState<StudyProgram | null>(() => {
    if (selectedProdiSlug) {
      return mockStudyPrograms.find(p => p.slug === selectedProdiSlug) || null;
    }
    return null;
  });

  useEffect(() => {
    Promise.all([getFaculties(), getAllStudyPrograms()]).then(([facultyData, programData]) => {
      setFaculties(facultyData);
      setStudyPrograms(programData);
      if (selectedProdiSlug) {
        setSelectedProdi(programData.find((program) => program.slug === selectedProdiSlug) || null);
      }
    });
  }, [selectedProdiSlug]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="space-y-4">
        <HeaderRunningMotif sectionNumber="bab.03" chapterTitle="akademik • fakultas & kurikulum prodi" />
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#17356B]">
          Fakultas & Program Studi
        </h1>
        <p className="text-gray-600 text-base max-w-3xl leading-relaxed">
          Pilihan program studi vokasi, sarjana, dan profesi yang dirancang sesuai standar kompetensi industri kesehatan dan teknologi medis nasional.
        </p>
      </div>

      {/* Selected Prodi Detail Modal / Drawer View */}
      {selectedProdi && (
        <div className="bg-[#17356B] text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6 relative border border-[#00ADF1]/40 animate-fadeIn">
          <button 
            onClick={() => setSelectedProdi(null)}
            className="absolute top-6 right-6 text-gray-300 hover:text-white font-mono-code text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            ✕ Tutup Detail
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ADF1]/20 text-[#00ADF1] font-mono-code text-xs font-bold">
            <GraduationCap className="w-4 h-4" />
            <span>DETAIL PROGRAM STUDI</span>
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-bold text-3xl text-white">{selectedProdi.name}</h2>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono-code text-gray-300">
              <span className="px-2.5 py-1 rounded bg-[#00ADF1] text-white font-bold">{selectedProdi.degree}</span>
              <span>Akreditasi: <strong className="text-emerald-400">{selectedProdi.accreditation}</strong></span>
              <span>•</span>
              <span>Masa Studi: {selectedProdi.durationYears} Tahun</span>
              <span>•</span>
              <span>Kaprodi: {selectedProdi.headOfProgram}</span>
            </div>
          </div>

          <p className="text-gray-200 text-sm leading-relaxed max-w-4xl pt-2">
            {selectedProdi.content}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            <div>
              <h4 className="font-bold text-sm text-[#00ADF1] uppercase font-mono-code mb-3">Prospek Karir Lulusan:</h4>
              <ul className="space-y-2 text-xs text-gray-200">
                {selectedProdi.careerOutlooks.map((career, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{career}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-end">
              <div className="p-4 rounded-xl bg-white/10 border border-white/20 space-y-3">
                <span className="text-xs text-gray-200 font-semibold block">Siap mendaftar di prodi ini?</span>
                <button 
                  onClick={() => onNavigate('/pmb')}
                  className="w-full bg-[#D9232C] hover:bg-[#b81b23] text-white font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Daftar Sekarang di {selectedProdi.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Faculty Sections */}
      <div className="space-y-12">
        {faculties.map((faculty) => (
          <div key={faculty.id} className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-6">
              <div>
                <span className="text-xs font-mono-code text-[#00ADF1] uppercase font-semibold">Fakultas Institusi</span>
                <h2 className="font-display font-bold text-2xl text-[#17356B] mt-1">{faculty.name}</h2>
                <p className="text-gray-600 text-xs mt-1">Dekan: {faculty.deanName}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#17356B]/10 text-[#17356B] font-mono-code text-xs font-bold">
                {faculty.programs.length} Program Studi
              </span>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              {faculty.description}
            </p>

            {/* Prodi Cards within Faculty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {faculty.programs.map((prodi) => (
                <div 
                  key={prodi.id}
                  className="p-6 rounded-2xl border border-gray-200 hover:border-[#00ADF1] transition bg-[#F6F9FB] space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-1 rounded bg-[#17356B] text-white font-mono-code text-xs font-bold">
                        {prodi.degree}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-mono-code text-xs font-semibold">
                        Akreditasi: {prodi.accreditation}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#17356B]">{prodi.name}</h3>
                    <p className="text-gray-600 text-xs line-clamp-3 leading-relaxed">{prodi.content}</p>

                    <div className="pt-2 text-[11px] font-mono-code text-gray-500">
                      <span>Kaprodi: {prodi.headOfProgram}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                    <button 
                      onClick={() => setSelectedProdi(prodi)}
                      className="text-xs font-bold text-[#00ADF1] hover:text-[#17356B] flex items-center gap-1 transition"
                    >
                      <span>Lihat Detail Prospek</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onNavigate('/pmb')}
                      className="text-xs font-bold text-[#D9232C] hover:underline"
                    >
                      Daftar Prodi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
