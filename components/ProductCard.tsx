import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onCheckoutNow: (product: Product) => void;
}

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);


const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct, onAddToCart, onQuickView, onCheckoutNow }) => {
  return (
    <div 
      className="group bg-primary rounded-lg overflow-hidden shadow-lg border border-secondary/30 transition-all duration-300 hover:shadow-accent/20 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
    >
      <div 
        className="relative aspect-w-1 aspect-h-1 overflow-hidden"
      >
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer" 
          onClick={() => onSelectProduct(product)}
        />
        {!product.inStock && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            SOLD OUT
          </div>
        )}
        {/* Quick View Button */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex items-center gap-2 bg-primary/80 backdrop-blur-sm text-text-main font-semibold py-2 px-5 rounded-full hover:bg-accent hover:text-white transition-all scale-90 group-hover:scale-100"
            aria-label="Quick View"
          >
            <EyeIcon />
            Quick View
          </button>
        </div>
      </div>

      <div className="p-4 text-left flex flex-col flex-grow">
        <h3 
            className="text-md font-semibold text-text-main truncate cursor-pointer group-hover:text-accent transition-colors"
            onClick={() => onSelectProduct(product)}
        >
            {product.name}
        </h3>
        <p className="text-sm text-text-muted mt-1 line-clamp-2 flex-grow min-h-[40px]">{product.description}</p>
        
        <div className="mt-3 pt-3 border-t border-secondary/20">
            <p className="text-lg font-bold text-text-main mb-3">Rp{product.price.toLocaleString('id-ID')}</p>
            <div className="flex items-stretch gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (product.inStock) {
                            onCheckoutNow(product);
                        }
                    }}
                    disabled={!product.inStock}
                    className="flex-grow bg-accent text-white font-semibold py-2 px-3 rounded-md text-sm hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    aria-label="Beli Sekarang"
                >
                    Beli Sekarang
                </button>
                <button 
                    onClick={(e) => { 
                    e.stopPropagation(); 
                    if(product.inStock) {
                        onAddToCart(product);
                    }
                    }}
                    disabled={!product.inStock}
                    className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-accent/20 text-accent rounded-md transition-all duration-300 hover:bg-accent hover:text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                    aria-label="Tambah ke keranjang"
                    title={product.inStock ? "Tambah ke keranjang" : "Terjual"}
                >
                    <PlusIcon />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;