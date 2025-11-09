import React from 'react';

interface FloatingCartButtonProps {
  cartItemCount: number;
  onClick: () => void;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ cartItemCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-16 h-16 bg-accent text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-opacity-90 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-accent/50 z-30"
      aria-label={`Lihat keranjang, ${cartItemCount} item`}
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center h-7 w-7 bg-red-600 text-white text-xs font-bold rounded-full border-2 border-primary">
          {cartItemCount}
        </span>
      )}
    </button>
  );
};

export default FloatingCartButton;
