import { ReactNode, useEffect, useState } from 'react';
import Navigation from './Navigation';
import FloatingPetals from './FloatingPetals';

interface PageWrapperProps {
  children: ReactNode;
  showNav?: boolean;
  className?: string;
}

const PageWrapper = ({ children, showNav = true, className = '' }: PageWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-sunset relative ${className}`}>
      <FloatingPetals />
      
      {showNav && <Navigation />}
      
      <main 
        className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } ${showNav ? 'pt-0 md:pt-20 pb-24 md:pb-8' : ''}`}
      >
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;
