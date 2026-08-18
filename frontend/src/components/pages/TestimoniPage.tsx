import React, { useState, useEffect } from 'react';
import { HeaderRunningMotif } from '../layout/HeaderRunningMotif';
import { getTestimonials } from '../../lib/api/testimonialApi';
import { Testimonial } from '../../types';
import { Quote, GraduationCap, Building } from 'lucide-react';

interface TestimoniPageProps {
  onNavigate: (path: string) => void;
}

export const TestimoniPage: React.FC<TestimoniPageProps> = ({ onNavigate }) => {
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    getTestimonials().then(setItems);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-4">
        <HeaderRunningMotif sectionNumber="bab.13" chapterTitle="alumni • pengalaman & testimoni lulusan" />
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#17356B]">
          Testimoni Lulusan UIS
        </h1>
        <p className="text-gray-600 text-base max-w-3xl leading-relaxed">
          Kisah inspiratif para alumni Universitas Ichsan Satya yang kini berkarir di rumah sakit ternama, industri medis, dan klinik mandiri.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <Quote className="w-10 h-10 text-[#00ADF1]/40" />

              <p className="italic text-gray-700 text-sm leading-relaxed font-sans">
                "{item.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center gap-4">
              <img src={item.photo} alt={item.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#00ADF1]" />
              <div>
                <h4 className="font-bold text-sm text-[#17356B]">{item.name}</h4>
                <p className="text-xs text-[#00ADF1] font-mono-code">Lulusan {item.programName} ({item.graduateYear})</p>
                <p className="text-[11px] text-gray-500 font-semibold">{item.currentJob} — {item.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
