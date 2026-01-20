import { Link, useLocation } from 'react-router-dom';
import { Heart, Music, Image, Mail } from 'lucide-react';

const navItems = [
  { path: '/journey', label: 'Journey', icon: Heart },
  { path: '/songs', label: 'Songs', icon: Music },
  { path: '/photos', label: 'Photos', icon: Image },
  { path: '/letter', label: 'Letter', icon: Mail },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-ivory/80 backdrop-blur-md border-b border-border/50 shadow-soft">
        <div className="container mx-auto flex items-center justify-center gap-8 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isActive
                  ? 'bg-primary text-primary-foreground shadow-warm'
                  : 'text-brown hover:bg-secondary hover-lift'
                  }`}
              >
                <Icon size={18} />
                <span className="font-serif font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-ivory/90 backdrop-blur-md border-t border-border/50 shadow-soft safe-area-inset-bottom">
        <div className="flex items-center justify-around py-2 pb-safe">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 tap-pulse min-w-[64px] ${isActive
                  ? 'text-primary'
                  : 'text-brown-light'
                  }`}
              >
                <Icon size={22} className={isActive ? 'animate-pulse-glow' : ''} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
