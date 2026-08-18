import React, { useState } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { mockStudyPrograms } from '../../lib/api/mockData';
import { submitAdmissionApplication } from '../../lib/api/admissionApi';
import { AdmissionApplication } from '../../types';
import { 
  CheckCircle2, User, School, BookOpen, Users, ArrowRight, 
  FileCheck, ShieldCheck, Download, AlertCircle, Sparkles, Phone, Mail 
} from 'lucide-react';

interface PmbPageProps {
  onNavigate: (path: string) => void;
}

export const PmbPage: React.FC<PmbPageProps> = ({ onNavigate }) => {
  const [formStep, setFormStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<{ success: boolean; registrationNumber: string; message: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [formData, setFormData] = useState<AdmissionApplication>({
    fullName: '',
    nik: '',
    birthPlace: '',
    birthDate: '',
    gender: 'L',
    religion: 'Islam',
    address: '',
    phoneNumber: '',
    email: '',
    previousSchool: '',
    graduationYear: '2026',
    previousMajor: 'IPA',
    chosenProgramId: mockStudyPrograms[0].id,
    fatherName: '',
    motherName: '',
    guardianName: '',
    parentOccupation: 'Karyawan Swasta',
    parentIncome: 'Rp 3.000.000 - Rp 5.000.000'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'chosenProgramId' ? Number(value) : value
    }));
  };

  const validateStep1 = () => {
    if (!formData.fullName.trim()) return "Nama Lengkap wajib diisi.";
    if (!formData.nik.trim() || formData.nik.length < 16) return "NIK wajib 16 digit angka valid.";
    if (!formData.birthPlace.trim() || !formData.birthDate) return "Tempat & Tanggal Lahir wajib diisi.";
    if (!formData.email.trim() || !formData.email.includes('@')) return "Email aktif wajib diisi dengan benar.";
    if (!formData.phoneNumber.trim()) return "Nomor HP/WhatsApp wajib diisi.";
    if (!formData.address.trim()) return "Alamat Domisili lengkap wajib diisi.";
    return null;
  };

  const validateStep2 = () => {
    if (!formData.previousSchool.trim()) return "Nama Sekolah Asal wajib diisi.";
    if (!formData.graduationYear) return "Tahun Lulus wajib diisi.";
    return null;
  };

  const validateStep3 = () => {
    if (!formData.fatherName.trim() && !formData.motherName.trim()) return "Nama Ayah atau Ibu Kandung wajib diisi.";
    return null;
  };

  const handleNextStep = () => {
    setErrorMessage('');
    if (formStep === 1) {
      const err = validateStep1();
      if (err) { setErrorMessage(err); return; }
    } else if (formStep === 2) {
      const err = validateStep2();
      if (err) { setErrorMessage(err); return; }
    }
    setFormStep((prev) => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const err = validateStep3();
    if (err) { setErrorMessage(err); return; }

    setSubmitting(true);
    try {
      const res = await submitAdmissionApplication(formData);
      setResult(res);
    } catch (error) {
      setErrorMessage("Terjadi kesalahan sistem saat mengirim formulir.");
    } finally {
      setSubmitting(false);
    }
  };

  const chosenProdiObj = mockStudyPrograms.find(p => p.id === formData.chosenProgramId);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <HeaderRunningMotif sectionNumber="bab.07" chapterTitle="pmb • pendaftaran mahasiswa baru ta 2026/2027" />
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#17356B]">
          Form Pendaftaran Mahasiswa Baru
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Isi formulir pendaftaran online di bawah ini. Bebas biaya pendaftaran untuk 100 pendaftar pertama bulan ini!
        </p>
      </div>

      {/* Alur & Gelombang Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#17356B] text-white p-5 rounded-2xl border border-white/10 space-y-2">
          <span className="text-[11px] font-mono-code text-[#00ADF1] font-bold block">GELOMBANG 1</span>
          <h4 className="font-bold text-base">Jalur Prestasi & Rapor</h4>
          <p className="text-xs text-gray-300">Bebas Tes Tulis + Diskon Uang Gedung 50% (S.d 30 Agustus 2026)</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
          <span className="text-[11px] font-mono-code text-[#00ADF1] font-bold block">ALUR 1: ISI FORMULIR</span>
          <h4 className="font-bold text-base text-[#17356B]">Lengkapi Data Diri</h4>
          <p className="text-xs text-gray-600">Lengkapi data pribadi, asal sekolah, dan pilih program studi tujuan.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
          <span className="text-[11px] font-mono-code text-emerald-600 font-bold block">ALUR 2: VERIFIKASI WA</span>
          <h4 className="font-bold text-base text-[#17356B]">Konfirmasi Panitia</h4>
          <p className="text-xs text-gray-600">Tim PMB UIS akan menghubungi WhatsApp Anda untuk penyerahan berkas & kartu ujian.</p>
        </div>
      </div>

      {/* FORM REGISTRASI SUCCESS STATE */}
      {result ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-xl text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#17356B]">Pendaftaran Berhasil Terkirim!</h2>
            <p className="text-gray-600 text-sm max-w-lg mx-auto">
              {result.message}
            </p>
          </div>

          <div className="max-w-md mx-auto p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-2 font-mono-code text-xs text-emerald-900">
            <p><strong>NOMOR REGISTRASI:</strong> <span className="text-base font-bold text-[#D9232C]">{result.registrationNumber}</span></p>
            <p><strong>NAMA PENDAFTAR:</strong> {formData.fullName}</p>
            <p><strong>PROGRAM STUDI:</strong> {chosenProdiObj?.name}</p>
            <p><strong>EMAIL:</strong> {formData.email}</p>
            <p><strong>WHATSAPP:</strong> {formData.phoneNumber}</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => window.print()} 
              className="bg-[#17356B] text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Cetak Bukti Pendaftaran</span>
            </button>
            <button 
              onClick={() => { setResult(null); setFormStep(1); }}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold py-3 px-6 rounded-xl text-xs"
            >
              Daftar Mahasiswa Baru Lain
            </button>
          </div>
        </div>
      ) : (
        /* MULTI-STEP FORM CONTAINER */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-8">
          
          {/* Step Indicator */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div className={`flex items-center gap-2 ${formStep >= 1 ? 'text-[#17356B] font-bold' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono-code ${formStep >= 1 ? 'bg-[#17356B] text-white' : 'bg-gray-100'}`}>1</div>
              <span className="text-xs hidden sm:inline">Data Pribadi</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center gap-2 ${formStep >= 2 ? 'text-[#17356B] font-bold' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono-code ${formStep >= 2 ? 'bg-[#17356B] text-white' : 'bg-gray-100'}`}>2</div>
              <span className="text-xs hidden sm:inline">Sekolah & Prodi</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center gap-2 ${formStep >= 3 ? 'text-[#17356B] font-bold' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono-code ${formStep >= 3 ? 'bg-[#17356B] text-white' : 'bg-gray-100'}`}>3</div>
              <span className="text-xs hidden sm:inline">Orang Tua & Final</span>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* STEP 1: DATA PRIBADI */}
            {formStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="font-display font-bold text-xl text-[#17356B] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#00ADF1]" />
                  <span>1. Identitas Calon Mahasiswa</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Nama Lengkap (Sesuai Ijazah/KTP) *</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleInputChange} 
                      placeholder="Contoh: Anisa Rahmawati"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">NIK (Nomor Induk Kependudukan - 16 Digit) *</label>
                    <input 
                      type="text" 
                      name="nik" 
                      maxLength={16}
                      value={formData.nik} 
                      onChange={handleInputChange} 
                      placeholder="3674000000000001"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Tempat Lahir *</label>
                    <input 
                      type="text" 
                      name="birthPlace" 
                      value={formData.birthPlace} 
                      onChange={handleInputChange} 
                      placeholder="Jakarta / Tangerang / dll"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Tanggal Lahir *</label>
                    <input 
                      type="date" 
                      name="birthDate" 
                      value={formData.birthDate} 
                      onChange={handleInputChange} 
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Jenis Kelamin *</label>
                    <select 
                      name="gender" 
                      value={formData.gender} 
                      onChange={handleInputChange} 
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]"
                    >
                      <option value="L">Laki-Laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Agama *</label>
                    <select 
                      name="religion" 
                      value={formData.religion} 
                      onChange={handleInputChange} 
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]"
                    >
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen Protestan</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Buddha">Buddha</option>
                      <option value="Konghucu">Konghucu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Nomor HP / WhatsApp Aktif *</label>
                    <input 
                      type="tel" 
                      name="phoneNumber" 
                      value={formData.phoneNumber} 
                      onChange={handleInputChange} 
                      placeholder="08123456789"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Email Aktif *</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="anisa@gmail.com"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-semibold text-gray-700 mb-1">Alamat Tempat Tinggal Lengkap *</label>
                    <textarea 
                      name="address" 
                      rows={2}
                      value={formData.address} 
                      onChange={handleInputChange} 
                      placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten, Provinsi"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    type="button" 
                    onClick={handleNextStep}
                    className="bg-[#17356B] text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center gap-2 hover:bg-[#0f244a] transition"
                  >
                    <span>Lanjut ke Step 2 (Sekolah & Prodi)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SEKOLAH ASAL & PILIHAN PRODI */}
            {formStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="font-display font-bold text-xl text-[#17356B] flex items-center gap-2">
                  <School className="w-5 h-5 text-[#00ADF1]" />
                  <span>2. Asal Sekolah & Pilihan Program Studi</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Nama SMA / SMK / MA Asal *</label>
                    <input 
                      type="text" 
                      name="previousSchool" 
                      value={formData.previousSchool} 
                      onChange={handleInputChange} 
                      placeholder="Contoh: SMA Negeri 2 Tangsel / SMAN 1 Jakarta"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Jurusan Asal SMA/SMK *</label>
                    <select 
                      name="previousMajor" 
                      value={formData.previousMajor} 
                      onChange={handleInputChange} 
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]"
                    >
                      <option value="IPA">IPA / Saintek</option>
                      <option value="IPS">IPS / Soshum</option>
                      <option value="SMK Kesehatan">SMK Kesehatan / Keperawatan / Farmasi</option>
                      <option value="SMK Teknik / TKJ">SMK Teknik / IT / Komputer</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Tahun Lulus *</label>
                    <select 
                      name="graduationYear" 
                      value={formData.graduationYear} 
                      onChange={handleInputChange} 
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]"
                    >
                      <option value="2026">2026 (Lulusan Tahun Ini)</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="Sebelum 2023">Sebelum 2023</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 p-4 rounded-2xl bg-[#F6F9FB] border border-[#00ADF1]/30 space-y-2">
                    <label className="block font-bold text-sm text-[#17356B]">Pilihan Program Studi Tujuan di UIS *</label>
                    <select 
                      name="chosenProgramId" 
                      value={formData.chosenProgramId} 
                      onChange={handleInputChange} 
                      className="w-full p-3 rounded-xl border border-gray-300 font-bold text-[#17356B] focus:outline-none focus:border-[#00ADF1]"
                    >
                      {mockStudyPrograms.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.degree}) — Akreditasi: {p.accreditation}
                        </option>
                      ))}
                    </select>
                    {chosenProdiObj && (
                      <p className="text-[11px] text-gray-600 font-mono-code pt-1">
                        * Pilihan prodi: {chosenProdiObj.name} • Kuota tersedia Gelombang 1.
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button 
                    type="button" 
                    onClick={() => setFormStep(1)}
                    className="bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-xl text-xs hover:bg-gray-200 transition"
                  >
                    Kembali Ke Step 1
                  </button>
                  <button 
                    type="button" 
                    onClick={handleNextStep}
                    className="bg-[#17356B] text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center gap-2 hover:bg-[#0f244a] transition"
                  >
                    <span>Lanjut ke Step 3 (Orang Tua & Submit)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ORANG TUA & SUBMIT */}
            {formStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="font-display font-bold text-xl text-[#17356B] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#00ADF1]" />
                  <span>3. Data Orang Tua / Wali & Finalisasi</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Nama Ayah Kandung *</label>
                    <input 
                      type="text" 
                      name="fatherName" 
                      value={formData.fatherName} 
                      onChange={handleInputChange} 
                      placeholder="Nama Ayah"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Nama Ibu Kandung *</label>
                    <input 
                      type="text" 
                      name="motherName" 
                      value={formData.motherName} 
                      onChange={handleInputChange} 
                      placeholder="Nama Ibu"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Pekerjaan Orang Tua / Wali</label>
                    <select 
                      name="parentOccupation" 
                      value={formData.parentOccupation} 
                      onChange={handleInputChange} 
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]"
                    >
                      <option value="PNS / TNI / Polri">PNS / TNI / Polri</option>
                      <option value="Karyawan Swasta">Karyawan Swasta</option>
                      <option value="Wiraswasta / Pedagang">Wiraswasta / Pedagang</option>
                      <option value="Petani / Nelayan">Petani / Nelayan</option>
                      <option value="Tenaga Kesehatan">Tenaga Kesehatan</option>
                      <option value="Pensiunan">Pensiunan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Penghasilan Orang Tua Per Bulan</label>
                    <select 
                      name="parentIncome" 
                      value={formData.parentIncome} 
                      onChange={handleInputChange} 
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]"
                    >
                      <option value="< Rp 2.000.000">&lt; Rp 2.000.000</option>
                      <option value="Rp 2.000.000 - Rp 3.000.000">Rp 2.000.000 - Rp 3.000.000</option>
                      <option value="Rp 3.000.000 - Rp 5.000.000">Rp 3.000.000 - Rp 5.000.000</option>
                      <option value="Rp 5.000.000 - Rp 10.000.000">Rp 5.000.000 - Rp 10.000.000</option>
                      <option value="> Rp 10.000.000">&gt; Rp 10.000.000</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F6F9FB] border border-gray-200 text-xs text-gray-600 space-y-2">
                  <p className="font-bold text-[#17356B]">Pernyataan Kebenaran Data:</p>
                  <p>Dengan menekan tombol kirim di bawah, saya menyatakan bahwa seluruh data pendaftaran yang diisikan adalah benar dan sah sesuai dokumen asli.</p>
                </div>

                <div className="pt-4 flex justify-between">
                  <button 
                    type="button" 
                    onClick={() => setFormStep(2)}
                    className="bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-xl text-xs hover:bg-gray-200 transition"
                  >
                    Kembali Ke Step 2
                  </button>

                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="bg-[#D9232C] hover:bg-[#b81b23] text-white font-bold py-3.5 px-8 rounded-xl text-xs shadow-lg flex items-center gap-2 transition disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Mengirim Formulir...</span>
                    ) : (
                      <>
                        <span>Kirim Pendaftaran PMB</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
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
