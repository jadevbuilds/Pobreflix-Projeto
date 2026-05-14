"use client";
import { useState, useRef, type ComponentType } from 'react';
import Navbar from '../src/components/Navbar';
import { MovieCard } from '../src/components/MovieCard';
import Footer from '../src/components/Footer';
import MovieDetails from '../src/components/MovieDetails';
import { DATA } from '../src/data/movies';

export default function Home() {
  const [busca, setBusca] = useState('');
  const [obraSelecionada, setObraSelecionada] = useState<any>(null);
  
  const [abaFilmes, setAbaFilmes] = useState('todos');
  const [abaSeries, setAbaSeries] = useState('todos');
  const [abaAnimes, setAbaAnimes] = useState('todos');
  const MovieDetailsComponent = MovieDetails as ComponentType<{ obra: any; onClose: () => void }>;

  const carrosselFilmes = useRef<HTMLDivElement>(null);
  const carrosselSeries = useRef<HTMLDivElement>(null);
  const carrosselAnimes = useRef<HTMLDivElement>(null);

  const filtrarConteudo = (lista: any[], abaAtiva: string) => {
    let filtrados = lista.filter(item => item.title.toLowerCase().includes(busca.toLowerCase()));
    
    switch (abaAtiva) {
      case 'todos': 
        filtrados = [...filtrados].sort((a, b) => a.title.localeCompare(b.title)); 
        break;
      
      case 'recentes': 
        // ORDENAÇÃO POR ADIÇÃO: Pega os últimos adicionados no arquivo movies.ts e coloca primeiro
        filtrados = [...filtrados].reverse(); 
        break;
      
      case 'alta': 
        filtrados = filtrados.filter(item => item.emAlta); 
        break;
      
      case 'novos':
      case 'lancamentos': 
        filtrados = filtrados.filter(item => item.lancamento || item.novoEp); 
        break;
      
      case 'vistas':
      case 'vistos': 
        filtrados = [...filtrados].sort((a, b) => (b.views || 0) - (a.views || 0)); 
        break;
    }
    return filtrados;
  };

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direcao: 'left' | 'right') => {
    if (ref && ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.8;
      ref.current.scrollBy({ left: direcao === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0e14] flex flex-col text-white">
      <Navbar onSearch={setBusca} />
      
      {obraSelecionada && (
        <MovieDetails obra={obraSelecionada} onClose={() => setObraSelecionada(null)} />
      )}

      <div className="max-w-[1500px] mx-auto px-[4%] py-16 space-y-24 flex-grow">
        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        {[
          { id: 'filmes', title: 'Filmes', data: DATA.filmes, aba: abaFilmes, setAba: setAbaFilmes, ref: carrosselFilmes, label: 'Assistir Filmes Online' },
          { id: 'series', title: 'Séries', data: DATA.series, aba: abaSeries, setAba: setAbaSeries, ref: carrosselSeries, label: 'Assistir Séries Online' },
          { id: 'animes', title: 'Animes', data: DATA.animes, aba: abaAnimes, setAba: setAbaAnimes, ref: carrosselAnimes, label: 'Assistir Animes Online' }
        ].map((secao) => (
          <section key={secao.id} id={secao.id} className="scroll-mt-32">
            <div className="flex items-center justify-between mb-8 bg-[#161b22] h-20 px-2 rounded-md border border-gray-800 shadow-xl">
              <div className="flex items-center h-full">
                <div className="bg-[#0b0e14] px-6 h-[70%] flex items-center gap-4 border border-gray-800 rounded">
                  <span className="text-white text-base font-bold uppercase tracking-widest flex items-center">
                     <span className="text-gray-400 text-xl mr-3">☰</span> {secao.label}
                  </span>
                </div>
                
                <div className="hidden lg:flex ml-10 gap-10 items-center">
                  {['todos', secao.id === 'filmes' ? 'lancamentos' : 'novos', 'recentes', 'vistas', 'alta'].map((aba) => (
                    <button 
                      key={aba} 
                      onClick={() => secao.setAba(aba)} 
                      className={`${secao.aba === aba ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 border-b-2 border-transparent'} text-[13px] font-black uppercase pb-1 tracking-[3px] transition-all hover:text-white whitespace-nowrap`}
                    >
                      {aba === 'todos' ? 'Todos' : 
                       aba === 'alta' ? '🔥 Em Alta' : 
                       aba === 'novos' ? 'Novos Eps' : 
                       aba === 'lancamentos' ? 'Lançamentos' : 
                       aba === 'recentes' ? 'Recentes' : 
                       secao.id === 'series' ? 'Mais Vistas' : 'Mais Vistos'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 pr-4">
                <button onClick={() => scroll(secao.ref, 'left')} className="bg-[#0b0e14] w-12 h-12 flex items-center justify-center rounded border border-gray-800 text-gray-400 hover:text-white transition-all">❮</button>
                <button onClick={() => scroll(secao.ref, 'right')} className="bg-[#0b0e14] w-12 h-12 flex items-center justify-center rounded border border-gray-800 text-gray-400 hover:text-white transition-all">❯</button>
              </div>
            </div>
            
            <div ref={secao.ref} className="flex overflow-x-auto gap-8 scroll-smooth pb-5 no-scrollbar min-h-[350px] items-start">
              {filtrarConteudo(secao.data, secao.aba).map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => setObraSelecionada(item)} 
                  className="w-[220px] flex-shrink-0 transition-transform hover:scale-105 cursor-pointer"
                >
                  <MovieCard {...item} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Footer />
    </main>
  );
}