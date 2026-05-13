import React from 'react';

interface MovieProps {
  title: string;
  image: string;
  year: string;
  duration: string;
}

export const MovieCard = ({ title, image, year, duration }: MovieProps) => {
  return (
    <div className="group cursor-pointer relative bg-[#161b22] rounded-lg overflow-hidden border border-transparent hover:border-blue-600 transition-all duration-300 shadow-lg">
      {/* Container da Imagem com Zoom */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges (DUB/HD) igual ao seu print */}
        <div className="absolute top-2 left-2 flex gap-1">
          <span className="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm shadow-md">DUB</span>
          <span className="bg-black/60 text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm border border-white/20">HD</span>
        </div>
      </div>

      {/* Info do Filme */}
      <div className="p-3">
        <h3 className="text-white text-xs font-bold truncate group-hover:text-blue-500 transition-colors">
          {title}
        </h3>
        <div className="flex gap-2 mt-1">
          <span className="text-gray-500 text-[10px]">{year}</span>
          <span className="text-gray-500 text-[10px]">•</span>
          <span className="text-gray-500 text-[10px]">{duration}</span>
        </div>
      </div>
    </div>
  );
};