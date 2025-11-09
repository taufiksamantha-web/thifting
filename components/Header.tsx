
import React, { useState } from 'react';
import { Category } from '../types';

interface HeaderProps {
  categories: Category[];
  onSelectCategory: (category: Category['name'] | 'all') => void;
  onNavigateHome: () => void;
  onNavigateToCart: () => void;
  onToggleView: () => void;
  onTrackOrder: () => void;
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ categories, onSelectCategory, onNavigateHome, onNavigateToCart, onToggleView, onTrackOrder, cartItemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary/80 backdrop-blur-lg shadow-sm sticky top-0 z-40 border-b border-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={onNavigateHome} className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-accent" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 30 C20 10, 40 10, 50 30 S80 50, 80 70 C80 90, 60 90, 50 70 S20 50, 20 30" fill="none" stroke="currentColor" strokeWidth="5"/>
                <path d="M50 30 L50 70" stroke="currentColor" strokeWidth="5"/>
              </svg>
              <span className="text-2xl font-serif font-bold tracking-wider text-accent">Retrove</span>
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => onSelectCategory('Baru Masuk')} className="text-text-main hover:text-accent transition-colors font-medium">Baru Masuk</button>
            {categories.map(cat => (
              <button key={cat.name} onClick={() => onSelectCategory(cat.name)} className="text-text-main hover:text-accent transition-colors font-medium">{cat.name}</button>
            ))}
             <button onClick={() => onSelectCategory('all')} className="text-text-main hover:text-accent transition-colors font-medium">Semua</button>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button onClick={onTrackOrder} className="hidden sm:block text-sm font-medium text-text-muted hover:text-accent transition-colors">Lacak Pesanan</button>
            <button onClick={onNavigateToCart} className="relative text-text-main hover:text-accent transition-colors p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{cartItemCount}</span>
              )}
            </button>
             <button onClick={onToggleView} className="text-text-main hover:text-accent transition-colors p-2" title="Admin View">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text-main hover:text-accent transition-colors p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <button onClick={() => { onSelectCategory('Baru Masuk'); setIsMenuOpen(false); }} className="text-text-main hover:text-accent transition-colors font-medium p-2 text-left">Baru Masuk</button>
              {categories.map(cat => (
                <button key={cat.name} onClick={() => { onSelectCategory(cat.name); setIsMenuOpen(false); }} className="text-text-main hover:text-accent transition-colors font-medium p-2 text-left">{cat.name}</button>
              ))}
              <button onClick={() => { onSelectCategory('all'); setIsMenuOpen(false); }} className="text-text-main hover:text-accent transition-colors font-medium p-2 text-left">Semua</button>
              <button onClick={() => { onTrackOrder(); setIsMenuOpen(false); }} className="sm:hidden text-text-main hover:text-accent transition-colors font-medium p-2 text-left">Lacak Pesanan</button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;