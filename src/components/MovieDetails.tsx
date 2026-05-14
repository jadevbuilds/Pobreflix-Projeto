"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

interface MovieDetailsProps {
  obra: any;
  onClose: () => void;
}

export default function MovieDetails({ obra, onClose }: MovieDetailsProps) {
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!obra) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl bg-[#08101c] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
        
        {/* CABEÇALHO */}
        <div className="flex items-center px-6 py-5 border-b border-gray-800 bg-[#0c1420] gap-4">
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold text-white uppercase italic tracking-tighter leading-none">{obra.title}</h2>
            <div className="flex items-center gap-3 mt-3">
              <p className="text-[10px] text-gray-500 font-black tracking-widest uppercase">{obra.duration}</p>
              <div className="px-3 py-1 bg-transparent border border-[#ffad05]/40 rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-[#ffad05]/10 hover:scale-110 transform cursor-default shadow-lg">
                <span className="text-[#ffad05] text-xl leading-none">★</span> 
                <span className="text-white text-[16px] font-black uppercase tracking-tighter italic leading-none">
                  {obra.rating || "N/A"} 
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-wrap gap-2 justify-end mr-4">
            {obra.genres?.map((genre: string) => (
              <span 
                key={genre}
                className="px-4 py-2 bg-transparent border border-gray-700 rounded-full text-white text-[10px] font-black uppercase tracking-[2px] transition-all duration-300 hover:bg-blue-600 hover:border-blue-600 cursor-default whitespace-nowrap"
              >
                {genre}
              </span>
            ))}
          </div>

          <button 
            onClick={onClose}
            className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 text-white transition-all duration-300 hover:scale-110 hover:bg-blue-600"
          >
            <span className="text-xl font-bold transition-transform duration-500 group-hover:rotate-180">✕</span>
          </button>
        </div>

        {/* CONTEÚDO */}
        <div className="p-6 space-y-8 overflow-y-auto max-h-[85vh] no-scrollbar">
          
          {/* TRAILER */}
          {obra.trailerId && (
            <div className="relative pt-[56.25%] w-full overflow-hidden rounded-lg border border-gray-800 shadow-lg bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${obra.trailerId}`}
                title={`Trailer de ${obra.title}`}
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          )}

          <div className="mt-8 space-y-8">
            <div className="space-y-4">
              <h3 className="text-blue-500 font-black uppercase text-sm tracking-[4px]">Sinopse</h3>
              <p className="text-gray-200 leading-relaxed text-lg italic border-l-4 border-blue-600 pl-6">
                {obra.sinopse || "Sinopse ainda não disponível para esta obra."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-gray-800/50">
              <div>
                <span className="block text-xs text-gray-500 uppercase font-black tracking-[3px] mb-2">Autor / Estúdio</span>
                <span className="text-white text-lg font-bold uppercase tracking-wider">{obra.autor || "Não informado"}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase font-black tracking-[3px] mb-2">Ano de Lançamento</span>
                <span className="text-white text-lg font-bold uppercase tracking-wider">{obra.year}</span>
              </div>
            </div>

            {/* --- NOVO BLOCO: ONDE ASSISTIR --- */}
            {obra.ondeAssistir && (
              <div className="pt-8 border-t border-gray-800/50">
                <span className="block text-xs text-blue-500 uppercase font-black tracking-[3px] mb-4">Disponível em:</span>
                
                <a 
                  href={obra.ondeAssistir.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-[#101824] hover:bg-[#16202d] border border-gray-700 p-3 rounded-lg transition-all group"
                >
                  {/* Espaço para a Logo da Plataforma */}
                  <div className="w-10 h-10 bg-white rounded flex items-center justify-center overflow-hidden">
                    <img 
                      src={obra.ondeAssistir.logo || "https://cdn-icons-png.flaticon.com/512/732/732228.png"} 
                      alt={obra.ondeAssistir.nome} 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  
                  <div className="flex flex-col pr-4">
                    <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Assista agora na</span>
                    <span className="text-white text-base font-black uppercase italic group-hover:text-blue-400 transition-colors">
                      {obra.ondeAssistir.nome}
                    </span>
                  </div>

                  <div className="text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>
            )}

            {/* BOTÃO ASSISTIR AGORA */}
            <div className="pt-4 flex justify-center pb-6">
              <Link 
                href={`/watch/${encodeURIComponent(obra.title)}`}
                onClick={onClose}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 cursor-pointer"
              >
                <span className="text-xl">▶</span>
                <span className="uppercase tracking-[3px] text-lg italic font-bold">Assistir Agora</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}