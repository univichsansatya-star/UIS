import React, { useState, useEffect } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { getNewsList } from '../../lib/api/newsApi';
import { News } from '../../types';
import { Calendar, User, Search, ArrowRight, Tag } from 'lucide-react';

interface BeritaPageProps {
  onNavigate: (path: string, param?: string) => void;
}

export const BeritaPage: React.FC<BeritaPageProps> = ({ onNavigate }) => {
  const [news, setNews] = useState<News[]>([]);
  const [category, setCategory] = useState<string>('Semua');
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getNewsList(category, search);
      setNews(data);
      setLoading(false);
    }
    loadData();
  }, [category, search]);

  const categories = ['Semua', 'Akademik', 'Pengumuman', 'Prestasi', 'Kegiatan', 'Penelitian'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-4">
        <HeaderRunningMotif sectionNumber="bab.04" chapterTitle="berita & artikel • pusat informasi uis" />
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#17356B]">
          Berita & Agenda Kampus
        </h1>
        <p className="text-gray-600 text-base max-w-3xl leading-relaxed">
          Kabar terbaru seputar kegiatan akademis, riset ilmiah, wisuda, pengabdian masyarakat, serta pengumuman resmi Universitas Ichsan Satya.
        </p>
      </div>

      {/* Search & Category Filters */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                category === cat 
                  ? 'bg-[#17356B] text-white shadow-md' 
                  : 'bg-[#F6F9FB] text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Cari kata kunci berita..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#00ADF1] transition bg-gray-50"
          />
        </div>
      </div>

      {/* News Grid */}
      {loading ? (
        <div className="text-center py-16 text-gray-500 text-sm font-mono-code">
          Memuat data berita...
        </div>
      ) : news.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-500 border border-gray-200 space-y-2">
          <p className="font-bold text-base text-[#17356B]">Belum ada berita yang sesuai</p>
          <p className="text-xs">Coba ubah kata kunci pencarian atau kategori filter Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <article 
              key={item.id}
              onClick={() => onNavigate('/berita', item.slug)}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={item.coverImage} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#17356B] text-white text-xs font-mono-code font-bold">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs font-mono-code text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#00ADF1]" />
                      {item.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#00ADF1]" />
                      {item.author}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#17356B] group-hover:text-[#00ADF1] transition leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-xs line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <span className="text-xs font-bold text-[#00ADF1] flex items-center gap-1 group-hover:translate-x-1 transition">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
};
