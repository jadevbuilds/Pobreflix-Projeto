"use client";
import React, { useState, useEffect, use } from 'react';
import Navbar from '@/src/components/Navbar'; 
import { DATA } from '@/src/data/movies'; 

export default function WatchPage({ params }: { params: Promise<{ title: string }> }) {
  const resolvedParams = use(params);
  const [obra, setObra] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarObra = () => {
      const titleDecoded = decodeURIComponent(resolvedParams.title);
      const todasObras = [...DATA.filmes, ...DATA.series, ...DATA.animes];
      const encontrada = todasObras.find(o => o.title === titleDecoded);
      setObra(encontrada);
      setCarregando(false);
    };
    buscarObra();
  }, [resolvedParams.title]);

  if (carregando) return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex items-center justify-center font-black uppercase italic tracking-[5px]">
      Carregando Player...
    </div>
  );

  if (!obra) return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex items-center justify-center font-black uppercase italic tracking-[5px]">
      Obra não encontrada...
    </div>
  );

  // Define qual link usar: Prioridade para videoUrl, depois YouTube
  const linkFinal = obra.videoUrl || `https://www.youtube.com/embed/${obra.trailerId}?autoplay=1`;

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none !important; }
        .no-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}</style>

      <Navbar onSearch={() => {}} />

      <main className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
            Assistir <span className="text-blue-500">{obra.title}</span> Online
          </h1>
          <div className="flex gap-4 text-[11px] text-gray-500 font-black mt-4 uppercase tracking-[3px]">
            <span>{obra.year}</span>
            <span className="text-gray-800">|</span>
            <span>{obra.duration}</span>
            <span className="text-gray-800">|</span>
            <span className="text-blue-500">FULL HD</span>
          </div>
        </div>

         {/* O SEU PLAYER DO FILME AQUI */}
        <div className="bg-black rounded-2xl border border-gray-800 shadow-2xl overflow-hidden aspect-video relative border-b-4 border-b-blue-600">
          <iframe 
            src={linkFinal} 
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            frameBorder="0"
            title={obra.title}
            referrerPolicy="no-referrer"
            sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
            allow="autoplay; encrypted-media"
          />
        </div>

        <div className="mt-10 bg-[#161b22] border border-gray-800 rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-blue-500 text-[10px] font-black uppercase tracking-[5px]">Sinopse</h3>
              <p className="text-gray-200 text-lg leading-relaxed italic border-l-4 border-blue-600 pl-6">
                {obra.sinopse}
              </p>
            </div>
            
            <div className="space-y-6 bg-[#0b0e14]/50 p-6 rounded-xl border border-gray-800">
               <div>
                  <h4 className="text-gray-500 text-[9px] font-black uppercase tracking-[3px]">Avaliação</h4>
                  <p className="text-yellow-500 font-black text-xl italic">★ {obra.rating} <span className="text-gray-600 text-xs">/ 10</span></p>
               </div>
               <div>
                  <h4 className="text-gray-500 text-[9px] font-black uppercase tracking-[3px]">Gêneros</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {obra.genres?.map((g: string) => (
                      <span key={g} className="text-[9px] font-bold bg-blue-600/10 text-blue-500 border border-blue-500/20 px-2 py-1 rounded uppercase">{g}</span>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}