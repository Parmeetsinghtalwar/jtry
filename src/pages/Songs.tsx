import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Play, Pause, ExternalLink, Music, X, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const songs = [
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    reason: "Because you are perfect to me, in every way imaginable.",
    color: "from-rose to-sky-light",
    audioUrl: "/song/perfect.mp3",
    videoUrl: "/video/IMG_4164.mp4"
  },
  {
    title: "Pehla Nasha",
    artist: "Udit Narayan",
    reason: "First love, new feelings, everything is magical with you.",
    color: "from-sky to-rose",
    audioUrl: "", // No external audio, use video audio
    videoUrl: "/video/pehela-nasha.mp4"
  },
  {
    title: "Maharani",
    artist: "Arpit Bala",
    reason: "Because you are the queen of my world.",
    color: "from-rose-light to-sky",
    audioUrl: "/song/maharani.mp3",
    videoUrl: "/video/maharani.mp4"
  },
  {
    title: "Desi Girl",
    artist: "Vishal & Shekhar",
    reason: "The hottest girl in the world!",
    color: "from-sky-light to-rose",
    audioUrl: "/song/desi-girl.mp3",
    videoUrl: "/video/desi-girl.MOV"
  },
  {
    title: "Kinna Sona",
    artist: "Sunil Kamath",
    reason: "How beautiful you are... I can't look away.",
    color: "from-rose to-sky",
    audioUrl: "/song/kinna-sona.mp3",
    videoUrl: "/video/IMG_9637.mp4"
  },
];

const Songs = () => {
  const [activeSong, setActiveSong] = useState<typeof songs[0] | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Handle play syncing
  useEffect(() => {
    if (activeSong) {
      // Small timeout to ensure DOM is ready
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(e => console.log("Video play failed", e));
        }

        // Only play external audio if it exists
        if (activeSong.audioUrl && audioRef.current) {
          audioRef.current.play().catch(e => console.log("Audio play failed", e));
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeSong]);

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveSong(null);
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8 md:py-12">

        {/* Full Screen Video Overlay */}
        <AnimatePresence>
          {activeSong && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
              onClick={handleClose} // Clicking background closes it
            >
              {/* Container prevents click propagation so video doesn't close on click */}
              <div
                className="relative w-full max-w-4xl max-h-[85vh] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button - Moved down and styled better */}
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 z-30 p-3 bg-black/40 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10 group"
                >
                  <X size={28} className="group-hover:scale-110 transition-transform" />
                </button>

                {/* Video Name Tag - Moved down */}
                <div className="absolute top-6 left-6 z-30 bg-black/40 px-5 py-2 rounded-full text-white/95 font-medium backdrop-blur-md border border-white/10 flex items-center gap-2">
                  <span className="animate-pulse text-rose-400">🎵</span> {activeSong.title}
                </div>

                {/* Video Player */}
                <video
                  ref={videoRef}
                  src={activeSong.videoUrl}
                  className="w-full h-full max-h-[85vh] object-contain" // object-contain ensures full video is visible
                  playsInline
                  loop
                  muted={!!activeSong.audioUrl}
                />

                {/* Audio Player */}
                {activeSong.audioUrl && (
                  <audio
                    ref={audioRef}
                    src={activeSong.audioUrl}
                    loop
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Header */}
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brown mb-4">
              Songs That Remind Me of You <span className="text-gold">🎶</span>
            </h1>
            <p className="text-brown-light text-lg md:text-xl max-w-2xl mx-auto">
              Every melody carries a piece of our love story.
            </p>
          </div>
        </ScrollReveal>

        {/* Song Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {songs.map((song, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="romantic-card overflow-hidden hover-lift tap-pulse group transition-all duration-300">
                {/* Gradient header */}
                <div className={`h-2 bg-gradient-to-r ${song.color}`} />

                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Music icon with glow */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-golden flex items-center justify-center shadow-warm group-hover:animate-pulse-glow transition-all">
                      <Music className="text-primary-foreground" size={24} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-xl md:text-2xl text-brown truncate">
                        {song.title}
                      </h3>
                      <p className="text-muted-foreground font-medium">
                        {song.artist}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-brown-light italic leading-relaxed">
                    "{song.reason}"
                  </p>

                  {/* Play button */}
                  <div className="mt-5 flex gap-3">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => setActiveSong(song)}
                      className="flex-1 touch-friendly bg-rose-500 hover:bg-rose-600 text-white transition-all shadow-md"
                    >
                      <Video size={16} className="mr-2" />
                      Watch & Listen
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Button */}
        <ScrollReveal delay={600}>
          <div className="text-center mt-12 md:mt-16">
            <Link to="/photos">
              <Button
                size="lg"
                className="touch-friendly bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm hover-lift tap-pulse font-serif text-lg"
              >
                Next: Photos 📸
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </PageWrapper>
  );
};

export default Songs;
