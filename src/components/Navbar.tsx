"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Bebas_Neue } from 'next/font/google';

// Configuração da fonte
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface NavbarProps {
  onSearch: (value: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [activeTab, setActiveTab] = useState('filmes');

  const menuItems = [
    { id: 'filmes', label: 'Filmes', href: '#' },
    { id: 'series', label: 'Séries', href: '#' },
    { id: 'animes', label: 'Animes', href: '#' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0b0e14]/90 backdrop-blur-md border-b border-gray-800 px-[5%] py-6">
      <div className="max-w-[1500px] mx-auto flex items-center justify-between">
        
        {/* LADO ESQUERDO: LOGO + MENU */}
        <div className="flex items-center gap-20">
          <Link 
            href="/" 
            translate="no" 
            className={`${bebasNeue.className} text-[45px] font-normal tracking-[1px] text-white uppercase leading-none inline-block scale-y-110`}
          >
            POBRE<span className="text-blue-600">FLIX</span>
          </Link>
          
          <div translate="no" className="hidden md:flex gap-10 text-[14px] font-black uppercase tracking-widest">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  const section = document.getElementById(item.id);
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`transition-all pb-2 border-b-2 ${
                  activeTab === item.id 
                    ? 'text-blue-500 border-blue-500' 
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* LADO DIREITO: BUSCA */}
        <div className="relative w-80">
          <input 
            type="text" 
            placeholder="Buscar por filme ou série..." 
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-[#161b22] border border-gray-700 rounded-full py-2 px-12 text-[13px] text-white outline-none focus:border-blue-600 transition-all placeholder:text-gray-600"
          />
          <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth="2.5"/><line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2.5"/>
          </svg>
        </div>
      </div>
    </nav>
  );
}