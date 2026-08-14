import React, { useState, useEffect } from 'react';
import { mockPopupAnnouncement } from '../../lib/api/mockData';
import { X, ArrowRight, Sparkles } from 'lucide-react';

interface PopupModalProps {
  onNavigate: (path: string) => void;
}

export const PopupModal: React.FC<PopupModalProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if dismissed in session
    const dismissed = sessionStorage.getItem('uis_popup_dismissed');
    if (!dismissed && mockPopupAnnouncement.isActive) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('uis_popup_dismissed', 'true');
  };

  const handleCta = () => {
    handleClose();
    onNavigate(mockPopupAnnouncement.ctaLink);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition focus:outline-none"
          aria-label="Tutup Pengumuman"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-48 sm:h-56 bg-gradient-to-tr from-[#17356B] to-[#00ADF1]">
          <img 
            src={mockPopupAnnouncement.image} 
            alt={mockPopupAnnouncement.title} 
            className="w-full h-full object-cover mix-blend-overlay opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9232C] text-white text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Info PMB Terkini
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <h3 className="font-display font-bold text-xl text-[#17356B] leading-snug">
            {mockPopupAnnouncement.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {mockPopupAnnouncement.description}
          </p>
          
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button 
              onClick={handleCta}
              className="w-full sm:flex-1 bg-[#D9232C] hover:bg-[#b81b23] text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2"
            >
              <span>{mockPopupAnnouncement.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={handleClose}
              className="w-full sm:w-auto text-gray-500 hover:text-gray-800 text-xs font-semibold py-2.5 px-4 rounded-xl transition"
            >
              Nanti Saja
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
