import React from 'react';

export interface Review {
  name: string;
  text: string;
  rating: number;
  date: string;
  ip: string;
}

interface ReviewMarqueeProps {
  reviews: Review[];
  themeColor: string;
}

export const ReviewMarquee: React.FC<ReviewMarqueeProps> = ({ reviews, themeColor }) => {
  return (
    <div className="w-full overflow-hidden py-10 relative group">
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
      
      {/* Container to handle the width - added hover pause logic */}
      <div className="flex w-max hover:[&>*]:[animation-play-state:paused]">
        {/* Original Set */}
        <div className="flex animate-marquee gap-6 pr-6">
          {reviews.map((review, index) => (
            <ReviewCard key={`original-${index}`} review={review} themeColor={themeColor} />
          ))}
        </div>
        
        {/* Duplicate Set for Seamless Loop */}
        <div className="flex animate-marquee gap-6 pr-6" aria-hidden="true">
          {reviews.map((review, index) => (
            <ReviewCard key={`duplicate-${index}`} review={review} themeColor={themeColor} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewCard: React.FC<{ review: Review; themeColor: string }> = ({ review, themeColor }) => {
  return (
    <div className="w-[300px] md:w-[350px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 flex flex-col gap-3 hover:bg-white/10 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <i 
              key={i} 
              className={`fa-solid fa-star text-xs ${i < review.rating ? '' : 'text-gray-600'}`}
              style={{ color: i < review.rating ? themeColor : undefined }}
            ></i>
          ))}
        </div>
        <span className="text-xs text-gray-500">{review.date}</span>
      </div>
      
      <p className="text-sm text-gray-200 leading-relaxed line-clamp-3">
        "{review.text}"
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-[10px] text-gray-400">
            <i className="fa-solid fa-user"></i>
          </div>
          <span className="text-xs font-bold text-gray-400">{review.name}</span>
        </div>
        <span className="text-[10px] text-gray-600 font-mono tracking-wider">{review.ip}</span>
      </div>
    </div>
  );
};