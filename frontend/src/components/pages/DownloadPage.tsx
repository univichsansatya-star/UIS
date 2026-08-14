import React, { useState, useEffect } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { getDocuments, getDocumentCategories } from '../../lib/api/documentApi';
import { DocumentCategory, DocumentItem } from '../../types';
import { Download, FileText, Calendar, Filter } from 'lucide-react';

interface DownloadPageProps {
  onNavigate: (path: string) => void;
}

export const DownloadPage: React.FC<DownloadPageProps> = ({ onNavigate }) => {
  const [categories, setCategories] = useState<DocumentCategory[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [selectedCat, setSelectedCat] = useState<number | undefined>(undefined);

  useEffect(() => {
    getDocumentCategories().then(setCategories);
  }, []);

  useEffect(() => {
    getDocuments(selectedCat).then(setDocuments);
  }, [selectedCat]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-4">
        <HeaderRunningMotif sectionNumber="bab.11" chapterTitle="layanan informasi • pusat unduh berkas" />
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#17356B]">
          Pusat Unduh Berkas & Dokumen
        </h1>
        <p className="text-gray-600 text-base max-w-3xl leading-relaxed">
          Repository resmi formulir akademik, kalender perkuliahan, borang cuti, dan dokumen administratif Universitas Ichsan Satya.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedCat(undefined)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            selectedCat === undefined 
              ? 'bg-[#17356B] text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Semua Kategori Dokumen
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCat(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              selectedCat === c.id 
                ? 'bg-[#17356B] text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Document Items List */}
      <div className="space-y-4">
        {documents.map((doc) => (
          <div 
            key={doc.id}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00ADF1]/10 text-[#00ADF1] flex items-center justify-center font-bold text-xs flex-shrink-0">
                {doc.fileType}
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-[#17356B]">{doc.title}</h3>
                {doc.description && <p className="text-xs text-gray-600">{doc.description}</p>}
                <div className="flex items-center gap-3 text-[11px] font-mono-code text-gray-400 pt-1">
                  <span>Ukuran: {doc.fileSize}</span>
                  <span>•</span>
                  <span>Diperbarui: {doc.updatedAt}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => alert(`Mengunduh berkas: ${doc.title}`)}
              className="w-full md:w-auto bg-[#17356B] hover:bg-[#00ADF1] text-white font-bold py-2.5 px-5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Berkas</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
