import { useState, useRef } from 'react';
import PageWrapper from '@/components/PageWrapper';
import ScrollReveal from '@/components/ScrollReveal';
import BalloonPopBackground from '@/components/ui/balloons-pop-background';
import ThumbnailCarousel from '@/components/ui/thumbnail-carousel';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Plane, Play, Pause } from 'lucide-react';

const MapAnimation = () => {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/5] my-8">
      <svg
        viewBox="0 0 400 500"
        className="w-full h-full drop-shadow-xl"
        style={{ filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.1))" }}
      >
        {/* Abstract Map Background - Stylized India Shape approximation needed or just abstract BG */}
        <path
          d="M150,50 Q250,50 300,150 Q350,250 200,450 Q50,250 100,150 Q150,50 150,50 Z"
          fill="hsl(var(--card))"
          stroke="hsl(var(--border))"
          strokeWidth="2"
          className="opacity-50"
        />

        {/* Bhopal Coordinate (Approx relative to abstract shape) */}
        <g transform="translate(180, 200)">
          <circle r="6" fill="hsl(var(--sky-blue))" className="animate-pulse" />
          <circle r="12" fill="hsl(var(--sky-blue))" opacity="0.3" className="animate-ping" />
          <text y="-20" x="0" textAnchor="middle" className="font-serif text-sm fill-foreground font-bold">Bhopal</text>
        </g>

        {/* Hyderabad Coordinate (Approx relative to abstract shape) */}
        <g transform="translate(190, 320)">
          <circle r="6" fill="hsl(var(--rose-pink))" className="animate-pulse" />
          <circle r="12" fill="hsl(var(--rose-pink))" opacity="0.3" className="animate-ping" style={{ animationDelay: "1s" }} />
          <text y="25" x="0" textAnchor="middle" className="font-serif text-sm fill-foreground font-bold">Hyderabad</text>
        </g>

        {/* Path Line */}
        <path
          d="M180,200 Q160,260 190,320"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeDasharray="8 4"
          className="opacity-60"
        />

        {/* Moving Plane/Object */}
        <g>
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M180,200 Q160,260 190,320"
          >
            <mpath href="#path" />
          </animateMotion>
          <circle r="4" fill="hsl(var(--gold))" />
        </g>
      </svg>

      {/* Floating Plane Icon Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <Plane className="w-8 h-8 text-sky-500 animate-float opacity-80" />
      </div>
    </div>
  );
};

const Journey = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <PageWrapper>
      {/* Balloon Background */}
      <BalloonPopBackground />

      {/* Unique Song Audio */}
      <audio ref={audioRef} src="/song/rab.mp3" loop />

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl md:text-7xl text-rose-600 mb-6 drop-shadow-sm">
              Happy Jui Day
              <span className="inline-block ml-3 animate-bounce">🎈</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light italic">
              Happy birthday chotu sb accha hoga
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Map Section */}
          <ScrollReveal delay={200}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
              <h2 className="text-center font-serif text-2xl mb-4 text-sky-700">From Me to You</h2>
              <MapAnimation />
              <div className="text-center mt-4 space-y-2">
                <div className="flex items-center justify-center gap-2 text-sky-600">
                  <MapPin size={20} />
                  <span>Bhopal</span>
                  <span className="mx-2">--------✈--------</span>
                  <span>Hyderabad</span>
                  <MapPin size={20} className="text-rose-500" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Message Section */}
          <ScrollReveal delay={400}>
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100 transform rotate-1 hover:rotate-0 transition-transform duration-300 relative">

                {/* Visual Play Button in corner */}
                <button
                  onClick={togglePlay}
                  className="absolute top-6 right-6 p-3 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 hover:scale-110 transition-all shadow-md z-10"
                  aria-label={isPlaying ? "Pause Song" : "Play Song"}
                >
                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                </button>

                <h3 className="font-serif text-3xl text-rose-600 mb-6 flex items-center gap-3">
                  <Heart className="fill-rose-500 text-rose-500 animate-pulse" />
                  Wish I Was There...
                </h3>
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-serif">
                  "Akh band vhi hu..." <br />

                </p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-sky-100 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <h3 className="font-serif text-2xl text-sky-700 mb-4">
                  More Things to Say...
                </h3>
                <p className="text-slate-600 leading-relaxed italic">
                  "“你的笑容比任何航班都能更快地照亮我的世界。今天的一切都属于你，我的爱人。尽情吃蛋糕，开怀大笑，直到肚子疼，要知道我每时每刻都在想念你。”"
                </p>
                <div className="mt-6 flex justify-end">
                  <span className="font-handwriting text-2xl text-rose-500">- Yours Forever</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Photo Memories Section */}
        <ScrollReveal delay={500}>
          <div className="mt-16">
            <h2 className="text-center font-serif text-4xl text-rose-600 mb-8 drop-shadow-sm">
              Our Memories 📸
            </h2>
            <ThumbnailCarousel images={[
              { id: 1, url: '/journey/IMG_0523.jpg', title: 'Journey 1' },
              { id: 2, url: '/journey/IMG_1111.PNG', title: 'Journey 2' },
              { id: 3, url: '/journey/IMG_1199.PNG', title: 'Journey 3' },
              { id: 4, url: '/journey/IMG_4923.jpg', title: 'Journey 4' },
              { id: 5, url: '/journey/IMG_4927.jpg', title: 'Journey 5' },
              { id: 6, url: '/journey/IMG_5141.jpg', title: 'Journey 6' },
              { id: 7, url: '/journey/IMG_5894.jpg', title: 'Journey 7' },
            ]} />
          </div>
        </ScrollReveal>

        {/* Navigation to Next Page */}
        <ScrollReveal delay={600}>
          <div className="text-center mt-16">
            <Link to="/songs">
              <Button
                size="lg"
                className="bg-gradient-to-r from-sky-400 to-rose-400 hover:from-sky-500 hover:to-rose-500 text-white rounded-full px-12 py-6 text-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                Continue Our Journey ➡️
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </PageWrapper>
  );
};

export default Journey;
