import React, { useState, useEffect } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { getJobVacancies } from '../../lib/api/careerApi';
import { JobVacancy } from '../../types';
import { Briefcase, MapPin, Calendar, Mail, CheckCircle2, Building, ExternalLink } from 'lucide-react';

interface LokerPageProps {
  onNavigate: (path: string) => void;
}

export const LokerPage: React.FC<LokerPageProps> = ({ onNavigate }) => {
  const [jobs, setJobs] = useState<JobVacancy[]>([]);
  const [selectedField, setSelectedField] = useState<string>('Semua');

  useEffect(() => {
    getJobVacancies(selectedField).then(setJobs);
  }, [selectedField]);

  const fields = ['Semua', 'Keperawatan', 'Farmasi', 'Teknologi Informasi', 'Manajemen Rumah Sakit'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-4">
        <HeaderRunningMotif sectionNumber="bab.10" chapterTitle="karir & alumni • bursa kerja uis" />
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#17356B]">
          Lowongan Kerja Alumni & Layanan Karir
        </h1>
        <p className="text-gray-600 text-base max-w-3xl leading-relaxed">
          Peluang karir di rumah sakit jejaring IMC Group, laboratorium klinik, fasilitas farmasi, dan perusahaan mitra kesehatan nasional.
        </p>
      </div>

      {/* Field Filter */}
      <div className="flex flex-wrap items-center gap-2">
        {fields.map((f) => (
          <button
            key={f}
            onClick={() => setSelectedField(f)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              selectedField === f 
                ? 'bg-[#17356B] text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Vacancies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {jobs.map((job) => (
          <div 
            key={job.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-1 rounded bg-[#00ADF1]/10 text-[#00ADF1] font-mono-code text-[11px] font-bold">
                    Bidang: {job.field}
                  </span>
                  <h3 className="font-display font-bold text-xl text-[#17356B] mt-2">{job.title}</h3>
                  <p className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#17356B]" />
                    <span>{job.companyName}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono-code text-gray-500 border-y border-gray-100 py-2.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {job.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#00ADF1]" />
                  Buka s.d: {job.closeDate}
                </span>
              </div>

              <p className="text-gray-700 text-xs leading-relaxed">{job.description}</p>

              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-mono-code text-gray-400 block uppercase">Kualifikasi Pelamar:</span>
                <ul className="space-y-1 text-xs text-gray-700">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-mono-code text-gray-500">Email Kontak: {job.contactEmail}</span>
              <a 
                href={`mailto:${job.contactEmail}?subject=Lamaran%20Pekerjaan%20-${encodeURIComponent(job.title)}`}
                className="bg-[#17356B] hover:bg-[#00ADF1] text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm"
              >
                <span>Kirim Lamaran</span>
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
