import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface GiftBoxProps {
  onOpen: () => void;
}

const GiftBox = ({ onOpen }: GiftBoxProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    if (isOpening) return;

    setIsOpening(true);
    setShowBurst(true);



    // Navigate after animation
    setTimeout(() => {
      onOpen();
      navigate('/journey');
    }, 1500);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Golden glow behind gift */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-glow transition-all duration-1000 ${isOpening ? 'scale-150 opacity-100' : 'opacity-60'
            }`}
        />
      </div>

      {/* Light burst effect */}
      {showBurst && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="animate-light-burst w-32 h-32 rounded-full bg-sky-glow opacity-80" />
          {/* Sparkles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-rose-pink rounded-full animate-confetti-fall"
              style={{
                left: `${45 + Math.random() * 10}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${1.5 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Gift Box Container */}
      <button
        onClick={handleOpen}
        disabled={isOpening}
        className={`relative z-10 cursor-pointer transition-all duration-300 ${isOpening ? '' : 'hover:scale-105 active:scale-95'
          } animate-gift-glow`}
      >
        {/* Gift Lid */}
        <div
          className={`relative z-20 transition-all duration-700 ${isOpening ? 'animate-lid-open' : ''
            }`}
          style={{ transformOrigin: 'top center' }}
        >
          {/* Lid Top */}
          <div className="w-44 h-10 md:w-56 md:h-12 rounded-t-lg shadow-lg" style={{ background: 'linear-gradient(to bottom, hsl(var(--sky-blue)), hsl(var(--sky-blue-glow)))' }}>
            {/* Ribbon bow on top */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full transform -rotate-45 shadow-warm" style={{ background: 'linear-gradient(135deg, hsl(var(--rose-pink)) 0%, hsl(var(--blush-pink)) 100%)' }} />
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full transform rotate-45 shadow-warm" style={{ background: 'linear-gradient(135deg, hsl(var(--rose-pink)) 0%, hsl(var(--blush-pink)) 100%)' }} />
            </div>
            {/* Vertical ribbon on lid */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 md:w-8 h-full opacity-90" style={{ background: 'linear-gradient(135deg, hsl(var(--rose-pink)) 0%, hsl(var(--blush-pink)) 100%)' }} />
          </div>
        </div>

        {/* Gift Body */}
        <div className="relative w-40 h-32 md:w-52 md:h-40 rounded-b-lg shadow-xl -mt-1" style={{ background: 'linear-gradient(to bottom, hsl(var(--sky-blue-glow)), hsl(var(--sky-blue)))' }}>
          {/* Horizontal ribbon */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-5 md:h-6 opacity-90" style={{ background: 'linear-gradient(135deg, hsl(var(--rose-pink)) 0%, hsl(var(--blush-pink)) 100%)' }} />
          {/* Vertical ribbon */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 md:w-8 h-full opacity-90" style={{ background: 'linear-gradient(135deg, hsl(var(--rose-pink)) 0%, hsl(var(--blush-pink)) 100%)' }} />

          {/* Decorative flower */}
          <div className="absolute -right-3 -top-2 md:-right-4 md:-top-3">
            <svg width="32" height="32" viewBox="0 0 32 32" className="text-rose-light md:w-10 md:h-10">
              <circle cx="16" cy="16" r="4" fill="hsl(var(--rose-pink))" />
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <ellipse
                  key={angle}
                  cx="16"
                  cy="8"
                  rx="4"
                  ry="6"
                  fill="currentColor"
                  transform={`rotate(${angle} 16 16)`}
                />
              ))}
            </svg>
          </div>

          {/* Light effect inside when opening */}
          {isOpening && (
            <div className="absolute inset-0 bg-gradient-to-t from-sky-glow/50 to-transparent rounded-b-lg animate-fade-in" />
          )}
        </div>
      </button>

      {/* Tap instruction */}
      <p className={`mt-8 text-muted-foreground font-serif text-lg md:text-xl italic transition-opacity duration-500 ${isOpening ? 'opacity-0' : 'opacity-100 animate-pulse'
        }`}>
        Tap to open ✨
      </p>
    </div>
  );
};

export default GiftBox;
