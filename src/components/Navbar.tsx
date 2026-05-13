"use client";
import { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  onSearch: (value: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  // Estado para controlar qual aba do menu está ativa
  const [activeTab, setActiveTab] = useState('inicio');

  const menuItems = [
    { id: 'inicio', label: 'Início', href: '/' },
    { id: 'filmes', label: 'Filmes', href: '#' },
    { id: 'series', label: 'Séries', href: '#' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0b0e14]/90 backdrop-blur-md border-b border-gray-800 px-[5%] py-4">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        
        {/* LADO ESQUERDO: LOGO + MENU */}
        <div className="flex items-center gap-16"> {/* Aumentado para gap-16 para separar bem do título */}
          <Link href="/" translate="no" className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">
            POBRE<span className="text-blue-600">FLIX</span>
          </Link>
          
          <div translate="no" className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`transition-all pb-1 border-b-2 ${
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
        <div className="relative w-64">
          <input 
            type="text" 
            placeholder="Buscar por filme..." 
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-[#161b22] border border-gray-700 rounded-full py-1.5 px-10 text-[11px] text-white outline-none focus:border-blue-600 transition-all placeholder:text-gray-600"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth="2.5"/><line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2.5"/>
          </svg>
        </div>
      </div>
    </nav>
  );
}