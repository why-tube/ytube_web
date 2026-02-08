import React, { useState, useEffect, useRef } from 'react';

interface SplineHeroProps {
  url: string;
}

export const SplineHero: React.FC<SplineHeroProps> = ({ url }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => {
      setZoomLevel(1.1);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        // Parallax effect: moves the background down at half the scroll speed
        // This makes the background appear to move slower than the foreground content
        requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.style.transform = `translate3d(0, ${scrollY * 0.5}px, 0)`;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-[120vh] z-0 overflow-hidden pointer-events-none bg-black opacity-80 will-change-transform"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00000080] to-black z-10" />
      {/* 
        Wrapper for the zoom animation.
        Scales the 3D viewer over 5 seconds.
      */}
      <div 
        className="w-full h-full"
        style={{
          transform: `scale(${zoomLevel})`,
          transition: 'transform 5s ease-out'
        }}
      >
        {/* 
          Switched to iframe as requested by the user for the specific Spline scene.
          The pointer-events-none on the parent ensures this doesn't capture scroll.
          Added transition-opacity for smooth fade-in on load.
        */}
        <iframe 
          src={url} 
          frameBorder="0" 
          width="100%" 
          height="100%" 
          className={`w-full h-full border-none transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          title="3D Background"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
};