import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  {
    id: 1,
    url: "/assest/Gemini_Generated_Image_a9xw9ya9xw9ya9xw.png",
    caption: "My Sunshine ☀️"
  },
  {
    id: 2,
    url: "/assest/1.jpg",
    caption: "Your Beautiful Smile 💫"
  },
  {
    id: 3,
    url: "/assest/2.png",
    caption: "Moti"
  },
  {
    id: 4,
    url: "/assest/3.png",
    caption: "Boni"
  },
  {
    id: 5,
    url: "/assest/4.png",
    caption: "Pagal"
  },
  {
    id: 6,
    url: "/assest/5.png",
    caption: "Sundar"
  },
  {
    id: 7,
    url: "/assest/6.png",
    caption: "bhalu"
  },
  {
    id: 8,
    url: "/assest/7.png",
    caption: "honey chili patato"
  },
  {
    id: 9,
    url: "/assest/8.jpg",
    caption: "chimken"
  },
 
];

const Photos = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentPhoto(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Header */}
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brown mb-4">
              Our Precious Moments <span className="text-gold">📸</span>
            </h1>
            <p className="text-brown-light text-lg md:text-xl max-w-2xl mx-auto">
              A gallery of memories that make my heart smile.
            </p>
          </div>
        </ScrollReveal>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {photos.map((photo, index) => (
            <ScrollReveal key={photo.id} delay={index * 100}>
              <button
                onClick={() => openLightbox(index)}
                className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-soft hover-lift tap-pulse focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {/* Real Image */}
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Floral frame */}
                <div className="absolute inset-0 border-4 border-ivory/50 rounded-2xl group-hover:border-ivory/80 transition-all pointer-events-none" />

                {/* Corner decorations */}
                <div className="absolute top-2 left-2 text-ivory/60 text-lg drop-shadow-md">✿</div>
                <div className="absolute top-2 right-2 text-ivory/60 text-lg drop-shadow-md">✿</div>
                <div className="absolute bottom-2 left-2 text-ivory/60 text-lg drop-shadow-md">✿</div>
                <div className="absolute bottom-2 right-2 text-ivory/60 text-lg drop-shadow-md">✿</div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-ivory font-serif text-lg text-center drop-shadow-md">
                    {photo.caption}
                  </p>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {/* Add photos hint */}
        <ScrollReveal delay={600}>
          <p className="text-center text-muted-foreground mt-8 italic">
            Tap any photo to view full screen
          </p>
        </ScrollReveal>

        {/* CTA Button */}
        <ScrollReveal delay={700}>
          <div className="text-center mt-12 md:mt-16">
            <Link to="/letter">
              <Button
                size="lg"
                className="touch-friendly bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm hover-lift tap-pulse font-serif text-lg"
              >
                Final Surprise 💌
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-ivory hover:text-gold transition-colors z-50"
          >
            <X size={32} />
          </button>

          {/* Navigation arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            className="absolute left-4 p-2 text-ivory hover:text-gold transition-colors z-50"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            className="absolute right-4 p-2 text-ivory hover:text-gold transition-colors z-50"
          >
            <ChevronRight size={40} />
          </button>

          {/* Photo display */}
          <div
            className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-glow animate-scale-in flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[currentPhoto].url}
              alt={photos[currentPhoto].caption}
              className="max-w-full max-h-[85vh] object-contain"
            />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pointer-events-none">
              <p className="text-ivory font-serif text-2xl text-center drop-shadow-md">
                {photos[currentPhoto].caption}
              </p>
            </div>
          </div>

          {/* Photo counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-ivory/60 font-mono">
            {currentPhoto + 1} / {photos.length}
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default Photos;
