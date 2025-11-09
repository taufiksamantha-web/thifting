import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import StarRating from './StarRating';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onViewFullDetails: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart, onViewFullDetails }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  useEffect(() => {
    // Reset image when product changes
    setSelectedImage(product.images[0]);
  }, [product]);

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-primary/90 backdrop-blur-xl border border-secondary/50 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row relative"
        onClick={handleModalContentClick}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-3xl leading-none text-text-muted hover:text-accent z-10"
          aria-label="Close"
        >
          &times;
        </button>
        
        {/* Image Gallery */}
        <div className="w-full md:w-1/2 p-4 flex flex-col">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-secondary mb-3 flex-grow">
            <img 
              src={selectedImage} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(0, 4).map((img, index) => (
              <div 
                key={index}
                className={`cursor-pointer rounded-md overflow-hidden aspect-w-1 aspect-h-1 border-2 ${selectedImage === img ? 'border-accent' : 'border-transparent'}`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto">
          <h2 className="text-2xl lg:text-3xl font-serif text-accent mb-2">{product.name}</h2>
          
          <div className="flex items-center gap-4 mb-3">
            <StarRating rating={product.rating} />
            <span className="text-text-muted text-sm">{product.reviews.length} ulasan</span>
          </div>

          <p className="text-xl font-semibold text-text-main mb-4">Rp{product.price.toLocaleString('id-ID')}</p>

          <div className="space-y-3 text-sm text-text-muted border-y border-secondary py-4">
            <p><strong className="text-text-main font-medium">Ukuran:</strong> {product.size}</p>
            <p><strong className="text-text-main font-medium">Kondisi:</strong> {product.condition}</p>
          </div>

          <div className="mt-4 flex-grow">
            <p className="text-text-muted leading-relaxed line-clamp-4">{product.description}</p>
          </div>

          {product.inStock ? (
            <div className="mt-6 space-y-3">
              <button 
                onClick={() => onAddToCart(product)} 
                className="w-full bg-accent text-background font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Tambah Keranjang
              </button>
              <button 
                onClick={() => onViewFullDetails(product)} 
                className="w-full bg-secondary text-text-main font-bold py-3 px-6 rounded-md hover:bg-opacity-80 transition-colors"
              >
                Lihat Detail Lengkap
              </button>
            </div>
          ) : (
             <div className="mt-6 text-center py-3 px-6 bg-red-500/20 text-red-400 font-bold rounded-md">
                Stok Habis
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
