interface FloralBorderProps {
  position: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const FloralBorder = ({ position, className = '' }: FloralBorderProps) => {
  const isHorizontal = position === 'top' || position === 'bottom';

  const positionClasses = {
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
    left: 'top-0 bottom-0 left-0',
    right: 'top-0 bottom-0 right-0',
  };

  const Flower = ({ size = 24, rotation = 0 }: { size?: number; rotation?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className="text-gold-light"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <circle cx="16" cy="16" r="3" fill="hsl(var(--rose-pink))" />
      {[0, 72, 144, 216, 288].map((angle) => (
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
  );

  const Leaf = ({ size = 16, flip = false }: { size?: number; flip?: boolean }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="text-gold"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <path
        d="M12 2C12 2 5 7 5 12C5 17 9 20 12 22C15 20 19 17 19 12C19 7 12 2 12 2Z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );

  if (isHorizontal) {
    return (
      <div className={`absolute ${positionClasses[position]} h-16 pointer-events-none overflow-hidden ${className}`}>
        <div className="flex items-center justify-around h-full">
          <Leaf flip />
          <Flower size={20} rotation={15} />
          <Leaf />
          <Flower size={28} />
          <Leaf flip />
          <Flower size={20} rotation={-10} />
          <Leaf />
          <Flower size={24} rotation={5} />
          <Leaf flip />
        </div>
      </div>
    );
  }

  return (
    <div className={`absolute ${positionClasses[position]} w-12 pointer-events-none overflow-hidden ${className}`}>
      <div className="flex flex-col items-center justify-around h-full py-8">
        <Flower size={20} rotation={-15} />
        <Leaf />
        <Flower size={16} />
        <Leaf flip />
        <Flower size={22} rotation={10} />
        <Leaf />
        <Flower size={18} rotation={-5} />
      </div>
    </div>
  );
};

export default FloralBorder;
