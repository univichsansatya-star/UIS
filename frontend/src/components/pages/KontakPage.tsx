import React, { useEffect, useState } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { mockContactInfo } from '../../lib/api/mockData';
import { getContactInfo } from '../../lib/api/contentApi';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Youtube, CheckCircle2 } from 'lucide-react';

interface KontakPageProps {
  onNavigate: (path: string) => void;
}

export const KontakPage: React.FC<KontakPageProps> = ({ onNavigate }) => {
  const [contactInfo, setContactInfo] = useState(mockContactInfo);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'PMB & Pendaftaran', message: '' });

  useEffect(() => {
    getContactInfo().then(setContactInfo);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="space-y-4">
        <HeaderRunningMotif sectionNumber="bab.16" chapterTitle="layanan informasi • kontak & peta lokasi kampus" />
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#17356B]">
          Hubungi Universitas Ichsan Satya
        </h1>
        <p className="text-gray-600 text-base max-w-3xl leading-relaxed">
          Pusat informasi pendaftaran, sekretariat rektorat, dan sekretariat akademik Kampus Bintaro. Kami siap membantu pertanyaan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 bg-[#17356B] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <span className="text-xs font-mono-code text-[#00ADF1] font-semibold uppercase">Informasi Sekretariat Kampus</span>
            <h2 className="font-display font-bold text-2xl text-white">Layanan Informasi Terpadu</h2>

            <div className="space-y-4 text-xs text-gray-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#00ADF1] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Alamat Kampus Utama:</strong>
                  <span>{contactInfo.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#00ADF1] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Telepon Call Center:</strong>
                  <span className="font-mono-code">{contactInfo.phone1} / {contactInfo.phone2}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#00ADF1] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Email Informasi & PMB:</strong>
                  <span className="font-mono-code">{contactInfo.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#00ADF1] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Jam Operasional Pelayanan:</strong>
                  <span>{contactInfo.operationalHours}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <span className="text-xs font-mono-code text-gray-400 uppercase block">Sosial Media Resmi:</span>
            <div className="flex items-center gap-3">
              <a href={contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-[#00ADF1] text-white transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-[#00ADF1] text-white transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={contactInfo.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-[#00ADF1] text-white transition">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono-code text-[#00ADF1] font-semibold uppercase">Pesan Langsung</span>
            <h2 className="font-display font-bold text-2xl text-[#17356B]">Kirim Pesan Ke Humas UIS</h2>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-lg text-emerald-900">Pesan Anda Telah Terkirim!</h3>
              <p className="text-xs text-emerald-700">Tim Humas Universitas Ichsan Satya akan membalas ke email Anda dalam kurun waktu 1x24 jam kerja.</p>
              <button onClick={() => setSubmitted(false)} className="text-xs font-bold text-[#17356B] underline pt-2">
                Kirim Pesan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Nama Lengkap Anda *</label>
                  <input 
                    type="text" 
                    value={form.name} 
                    onChange={(e) => setForm({ ...form, name: e.target.value })} 
                    placeholder="Nama Anda" 
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                    required 
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email Anda *</label>
                  <input 
                    type="email" 
                    value={form.email} 
                    onChange={(e) => setForm({ ...form, email: e.target.value })} 
                    placeholder="email@contoh.com" 
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Subjek Pertanyaan *</label>
                <select 
                  value={form.subject} 
                  onChange={(e) => setForm({ ...form, subject: e.target.value })} 
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]"
                >
                  <option value="PMB & Pendaftaran">Informasi Pendaftaran PMB</option>
                  <option value="Beasiswa">Pertanyaan Beasiswa</option>
                  <option value="Kerjasama & Mitra">Kerja Sama & Kemitraan RS</option>
                  <option value="Lainnya">Pertanyaan Umum Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Pesan Pertanyaan Lengkap *</label>
                <textarea 
                  rows={4} 
                  value={form.message} 
                  onChange={(e) => setForm({ ...form, message: e.target.value })} 
                  placeholder="Tuliskan pesan atau pertanyaan Anda di sini..." 
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00ADF1]" 
                  required 
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full sm:w-auto bg-[#17356B] hover:bg-[#00ADF1] text-white font-bold py-3.5 px-8 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan Sekarang</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

      {/* Embedded Google Maps */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl text-[#17356B]">Peta Lokasi Kampus Bintaro</h3>
          <span className="text-xs font-mono-code text-gray-500">Jl. Jombang Raya No. 56, Bintaro Sektor 9</span>
        </div>
        <div className="h-80 rounded-2xl overflow-hidden border border-gray-200">
          <iframe 
            src={mockContactInfo.googleMapsEmbedUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            title="Google Maps Lokasi Universitas Ichsan Satya"
          />
        </div>
      </div>

    </div>
  );
};
