import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { url?: string; 'loading-anim-type'?: string }, HTMLElement>;
    }
  }
}

interface SplineHeroProps {
  url: string;
}

export const SplineHero: React.FC<SplineHeroProps> = ({ url }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-[110vh] z-0 overflow-hidden pointer-events-none opacity-80">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00000080] to-black z-10" />
      {/* 
        Using the custom element defined in index.html script.
        We check if url is valid, otherwise use a fallback or placeholder 
      */}
      <spline-viewer 
        url={url !== "undefined" ? url : "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"} 
        loading-anim-type="spinner-small-dark"
      />
    </div>
  );
};