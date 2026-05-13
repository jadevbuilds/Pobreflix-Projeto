"use client";
import { useState } from 'react';
import Navbar from '../src/components/Navbar';
import { MovieCard } from '../src/components/MovieCard';
import Footer from '../src/components/Footer';

// Lista de dados para o filtro funcionar
const DATA = {
  filmes: [
    { title: "Interestelar", image: "/interestelar.jpg", year: "2014", duration: "169min" },
    { title: "Vingadores: Ultimato", image: "/ultimato.jpg", year: "2019", duration: "181min" },
    { title: "Batman", image: "/batman.jpg", year: "2008", duration: "152min" },
    { title: "Matrix", image: "/matrix.jpg", year: "1999", duration: "136min" },
    { title: "Clube da Luta", image: "/clubedaluta.jpg", year: "1999", duration: "139min" },
    { title: "Cidade de Deus", image: "/cidadededeus.jpg", year: "2002", duration: "130min" },
    { title: "Chefão", image: "/poderosochefao.jpg", year: "1972", duration: "175min" },
    { title: "A Origem", image: "/inception.jpg", year: "2010", duration: "169min" },
  ],
  series: [
    { title: "The Boys", image: "/theboys.jpg", year: "2019", duration: "4 Temporadas" },
    { title: "Stranger Things", image: "/stranger.jpg", year: "2016", duration: "4 Temporadas" },
    { title: "Dark", image: "/dark.jpg", year: "2017", duration: "3 Temporadas" },
    { title: "Breaking Bad", image: "/breaking.jpg", year: "2008", duration: "5 Temporadas" },
    { title: "The Last of Us", image: "/lastofus.jpg", year: "2023", duration: "1 Temporada" },
    { title: "Peaky Blinders", image: "/peakyblinders.jpg", year: "2013", duration: "6 Temporadas" },
    { title: "Vikings", image: "/vikings.jpg", year: "2013", duration: "6 Temporadas" },
    { title: "Round 6", image: "/round.jpg", year: "2021", duration: "1 Temporada" },
 ]
};

export default function Home() {
  const [busca, setBusca] = useState('');
  const [abaFilmes, setAbaFilmes] = useState('lancamentos');
  const [abaSeries, setAbaSeries] = useState('novos');

  // Lógica de filtro para a barra de pesquisa
  const filtrar = (lista: any[]) => 
    lista.filter(item => item.title.toLowerCase().includes(busca.toLowerCase()));

  return (
    <main className="min-h-screen bg-[#0b0e14]">
      <Navbar onSearch={setBusca} />
      
      <div className="max-w-[1400px] mx-auto px-[4%] py-10 space-y-12">
        
        {/* SEÇÃO DE FILMES */}
        <section>
          <div className="flex items-center justify-between mb-6 bg-[#161b22] p-1 rounded-md border border-gray-800 shadow-xl">
            <div className="flex items-center">
              <div className="bg-[#0b0e14] px-4 py-2 rounded flex items-center gap-2 border border-gray-800">
                <span className="text-white text-xs font-bold flex items-center gap-2 uppercase">
                   <span className="text-gray-400">☰</span> Assistir Filmes Online
                </span>
              </div>
              
              <div className="hidden md:flex ml-6 gap-6">
                {['lancamentos', 'recentes', 'vistos', 'alta'].map((aba) => (
                  <button 
                    key={aba}
                    onClick={() => setAbaFilmes(aba)}
                    className={`${abaFilmes === aba ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'} text-[10px] font-black uppercase pb-1 tracking-widest transition-all flex items-center gap-1`}
                  >
                    {aba === 'alta' && <span className="text-orange-500">🔥</span>}
                    {aba.replace('vistos', 'mais vistos').replace('alta', 'em alta')}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-1 pr-2">
              <button className="bg-[#0b0e14] w-7 h-7 flex items-center justify-center rounded border border-gray-800 text-gray-500 text-xs">❮</button>
              <button className="bg-[#0b0e14] w-7 h-7 flex items-center justify-center rounded border border-gray-800 text-gray-500 text-xs">❯</button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {filtrar(DATA.filmes).map((filme, i) => (
              <MovieCard key={i} {...filme} />
            ))}
          </div>
        </section>

        {/* SEÇÃO DE SÉRIES (Com botão Em Alta 🔥) */}
        <section>
          <div className="flex items-center justify-between mb-6 bg-[#161b22] p-1 rounded-md border border-gray-800 shadow-xl">
            <div className="flex items-center">
              <div className="bg-[#0b0e14] px-4 py-2 rounded flex items-center gap-2 border border-gray-800">
                <span className="text-white text-xs font-bold flex items-center gap-2 uppercase">
                   <span className="text-gray-400">☰</span> Assistir Séries Online
                </span>
              </div>
              <div className="hidden md:flex ml-6 gap-6">
                {['novos', 'recentes', 'vistas', 'alta'].map((aba) => (
                  <button 
                    key={aba}
                    onClick={() => setAbaSeries(aba)}
                    className={`${abaSeries === aba ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'} text-[10px] font-black uppercase pb-1 tracking-widest transition-all flex items-center gap-1`}
                  >
                    {aba === 'alta' && <span className="text-orange-500">🔥</span>}
                    {aba.replace('novos', 'novos episódios').replace('vistas', 'mais vistas').replace('alta', 'em alta')}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {filtrar(DATA.series).map((serie, i) => (
              <MovieCard key={i} {...serie} />
            ))}
            {filtrar(DATA.series).length === 0 && (
              <div className="col-span-full py-10 text-center text-gray-600 text-[10px] uppercase tracking-[4px]">
                Nenhum conteúdo encontrado
              </div>
            )}
          </div>
        </section>

      </div>
      <Footer />
    </main>
  );
}