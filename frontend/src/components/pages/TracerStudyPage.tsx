import React, { useState } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { mockStudyPrograms } from '../../lib/api/mockData';
import { submitTracerStudy } from '../../lib/api/admissionApi';
import { TracerStudySubmission } from '../../types';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface TracerStudyPageProps {
  onNavigate: (path: string) => void;
}

export const TracerStudyPage: React.FC<TracerStudyPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState<TracerStudySubmission>({
    nim: '',
    fullName: '',
    studyProgramId: mockStudyPrograms[0].id,
    graduationYear: '2025',
    employmentStatus: 'Bekerja',
    companyName: '',
    jobTitle: '',
    firstJobTimeMonths: 2,
    monthlySalaryRange: 'Rp 4.000.000 - Rp 7.000.000',
    relevanceToMajor: 'Sangat Sesuai',
    feedbackForCampus: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'studyProgramId' || name === 'firstJobTimeMonths' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await submitTracerStudy(formData);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-4 text-center">
        <HeaderRunningMotif sectionNumber="bab.14" chapterTitle="alumni • survei tracer study" />
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#17356B]">
          Survei Tracer Study Alumni UIS
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Mohon kesediaan para alumni mengisi survei penelusuran karir. Data Anda sangat berharga untuk peningkatan mutu kurikulum dan evaluasi akreditasi institusi.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="font-display font-bold text-2xl text-[#17356B]">Terima Kasih Banyak!</h2>
          <p className="text-gray-600 text-sm max-w-lg mx-auto">
            Survei Tracer Study Alumni atas nama <strong>{formData.fullName}</strong> telah tersimpan dalam basis data sistem penjaminan mutu Universitas Ichsan Satya.
          </p>
          <button 
            onClick={() => onNavigate('/')} 
            className="bg-[#17356B] text-white font-bold py-3 px-6 rounded-xl text-xs"
          >
            Kembali Ke Beranda
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-8">
          
          {/* Multi-Step Progress Bar */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#17356B] font-bold' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono-code ${step >= 1 ? 'bg-[#17356B] text-white' : 'bg-gray-100'}`}>1</div>
              <span className="text-xs">Data Kelulusan</span>
            </div>
            <div className="w-12 sm:w-20 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#17356B] font-bold' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono-code ${step >= 2 ? 'bg-[#17356B] text-white' : 'bg-gray-100'}`}>2</div>
              <span className="text-xs">Status Karir</span>
            </div>
            <div className="w-12 sm:w-20 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#17356B] font-bold' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono-code ${step >= 3 ? 'bg-[#17356B] text-white' : 'bg-gray-100'}`}>3</div>
              <span className="text-xs">Evaluasi & Finish</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* STEP 1: DATA ALUMNI */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="font-display font-bold text-lg text-[#17356B]">1. Identitas Alumni & Kelulusan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">NIM (Nomor Induk Mahasiswa)</label>
                    <input 
                      type="text" 
                      name="nim" 
                      value={formData.nim} 
                      onChange={handleChange} 
                      placeholder="Contoh: 180102001"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Nama Lengkap</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleChange} 
                      placeholder="Nama Lengkap & Gelar"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Program Studi</label>
                    <select 
                      name="studyProgramId" 
                      value={formData.studyProgramId} 
                      onChange={handleChange} 
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]"
                    >
                      {mockStudyPrograms.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Tahun Kelulusan / Wisuda</label>
                    <select 
                      name="graduationYear" 
                      value={formData.graduationYear} 
                      onChange={handleChange} 
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]"
                    >
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="Sebelum 2022">Sebelum 2022</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="bg-[#17356B] text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center gap-2"
                  >
                    <span>Lanjut ke Step 2 (Status Karir)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PEKERJAAN & KARIR */}
            {step === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="font-display font-bold text-lg text-[#17356B]">2. Status Pekerjaan & Karir Saat Ini</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Status Aktivitas Saat Ini</label>
                    <select 
                      name="employmentStatus" 
                      value={formData.employmentStatus} 
                      onChange={handleChange} 
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]"
                    >
                      <option value="Bekerja">Bekerja (Fulltime / Part-time)</option>
                      <option value="Wirausaha">Wirausaha / Praktik Mandiri</option>
                      <option value="Lanjut Studi">Melanjutkan Studi (S2 / Spesialis / Profesi)</option>
                      <option value="Mencari Kerja">Sedang Mencari Kerja</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Nama Perusahaan / Rumah Sakit / Instansi</label>
                    <input 
                      type="text" 
                      name="companyName" 
                      value={formData.companyName} 
                      onChange={handleChange} 
                      placeholder="Contoh: RS IMC Bintaro / PT Kalbe"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Jabatan / Posisi Kerja</label>
                    <input 
                      type="text" 
                      name="jobTitle" 
                      value={formData.jobTitle} 
                      onChange={handleChange} 
                      placeholder="Contoh: Perawat ICU / Apoteker"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Lama Waktu Mendapatkan Pekerjaan Pertama (Bulan)</label>
                    <input 
                      type="number" 
                      name="firstJobTimeMonths" 
                      value={formData.firstJobTimeMonths} 
                      onChange={handleChange} 
                      placeholder="Contoh: 2"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-xl text-xs"
                  >
                    Kembali Ke Step 1
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setStep(3)}
                    className="bg-[#17356B] text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center gap-2"
                  >
                    <span>Lanjut ke Step 3 (Evaluasi)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: EVALUASI & FEEDBACK */}
            {step === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="font-display font-bold text-lg text-[#17356B]">3. Kesesuaian Bidang Studi & Umpan Balik</h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Tingkat Kesesuaian Pekerjaan Dengan Jurusan Saat Kuliah di UIS</label>
                    <select 
                      name="relevanceToMajor" 
                      value={formData.relevanceToMajor} 
                      onChange={handleChange} 
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]"
                    >
                      <option value="Sangat Sesuai">Sangat Sesuai (Pekerjaan medis/bidang prodi)</option>
                      <option value="Sesuai">Sesuai</option>
                      <option value="Kurang Sesuai">Kurang Sesuai</option>
                      <option value="Tidak Sesuai">Tidak Sesuai</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Kritik & Saran / Umpan Balik Untuk Universitas Ichsan Satya</label>
                    <textarea 
                      name="feedbackForCampus" 
                      rows={3}
                      value={formData.feedbackForCampus} 
                      onChange={handleChange} 
                      placeholder="Saran peningkatan kurikulum, lab, atau jaringan karir alumni..."
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-xl text-xs"
                  >
                    Kembali Ke Step 2
                  </button>
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="bg-[#D9232C] hover:bg-[#b81b23] text-white font-bold py-3 px-8 rounded-xl text-xs shadow-lg flex items-center gap-2 transition"
                  >
                    {submitting ? 'Mengirim Data...' : 'Kirim Tracer Study Alumni'}
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>
      )}

    </div>
  );
};
