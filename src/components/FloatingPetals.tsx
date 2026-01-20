import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  type: 'petal' | 'leaf';
}

const FloatingPetals = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generatePetals = () => {
      const newPetals: Petal[] = [];
      const petalCount = window.innerWidth < 768 ? 12 : 20;

      for (let i = 0; i < petalCount; i++) {
        newPetals.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 10,
          duration: 10 + Math.random() * 8,
          size: 12 + Math.random() * 16,
          opacity: 0.4 + Math.random() * 0.4,
          type: Math.random() > 0.3 ? 'petal' : 'leaf',
        });
      }
      setPetals(newPetals);
    };

    generatePetals();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            opacity: petal.opacity,
          }}
        >
          {petal.type === 'petal' ? (
            <svg
              width={petal.size}
              height={petal.size}
              viewBox="0 0 24 24"
              fill="none"
              className="text-coral"
            >
              <ellipse
                cx="12"
                cy="12"
                rx="8"
                ry="12"
                fill="currentColor"
                opacity="0.8"
              />
              <ellipse
                cx="12"
                cy="12"
                rx="5"
                ry="9"
                fill="hsl(var(--blush-pink))"
                opacity="0.5"
              />
            </svg>
          ) : (
            <svg
              width={petal.size}
              height={petal.size}
              viewBox="0 0 24 24"
              fill="none"
              className="text-gold-light"
            >
              <path
                d="M12 2C12 2 4 8 4 14C4 18 8 22 12 22C16 22 20 18 20 14C20 8 12 2 12 2Z"
                fill="currentColor"
                opacity="0.7"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingPetals;
