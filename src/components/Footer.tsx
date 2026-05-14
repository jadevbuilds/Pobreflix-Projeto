"use client";
import Link from 'next/link';
import { Bebas_Neue } from 'next/font/google';

// Configuração do Footer
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-gray-800 bg-[#0b0e14] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
         {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* COLUNA 1: TÍTULO BRANDING */}
          <div className="space-y-4">
            <h3 className={`${bebasNeue.className} text-[45px] font-normal tracking-[1px] text-white uppercase leading-none inline-block scale-y-110`}>
              POBRE<span className="text-blue-600">FLIX</span>
            </h3>
            <p className="text-gray-500 text-[16px]  leading-relaxed max-w-xs mt-4">
              A melhor experiência de streaming gratuito. Filmes, séries e animes atualizados diariamente em alta definição.
            </p>
          </div>

          {/* COLUNA 2: NAVEGAÇÃO */}
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Navegação</h4>
            <ul className="space-y-4 text-gray-600 text-sm">
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Filmes</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Séries</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Animes</Link></li>
            </ul>
          </div>

          {/* COLUNA 3: INSTITUCIONAL */}
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Institucional</h4>
            <ul className="space-y-4 text-gray-600 text-sm">
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Termos de Uso</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Política de Privacidade</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">DMCA</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Contato</Link></li>
            </ul>
          </div>

        </div>

        {/* BARRA INFERIOR DO RODAPÉ */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="text-white text-[15px] font-black tracking-[4px] uppercase opacity-60 block mb-2">
              Filmes Online Grátis – Séries Online – Animes Online
            </span>
            <p className="text-gray-600 text-[11px] uppercase tracking-widest">
              © {currentYear} Pobreflix - Todos os direitos reservados.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-blue-600/10 border border-blue-600/20 rounded-full">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-tighter">Servidores Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}