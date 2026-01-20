import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GiftBox from '@/components/GiftBox';
import FloatingPetals from '@/components/FloatingPetals';
import FloralBorder from '@/components/FloralBorder';
import BalloonPopBackground from '@/components/ui/balloons-pop-background';
import ThumbnailCarousel from '@/components/ui/thumbnail-carousel';
import { Button } from '@/components/ui/button';
import { MapPin, Heart, Plane } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const MapAnimation = () => {
  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[4/5] my-6">
      <svg
        viewBox="0 0 400 500"
        className="w-full h-full drop-shadow-xl"
        style={{ filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.1))" }}
      >
        {/* Abstract Map Background */}
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
          className="opacity-60 animate-pulse"
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

// Heartfelt messages with matching photos
// Heartfelt messages with matching photos
const heartfeltMessages = [
  {
    text: "Sorry i was not there...",
    image: "/gift-compressed/PHOTO-2022-09-27-19-08-32.jpg"
  },
  {
    text: "pr eska mtlb yeh nhi hai ki i am not thinking about you",
    image: "/gift-compressed/PHOTO-2022-10-16-00-07-18.jpg"
  },
  {
    text: "tu bahut special hai ❤️",
    image: "/gift-compressed/PHOTO-2022-11-29-19-41-11.jpg"
  },
  {
    text: "itna time hogya pr still dimag khrab krdeti hai tane marke 😅",
    image: "/gift-compressed/PHOTO-2022-12-10-13-07-56.jpg"
  },
  {
    text: "tu itni special hai ki yeh tujhe bilkul samajh nhi ata",
    image: "/gift-compressed/PHOTO-2023-01-21-20-57-29.jpg"
  },
  {
    text: "kabhi kabhi samajh nhi ata ki yeh idhar mere se kaise fhas gye...",
    image: "/gift-compressed/PHOTO-2023-03-12-21-59-15.jpg"
  },
  {
    text: "ya fhir bola jae mujhse kaise fhasa liya 😏❤️",
    image: "/gift-compressed/PHOTO-2023-08-12-23-28-41.jpg"
  },
  // Added 25 photos for custom messages
  {
    text: "pagal kahiki",
    image: "/gift-compressed/PHOTO-2022-09-30-20-02-40.jpg"
  },
  {
    text: "100 pagal",
    image: "/gift-compressed/PHOTO-2022-10-08-13-11-38.jpg"
  },
  {
    text: "lub",
    image: "/gift-compressed/PHOTO-2022-10-09-18-03-38.jpg"
  },
  {
    text: "daru",
    image: "/gift-compressed/PHOTO-2022-10-25-01-22-48.jpg"
  },
  {
    text: "Moti ❤️",
    image: "/gift-compressed/PHOTO-2022-11-05-23-38-45.jpg"
  },
  {
    text: "Moti ❤️",
    image: "/gift-compressed/PHOTO-2022-11-27-00-53-03.jpg"
  },
  {
    text: "Moti ❤️",
    image: "/gift-compressed/PHOTO-2022-12-05-23-10-07.jpg"
  },
];

// 25 Selected memory photos to show after messages


const GiftOpening = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: Initial, 1: Messages, 2: Gift, 3: Celebration
  const [showStartButton, setShowStartButton] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0); // For sequential messages
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Start sequence
    setTimeout(() => {
      setStep(1); // Show text
      attemptPlay();
    }, 1000);
  }, []);

  // Sequential message reveal effect
  useEffect(() => {
    if (step === 1) {
      const messageInterval = setInterval(() => {
        setMessageIndex(prev => {
          if (prev < heartfeltMessages.length - 1) {
            return prev + 1;
          } else {
            // All messages shown, move to gift step
            clearInterval(messageInterval);
            setTimeout(() => setStep(2), 3000);
            return prev;
          }
        });
      }, 5000); // Show each message for 5 seconds

      return () => clearInterval(messageInterval);
    }
  }, [step]);

  const attemptPlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // If autoplay fails, show start button
        setShowStartButton(true);
      });
    }
  };

  const handleStartInteraction = () => {
    attemptPlay();
    setShowStartButton(false);
  };

  const handleGiftOpen = () => {
    // Transition to the celebration content
    setTimeout(() => {
      setStep(3);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-sunset relative overflow-x-hidden">
      {/* Interaction Overlay for Autoplay Policy */}
      {showStartButton && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={handleStartInteraction}>
          <div className="bg-white/90 p-6 rounded-2xl shadow-xl animate-pulse cursor-pointer">
            <p className="text-xl font-serif text-rose-500">Tap anywhere to start ✨</p>
          </div>
        </div>
      )}

      {/* Floating petals (Only show in early steps, balloons take over later) */}
      {step < 3 && <FloatingPetals />}

      {/* Balloon Background for Step 3 */}
      {step === 3 && <BalloonPopBackground />}

      {/* Floral borders */}
      <FloralBorder position="top" className="opacity-60" />
      <FloralBorder position="bottom" className="opacity-60" />

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold-glow/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-coral/20 rounded-full blur-3xl" />

      {/* Main content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 py-8">

        {/* Step 1: Sequential Heartfelt Messages with Photos */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${step === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}>
          <div className="max-w-3xl mx-auto px-6">
            {/* Message Card with Photo */}
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-rose-200 relative overflow-hidden">
              {/* Decorative hearts */}
              <div className="absolute top-4 right-4 text-3xl opacity-50 animate-pulse">💕</div>
              <div className="absolute bottom-4 left-4 text-3xl opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}>❤️</div>



              {/* Photo Memory */}
              <div className="mb-6 overflow-hidden rounded-2xl shadow-lg">
                <img
                  key={`img-${messageIndex}`}
                  src={heartfeltMessages[messageIndex].image}
                  alt={`Memory ${messageIndex + 1}`}
                  className="w-full h-64 md:h-96 object-cover animate-fade-in-slow"
                />
              </div>

              {/* Message text with fade effect */}
              <div className="min-h-[80px] flex items-center justify-center">
                <p
                  key={`text-${messageIndex}`}
                  className="font-serif text-xl md:text-3xl text-rose-600 text-center leading-relaxed animate-fade-in-slow px-4"
                >
                  {heartfeltMessages[messageIndex].text}
                </p>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mt-6">
                {heartfeltMessages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === messageIndex
                      ? 'bg-rose-500 scale-125'
                      : idx < messageIndex
                        ? 'bg-rose-300'
                        : 'bg-gray-200'
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Subtle hint */}
            <p className="text-center text-rose-400 mt-6 text-sm animate-pulse">
              🎵 Listen and feel... 🎵
            </p>
          </div>
        </div>

        {/* Step 2: Gift Box */}
        <div className={`flex flex-col items-center transition-all duration-1000 absolute ${step === 2 ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-10 pointer-events-none absolute'
          }`}>
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-4 leading-tight drop-shadow-sm">
              A Surprise For You
              <span className="inline-block ml-2 animate-pulse">❤️</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground italic">
              Open your gift to begin
            </p>
          </div>
          <GiftBox onOpen={handleGiftOpen} />
        </div>



        {/* Step 3: Celebration Content (Map, Balloons, Messages) */}
        <div className={`w-full max-w-5xl mx-auto transition-all duration-1000 ${step === 3 ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-20 pointer-events-none absolute'
          }`}>

          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl md:text-7xl text-rose-600 mb-6 drop-shadow-sm animate-pulse">
              Happy Jui Day! 🎈
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light italic">
              Distance means so little when someone means so much.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Map Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 animate-fade-in-up">
              <h2 className="text-center font-serif text-2xl text-sky-700">From Me to You</h2>
              <MapAnimation />
              <div className="flex items-center justify-center gap-2 text-sky-600 text-sm font-medium">
                <MapPin size={16} /> Bhopal ---------✈--------- Hyderabad <MapPin size={16} className="text-rose-500" />
              </div>
            </div>

            {/* Message Cards */}
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-pink-100 transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h3 className="font-serif text-2xl text-rose-600 mb-3 flex items-center gap-2">
                  <Heart className="fill-rose-500 text-rose-500 w-6 h-6 animate-pulse" />
                  Wish I Was There...
                </h3>
                <p className="text-lg text-slate-700 font-serif italic mb-2">
                  "Akh band vhi hu..."
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Even though miles separate us right now, my heart is celebrating right there beside you.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-sky-100 transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <h3 className="font-serif text-xl text-sky-700 mb-3">
                  More Things to Say...
                </h3>
                <p className="text-slate-600 leading-relaxed italic text-sm md:text-base">
                  "Your smile lights up my world faster than any flight could take me to you.
                  Today is all about you, my love. Eat lots of cake and know that I am missing you."
                </p>
                <div className="mt-4 flex justify-end">
                  <span className="font-handwriting text-xl text-rose-500">- Yours Forever</span>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Memories Carousel */}
          <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <h2 className="text-center font-serif text-3xl text-rose-600 mb-6 drop-shadow-sm">
              Our Memories 📸
            </h2>
            <ThumbnailCarousel />
          </div>

          <div className="text-center mt-12 pb-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <Link to="/songs">
              <Button
                size="lg"
                className="bg-gradient-to-r from-sky-400 to-rose-400 hover:from-sky-500 hover:to-rose-500 text-white rounded-full px-10 py-6 text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Explore Our Playlist 🎵
              </Button>
            </Link>
          </div>

        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-50 pointer-events-none">
          <span className="text-gold text-2xl">✿</span>
          <span className="text-coral text-lg">❀</span>
          <span className="text-gold-light text-xl">✿</span>
        </div>
      </div>

      {/* Background music */}
      <audio
        ref={audioRef}
        src="/song/dor.mp3"
        loop
        autoPlay
        onEnded={() => audioRef.current?.play()}
        preload="auto"
      />
    </div>
  );
};

export default GiftOpening;
