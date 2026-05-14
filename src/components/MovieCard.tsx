import React from 'react';

interface MovieProps {
  title: string;
  image: string;
  year: string;
  duration: string;
  genres: string[];
  rating?: string | number;
}

export const MovieCard = ({ title, image, year, duration, genres }: MovieProps) => {
  return (
    <div className="group cursor-pointer relative bg-[#161b22] rounded-lg overflow-hidden border border-transparent hover:border-blue-600 transition-all duration-300 shadow-lg">
      
      {/* Container da Imagem */}  
      <div className="relative overflow-hidden rounded-md border border-gray-800 shadow-md aspect-[2/3] bg-[#161b22]"> 
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
        />
  
        {/* Badges da Esquerda (DUB/HD) */}
        <div className="absolute top-2 left-2 flex gap-1">
          <span className="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm shadow-md">DUB</span>
          <span className="bg-black/60 text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm border border-white/20">HD</span>
        </div>

        {/* Overlay escuro sutil ao passar o mouse */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Informações do Filme */}
      <div className="p-3">
        {/* Título */}
        <h3 translate="no" className="mt-1 text-[14px] font-bold text-gray-200 truncate group-hover:text-blue-500 transition-colors">
          {title}
        </h3>

        {/* Gêneros */}
        <div className="flex gap-2 mt-1.5 flex-wrap text-blue-400/90 text-[11px] font-semibold">
          {genres?.slice(0, 2).map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </div>

        {/* Ano e Duração */}
        <div className="flex gap-2 mt-1.5 items-center">
          <span className="text-gray-400 text-[12px] font-medium">{year}</span>
          <span className="text-gray-600 text-[12px]">•</span>
          <span className="text-gray-400 text-[12px] font-medium">{duration}</span>
        </div>
      </div>
    </div>
  );
};