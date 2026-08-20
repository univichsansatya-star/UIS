import React from 'react';
import uisOfficialLogoImg from '../../assets/images/logo-uis-150x150.png';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'white';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full' }) => {
  const isWhite = variant === 'white';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* UIS Official Logo Image */}
      <div className={`relative ${variant === 'compact' ? 'w-10 h-10' : 'w-11 h-11 sm:w-13 sm:h-13'} flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-105 rounded-lg bg-white/90 p-1 shadow-sm border border-gray-100`}>
        <img 
          src={uisOfficialLogoImg} 
          alt="Universitas Ichsan Satya Logo" 
          className="h-full w-auto object-contain rounded"
          referrerPolicy="no-referrer"
        />
      </div>

      {variant !== 'compact' && (
        <div className="flex flex-col justify-center leading-tight">
          {/* Baris 1: UNIVERSITAS */}
          <span className={`text-[#17356B] ${isWhite ? 'text-white' : ''} font-extrabold tracking-tight text-sm sm:text-base leading-snug font-sans uppercase`}>
            UNIVERSITAS
          </span>
          {/* Baris 2: ICHSAN SATYA */}
          <span className={`text-[#00ADF1] font-black tracking-wider text-xs sm:text-sm leading-snug uppercase font-sans flex items-center gap-1.5`}>
            ICHSAN SATYA
          </span>
        </div>
      )}
    </div>
  );
};


