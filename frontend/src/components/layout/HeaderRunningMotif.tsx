import React from 'react';

interface HeaderRunningMotifProps {
  sectionNumber?: string;
  chapterTitle: string;
  className?: string;
}

export const HeaderRunningMotif: React.FC<HeaderRunningMotifProps> = ({ 
  sectionNumber = "bab.01", 
  chapterTitle,
  className = "" 
}) => {
  return (
    <div className={`flex items-center justify-between border-b border-gray-200 pb-2 mb-6 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="font-mono-code text-[11px] text-[#00ADF1] font-semibold tracking-wider lowercase uppercase">
          [{sectionNumber}]
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#17356B]"></span>
        <span className="font-mono-code text-xs text-gray-500 font-medium tracking-wide">
          {chapterTitle}
        </span>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono-code text-gray-400">
        <span>UNIVERSITAS ICHSAN SATYA</span>
        <span>•</span>
        <span>KAMPUS BINTARO</span>
      </div>
    </div>
  );
};
