import React, { useState, useRef } from 'react';
import { motion, useSpring } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface MagneticPmbButtonProps {
  onClick: () => void;
  className?: string;
}

export const MagneticPmbButton: React.FC<MagneticPmbButtonProps> = ({ onClick, className = '' }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  // Spring animations for smooth magnetic pull
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const magneticX = useSpring(0, springConfig);
  const magneticY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    
    // Position relative to center for magnetic pull
    const centerX = e.clientX - rect.left - rect.width / 2;
    const centerY = e.clientY - rect.top - rect.height / 2;

    // Apply magnetic force
    magneticX.set(centerX * 0.3);
    magneticY.set(centerY * 0.3);

    // Percentage coordinates for spotlight glow inside button
    const percentX = ((e.clientX - rect.left) / rect.width) * 100;
    const percentY = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPos({ x: percentX, y: percentY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    magneticX.set(0);
    magneticY.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: magneticX,
        y: magneticY,
      }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden bg-[#D9232C] hover:bg-[#b81b23] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center gap-2.5 group cursor-pointer border border-red-500/30 ${className}`}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(120px circle at ${cursorPos.x}% ${cursorPos.y}%, rgba(255, 255, 255, 0.25), transparent 70%)`,
          }}
        />
      )}

      <span className="relative z-10 font-bold tracking-wide">Daftar PMB</span>

      <motion.div
        animate={isHovered ? { x: 3 } : { x: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="relative z-10"
      >
        <ArrowRight className="w-4 h-4 text-white" />
      </motion.div>
    </motion.button>
  );
};
