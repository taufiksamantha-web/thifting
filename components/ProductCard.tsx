import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct, onAddToCart }) => {
  return (
    <div 
      className="group bg-primary rounded-lg overflow-hidden shadow-lg border border-secondary/30 transition-all duration-300 hover:shadow-accent/20 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
    >
      <div 
        className="relative aspect-w-1 aspect-h-1 overflow-hidden cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        {!product.inStock && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            SOLD OUT
          </div>
        )}
      </div>

      <div className="p-4 text-left flex flex-col flex-grow">
        <h3 
            className="text-md font-semibold text-text-main truncate cursor-pointer group-hover:text-accent transition-colors"
            onClick={() => onSelectProduct(product)}
        >
            {product.name}
        </h3>
        <p className="text-sm text-text-muted mt-1 line-clamp-2 flex-grow min-h-[40px]">{product.description}</p>
        
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-secondary/20">
          <p className="text-lg font-bold text-text-main">Rp{product.price.toLocaleString('id-ID')}</p>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              if(product.inStock) {
                onAddToCart(product);
              }
            }}
            disabled={!product.inStock}
            className="flex items-center justify-center w-10 h-10 bg-accent/20 text-accent rounded-full transition-all duration-300 hover:bg-accent hover:text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            aria-label="Tambah ke keranjang"
            title={product.inStock ? "Tambah ke keranjang" : "Terjual"}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;