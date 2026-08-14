import React, { useState, useEffect } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { getNewsBySlug, getNewsList } from '../../lib/api/newsApi';
import { News } from '../../types';
import { Calendar, User, ArrowLeft, Share2, Tag } from 'lucide-react';

interface BeritaDetailPageProps {
  slug: string;
  onNavigate: (path: string, param?: string) => void;
}

export const BeritaDetailPage: React.FC<BeritaDetailPageProps> = ({ slug, onNavigate }) => {
  const [article, setArticle] = useState<News | null>(null);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const newsItem = await getNewsBySlug(slug);
      setArticle(newsItem);
      const all = await getNewsList();
      setRelatedNews(all.filter(n => n.slug !== slug).slice(0, 3));
      setLoading(false);
    }
    loadData();
  }, [slug]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center font-mono-code text-sm">Memuat berita...</div>;
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#17356B]">Berita Tidak Ditemukan</h2>
        <p className="text-sm text-gray-600">Artikel yang Anda cari tidak dapat ditemukan atau telah dipindahkan.</p>
        <button 
          onClick={() => onNavigate('/berita')}
          className="inline-flex items-center gap-2 bg-[#17356B] text-white text-xs font-bold px-4 py-2 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Berita</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      
      {/* Back Link */}
      <button 
        onClick={() => onNavigate('/berita')}
        className="inline-flex items-center gap-2 text-xs font-mono-code font-bold text-[#00ADF1] hover:text-[#17356B] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Berita & Agenda</span>
      </button>

      {/* Article Header */}
      <div className="space-y-4">
        <span className="inline-block px-3 py-1 rounded-full bg-[#00ADF1]/10 text-[#00ADF1] font-mono-code text-xs font-bold">
          {article.category}
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#17356B] leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono-code text-gray-500 border-y border-gray-200 py-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#00ADF1]" />
            {article.publishedAt}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-[#00ADF1]" />
            Penulis: {article.author}
          </span>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-lg h-72 sm:h-96">
        <img 
          src={article.coverImage} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div 
        className="prose prose-slate max-w-none text-gray-800 text-sm sm:text-base leading-relaxed space-y-4 bg-white p-8 rounded-3xl border border-gray-200"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Share / Footer */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <span className="text-xs font-mono-code text-gray-500">Kategori: {article.category}</span>
        <button className="inline-flex items-center gap-2 text-xs font-bold text-[#17356B] bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition">
          <Share2 className="w-3.5 h-3.5" />
          <span>Bagikan Artikel</span>
        </button>
      </div>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <div className="pt-8 space-y-6">
          <h3 className="font-display font-bold text-xl text-[#17356B]">Berita Terkait Lainnya</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map((rel) => (
              <div 
                key={rel.id} 
                onClick={() => onNavigate('/berita', rel.slug)}
                className="bg-white p-4 rounded-xl border border-gray-200 cursor-pointer hover:shadow-md transition space-y-2"
              >
                <img src={rel.coverImage} alt={rel.title} className="w-full h-32 object-cover rounded-lg" />
                <h4 className="font-bold text-xs text-[#17356B] line-clamp-2">{rel.title}</h4>
                <span className="text-[10px] text-gray-400 font-mono-code block">{rel.publishedAt}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
