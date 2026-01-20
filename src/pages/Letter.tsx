import { useState, useRef, useEffect } from 'react';
import PageWrapper from '@/components/PageWrapper';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

const Letter = () => {
  const [revealStage, setRevealStage] = useState(0); // 0: Hidden, 1: Video, 2: Final Message
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [finalSeq, setFinalSeq] = useState(0); // 0: Init, 1: TereBin, 2: Video, 3: Bidi
  const [slideIndex, setSlideIndex] = useState(0); // For slideshow
  const [started, setStarted] = useState(false); // For audio autoplay policy

  // Refs for media control
  const tereBinRef = useRef<HTMLAudioElement | null>(null);
  const bidiRef = useRef<HTMLAudioElement | null>(null);
  const finalVideoRef = useRef<HTMLVideoElement | null>(null);
  const letterSongRef = useRef<HTMLAudioElement | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null); // Voice recording

  // Auto-play letter song AND voice when page loads
  useEffect(() => {
    if (letterSongRef.current) {
      letterSongRef.current.volume = 0.4; // Lower background music volume
      letterSongRef.current.play().catch(e => console.log("Letter song autoplay blocked", e));
    }
    if (voiceRef.current) {
      voiceRef.current.volume = 1.0; // Full volume for voice
      voiceRef.current.play().catch(e => console.log("Voice autoplay blocked", e));
    }
  }, []);

  // Stop letter song AND voice when entering final sequence
  useEffect(() => {
    if (revealStage === 2) {
      if (letterSongRef.current) {
        letterSongRef.current.pause();
        letterSongRef.current.currentTime = 0;
      }
      if (voiceRef.current) {
        voiceRef.current.pause();
        voiceRef.current.currentTime = 0;
      }
    }
  }, [revealStage]);

  const handleReveal = () => {
    setShowConfetti(true);
    setShowBalloons(true);
    setTimeout(() => {
      setRevealStage(1);
    }, 300);
    setTimeout(() => {
      setShowConfetti(false);
      setShowBalloons(false);
    }, 6000); // Balloons take longer to float up
  };

  const handleFinal = () => {
    setRevealStage(2);
    setFinalSeq(1); // Start Sequence
    // Optional: More confetti for final?
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Slideshow Logic for Phase 1
  useEffect(() => {
    if (finalSeq === 1) {
      const interval = setInterval(() => {
        setSlideIndex(prev => (prev === 0 ? 1 : 0));
      }, 3000); // Switch image every 3 seconds
      return () => clearInterval(interval);
    }
  }, [finalSeq]);

  return (
    <>
      {/* FULLSCREEN FINAL SEQUENCE OVERLAY - Rendered at top level for true fullscreen */}
      {revealStage === 2 && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden" style={{ width: '100vw', height: '100vh', top: 0, left: 0 }}>
          {/* Phase 1: Tere Bin + Smooth Crossfade Slideshow */}
          {finalSeq === 1 && (
            <div className="relative w-full h-full">
              <audio
                ref={tereBinRef}
                src="/final/tere-bin.mp3"
                autoPlay
                onEnded={() => setFinalSeq(2)}
              />

              {/* Fullscreen Image Container with Crossfade */}
              <div className="absolute inset-0 w-full h-full">
                {/* Image 1 */}
                <img
                  src="/final/final1.jpg"
                  className="absolute inset-0 w-full h-full object-contain animate-crossfade"
                  style={{ animationDelay: '0s' }}
                  alt="Memory 1"
                />
                {/* Image 2 - Offset animation for crossfade effect */}
                <img
                  src="/final/final2.jpg"
                  className="absolute inset-0 w-full h-full object-contain animate-crossfade"
                  style={{ animationDelay: '3s' }}
                  alt="Memory 2"
                />
              </div>

              {/* Cute "I Love You" Overlay Box */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md rounded-3xl px-12 py-8 shadow-2xl border-4 border-rose-400 animate-pulse">
                  <p className="font-serif text-5xl md:text-7xl text-rose-600 font-bold text-center drop-shadow-lg">
                    I LOVE YOU
                  </p>
                  <div className="flex justify-center gap-3 mt-4">
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '0s' }}>❤️</span>
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>💕</span>
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>❤️</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Phase 2: Video Final 3 - Fullscreen */}
          {finalSeq === 2 && (
            <div className="w-full h-full flex items-center justify-center bg-black">
              <video
                ref={finalVideoRef}
                src="/final/final3.mp4"
                autoPlay
                className="w-full h-full object-contain"
                onEnded={() => setFinalSeq(3)}
              />
            </div>
          )}

          {/* Phase 3: Bidi Song + Final4 Image - FULL PARTY MODE! 🎉 */}
          {finalSeq === 3 && (
            <div className="relative w-full h-full bg-black animate-disco-bg overflow-hidden">
              <audio
                ref={bidiRef}
                src="/final/bidi.mp3"
                autoPlay
                loop
              />

              {/* Disco Light Beams */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-pink-500/50 via-transparent to-transparent rotate-12 animate-pulse" />
                <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-cyan-400/50 via-transparent to-transparent -rotate-12 animate-pulse" style={{ animationDelay: '0.3s' }} />
                <div className="absolute top-0 left-3/4 w-1 h-full bg-gradient-to-b from-yellow-400/50 via-transparent to-transparent rotate-6 animate-pulse" style={{ animationDelay: '0.6s' }} />
              </div>

              {/* Floating Balloons 🎈 */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={`balloon-${i}`}
                    className="absolute text-5xl md:text-6xl animate-balloon-rise"
                    style={{
                      left: `${5 + Math.random() * 90}%`,
                      animationDelay: `${Math.random() * 4}s`,
                      animationDuration: `${8 + Math.random() * 4}s`,
                    }}
                  >
                    {['🎈', '🎊', '🎉', '🪩', '⭐'][i % 5]}
                  </div>
                ))}
              </div>

              {/* Confetti Rain 🎊 */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={`confetti-${i}`}
                    className="absolute w-3 h-3 rounded-full animate-confetti-fall"
                    style={{
                      left: `${Math.random() * 100}%`,
                      backgroundColor: ['#ff0080', '#00ffff', '#ffff00', '#ff00ff', '#00ff00', '#ff8000'][i % 6],
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>

              {/* Sparkle Emojis ✨ */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <span
                    key={`sparkle-${i}`}
                    className="absolute text-4xl animate-sparkle"
                    style={{
                      left: `${10 + (i * 12)}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  >
                    ✨
                  </span>
                ))}
              </div>

              {/* Fullscreen Final Image with Disco Effect */}
              <img
                src="/final/final4.jpg"
                className="absolute inset-0 w-full h-full object-contain animate-disco"
                alt="Final Celebration"
              />

              {/* Close Button (X) */}
              <button
                onClick={() => {
                  if (bidiRef.current) bidiRef.current.pause();
                  setRevealStage(1);
                  setFinalSeq(0);
                }}
                className="absolute top-6 right-6 z-50 p-4 bg-black/60 hover:bg-red-500 text-white rounded-full transition-all backdrop-blur-md border-2 border-white/30 hover:border-red-400 group"
              >
                <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Pause/Play Button */}
              <button
                onClick={() => {
                  if (bidiRef.current) {
                    if (bidiRef.current.paused) {
                      bidiRef.current.play();
                    } else {
                      bidiRef.current.pause();
                    }
                  }
                }}
                className="absolute top-6 left-6 z-50 p-4 bg-black/60 hover:bg-purple-500 text-white rounded-full transition-all backdrop-blur-md border-2 border-white/30 hover:border-purple-400 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform block">🎵</span>
              </button>

              {/* Happy Birthday Overlay with Disco Style */}
              <div className="absolute inset-0 flex items-end justify-center pb-20 pointer-events-none">
                <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl px-12 py-6 shadow-2xl animate-bounce border-4 border-white/50">
                  <h2 className="text-white font-serif text-5xl md:text-7xl font-bold text-center drop-shadow-2xl">
                    🎉 Happy Birthday! 🎉
                  </h2>
                  <p className="text-white/90 text-center mt-2 text-xl">🪩 Party Time! 🪩</p>
                </div>
              </div>

              {/* Disco Ball Emoji */}
              <div className="absolute top-20 left-1/2 -translate-x-1/2 text-8xl animate-bounce pointer-events-none">
                🪩
              </div>
            </div>
          )}
        </div>
      )}

      {/* Start Screen Overlay for Audio Policy */}
      {!started && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center">
          <div className="text-center">
            <Button
              onClick={() => {
                setStarted(true);
                // Try playing audio immediately on click
                if (letterSongRef.current) {
                  letterSongRef.current.volume = 0.4;
                  letterSongRef.current.play().catch(console.error);
                }
                if (voiceRef.current) {
                  voiceRef.current.volume = 1.0;
                  voiceRef.current.play().catch(console.error);
                }
              }}
              className="bg-rose-500 hover:bg-rose-600 text-white text-xl px-8 py-6 rounded-full shadow-glow hover:scale-105 transition-transform animate-pulse"
            >
              💌 Open Letter
            </Button>
            <p className="text-white/60 mt-4 text-sm">Tap to listen</p>
          </div>
        </div>
      )}

      <PageWrapper>
        {/* ... existing content ... */}
        {/* We need to make sure the PageWrapper content is only fully interactive/visible or just accessible after start, but for now overlay handles it */}
        <div className="container mx-auto px-4 py-8 md:py-12 relative">
          {/* Confetti effect */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full animate-confetti-fall"
                  style={{
                    left: `${Math.random() * 100}%`,
                    backgroundColor: ['hsl(var(--sky-blue))', 'hsl(var(--rose-pink))', 'hsl(var(--sky-blue-light))', 'hsl(var(--blush-pink))'][i % 4],
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Balloon effect */}
          {showBalloons && (
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <div
                  key={`balloon-${i}`}
                  className="absolute text-6xl animate-balloon-rise opacity-90"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    animationDelay: `${Math.random() * 1}s`,
                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                  }}
                >
                  🎈
                </div>
              ))}
            </div>
          )}

          {/* Hero Header */}
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-12">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brown mb-4">
                Happy Birthday My Love <span className="text-accent animate-pulse">❤️</span>
              </h1>
              <p className="text-brown-light text-lg md:text-xl">
                A letter from my heart to yours
              </p>
            </div>
          </ScrollReveal>

          {/* Letter Card */}
          <ScrollReveal delay={200}>
            <div className="max-w-3xl mx-auto">
              <div className="paper-texture rounded-3xl shadow-warm p-8 md:p-12 relative overflow-hidden">
                {/* Decorative corner flourishes */}
                <div className="absolute top-4 left-4 text-gold/40 text-3xl">❦</div>
                <div className="absolute top-4 right-4 text-gold/40 text-3xl transform scale-x-[-1]">❦</div>
                <div className="absolute bottom-4 left-4 text-gold/40 text-3xl transform scale-y-[-1]">❦</div>
                <div className="absolute bottom-4 right-4 text-gold/40 text-3xl transform scale-[-1]">❦</div>

                {/* Floral top border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-golden opacity-60" />

                {/* Letter content */}
                <div className="space-y-6 font-serif text-brown leading-relaxed">
                  <p className="text-lg md:text-xl">My Dearest Love,</p>

                  <p className="text-base md:text-lg">
                    happy jui day abhut zada tezz time khtm horha hai hyderbad me bus time kabhi dhera hota hiaa jb yeh lagta hia ki kitna time hogya tujhse mile tujhe pata hai bahut mushkil hai yaha rehna bilkul accha nhi lgta bahut chizer sikhne ko milrhi hai pr kya karu bus yhi koshish me hu ki tujhse jaldi jaldi paisa kama kr bike pr betha ke chand pr lejau tu bahut mehenat krti aai hai tujhse lgta hai result accha nhi milega pr baba tu marathod me dor rhi hai please thodi thand rakh bahut import imp chize bacchi hai abhi upper kya hai teri mujhse ek sal hi to badi hai itna t tension mt le thik hai happpy birthday ii love you tere bin shi me nhi lgta nhi acccha lgta maza nhi ata ladkiyo me sb tu krti hai na ladkiya pasand na ladke bus juhi or ek koi sugar mommy bus baccha i love you happy birthday bahut moti or abadi horhi hai sab accha hoga tera baba i love you ab niche english me dangerous ka gpt ka likh love letter hai
                  </p>

                  <p className="text-base md:text-lg">
                    From the moment you came into my life, everything became more colorful,
                    more meaningful, more wonderful. Your smile is the sunrise that greets my every morning,
                    and your laughter is the melody that plays in my heart.
                  </p>

                  <p className="text-base md:text-lg">
                    You are not just my partner, but my best friend, my confidant, my safe haven.
                    In your eyes, I found my home. In your arms, I found my peace.
                    In your heart, I found my forever.
                  </p>

                  <p className="text-base md:text-lg">
                    Today, as we celebrate you, I want to thank you for every moment,
                    every memory, every joy you've brought into my life.
                    You deserve all the happiness in the world, and I promise to spend
                    every day trying to give you just that.
                  </p>

                  <p className="text-base md:text-lg">
                    Happy Birthday, my beautiful love. May this year bring you
                    endless blessings, boundless joy, and all your dreams coming true.
                  </p>

                  <div className="pt-6">
                    <p className="text-lg md:text-xl italic text-brown-light">
                      — Yours Always, Forever and Ever
                    </p>
                  </div>
                </div>

                {/* Decorative seal */}
                <div className="flex justify-center mt-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-golden flex items-center justify-center shadow-warm">
                    <Heart className="text-primary-foreground" size={28} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Surprise Reveal Section */}
          <ScrollReveal delay={400}>
            <div className="max-w-2xl mx-auto mt-12 text-center pb-12">

              {/* Stage 0: Initial Button */}
              {revealStage === 0 && (
                <Button
                  size="lg"
                  onClick={handleReveal}
                  className="touch-friendly bg-gradient-golden hover:opacity-90 text-primary-foreground shadow-glow hover-lift tap-pulse font-serif text-lg md:text-xl px-8 py-6 animate-pulse-glow"
                >
                  <Sparkles className="mr-2" size={20} />
                  One Last Surprise... 🎁
                </Button>
              )}

              {/* Stage 1+: Video Section */}
              {revealStage >= 1 && (
                <div className="space-y-8">
                  {/* Dog Video Section */}
                  {revealStage === 1 && (
                    <div className="animate-bloom paper-texture rounded-3xl shadow-warm p-6 md:p-8 border-2 border-gold/20">
                      <h3 className="font-serif text-2xl text-brown mb-4 text-center">
                        A Special Memory 🐶
                      </h3>
                      <div className="rounded-2xl overflow-hidden shadow-inner border-4 border-white/50 bg-black/5 relative group">
                        <video
                          controls
                          autoPlay
                          className="w-full rounded-xl shadow-lg"
                          style={{ maxHeight: '80vh' }}
                          src="/dog/dog.mp4"
                          playsInline
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  )}

                  {/* Stage 1 Only: "Now Final" Button */}
                  {revealStage === 1 && (
                    <div className="animate-fade-in-up">
                      <Button
                        size="lg"
                        onClick={handleFinal}
                        className="touch-friendly bg-rose-500 hover:bg-rose-600 text-white shadow-warm hover-lift tap-pulse font-serif text-lg px-8 py-4"
                      >
                        <Heart className="mr-2" size={20} fill="currentColor" />
                        Now Final Message ❤️
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Final decorative element */}
          <div className="text-center mt-12 opacity-50">
            <span className="text-gold text-2xl">✿</span>
            <span className="mx-2 text-coral text-xl">❀</span>
            <span className="text-gold-light text-2xl">✿</span>
          </div>
        </div>
      </PageWrapper>

      {/* Letter Background Song */}
      <audio
        ref={letterSongRef}
        src="/letter/letter-song.mp3"
        loop
        preload="auto"
      />

      {/* Voice Recording */}
      <audio
        ref={voiceRef}
        src="/letter/voice.m4a"
        preload="auto"
      />
    </>
  );
};

export default Letter;
