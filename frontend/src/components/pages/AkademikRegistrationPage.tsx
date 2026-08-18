import React, { useState } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { mockStudyPrograms } from '../../lib/api/mockData';
import { submitAcademicRegistration } from '../../lib/api/admissionApi';
import { AcademicRegistrationForm } from '../../types';
import { CheckCircle2, FileText, Send, Sparkles } from 'lucide-react';

interface AkademikRegistrationPageProps {
  type: 'skripsi' | 'sidang' | 'wisuda' | 'camping';
  onNavigate: (path: string) => void;
}

export const AkademikRegistrationPage: React.FC<AkademikRegistrationPageProps> = ({ type, onNavigate }) => {
  const [submitting, setSubmitting] = useState(false);
  const [ticketResult, setTicketResult] = useState<{ success: boolean; ticketNo: string; message: string } | null>(null);

  const [formData, setFormData] = useState<AcademicRegistrationForm>({
    type,
    nim: '',
    fullName: '',
    studyProgramId: mockStudyPrograms[0].id,
    email: '',
    phone: '',
    thesisTitle: '',
    advisorName: '',
    academicYear: '2026/2027 Ganjil',
    notes: ''
  });

  const titles = {
    skripsi: 'Pendaftaran Skripsi & KTI',
    sidang: 'Pendaftaran Sidang Akhir & Ujian Komprehensif',
    wisuda: 'Pendaftaran Wisuda Kampus',
    camping: 'Pendaftaran Camping & Bina Mental Mahasiswa'
  };

  const descriptions = {
    skripsi: 'Formulir pengajuan judul skripsi/KTI, penetapan Dosen Pembimbing I & II.',
    sidang: 'Formulir pendaftaran sidang tugas akhir, verifikasi berkas bebas pustaka.',
    wisuda: 'Formulir pendataan calon wisudawan, ukuran toga, dan konfirmasi kehadiran orang tua.',
    camping: 'Pendaftaran program bina karakter dan kepemimpinan outdoor mahasiswa.'
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'studyProgramId' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitAcademicRegistration(formData);
    setSubmitting(false);
    setTicketResult(res);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-4 text-center">
        <HeaderRunningMotif sectionNumber="bab.15" chapterTitle={`layanan akademik • ${type}`} />
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#17356B]">
          {titles[type]}
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed max-w-xl mx-auto">
          {descriptions[type]}
        </p>
      </div>

      {ticketResult ? (
        <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-xl text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-display font-bold text-2xl text-[#17356B]">Pengajuan Berhasil Disimpan!</h2>
          <p className="text-xs text-gray-600 max-w-md mx-auto">{ticketResult.message}</p>
          <div className="p-4 bg-emerald-50 rounded-2xl font-mono-code text-xs text-emerald-900 font-bold inline-block">
            KODE TIKET: {ticketResult.ticketNo}
          </div>
          <div className="pt-2">
            <button onClick={() => setTicketResult(null)} className="bg-[#17356B] text-white font-bold py-2.5 px-6 rounded-xl text-xs">
              Isi Form Baru
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">NIM (Nomor Induk Mahasiswa) *</label>
                <input 
                  type="text" 
                  name="nim" 
                  value={formData.nim} 
                  onChange={handleChange} 
                  placeholder="Contoh: 210101099" 
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                  required 
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Nama Lengkap Mahasiswa *</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  placeholder="Nama Lengkap" 
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                  required 
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Program Studi *</label>
                <select 
                  name="studyProgramId" 
                  value={formData.studyProgramId} 
                  onChange={handleChange} 
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]"
                >
                  {mockStudyPrograms.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Tahun Ajaran / Semester *</label>
                <select 
                  name="academicYear" 
                  value={formData.academicYear} 
                  onChange={handleChange} 
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]"
                >
                  <option value="2026/2027 Ganjil">2026/2027 Ganjil</option>
                  <option value="2026/2027 Genap">2026/2027 Genap</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Email Aktif *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="email@mahasiswa.ac.id" 
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                  required 
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Nomor WhatsApp Aktif *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="08123456789" 
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                  required 
                />
              </div>
            </div>

            {/* Field Spesifik Skripsi / Sidang */}
            {(type === 'skripsi' || type === 'sidang') && (
              <div className="space-y-4 pt-2 border-t border-gray-100">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Usulan Judul Skripsi / KTI *</label>
                  <textarea 
                    name="thesisTitle" 
                    rows={2} 
                    value={formData.thesisTitle} 
                    onChange={handleChange} 
                    placeholder="Tuliskan judul skripsi/KTI Anda secara lengkap..." 
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                    required 
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Usulan Nama Dosen Pembimbing I</label>
                  <input 
                    type="text" 
                    name="advisorName" 
                    value={formData.advisorName} 
                    onChange={handleChange} 
                    placeholder="Nama Dosen Pembimbing" 
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                  />
                </div>
              </div>
            )}

            {/* Field Catatan */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Catatan Tambahan / Keterangan</label>
              <textarea 
                name="notes" 
                rows={2} 
                value={formData.notes} 
                onChange={handleChange} 
                placeholder="Catatan berkas atau pesan untuk Sekretariat Akademik..." 
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                type="submit" 
                disabled={submitting}
                className="bg-[#17356B] hover:bg-[#00ADF1] text-white font-bold py-3.5 px-8 rounded-xl text-xs transition flex items-center gap-2 shadow-md"
              >
                {submitting ? 'Mengirim Data...' : `Kirim Form ${type.toUpperCase()}`}
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
