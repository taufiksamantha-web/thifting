import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct, onAddToCart }) => {
  return (
    <div 
      className="group relative bg-primary rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      onClick={() => onSelectProduct(product)}
    >
      <div className="aspect-w-3 aspect-h-4">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="text-lg font-semibold text-white truncate group-hover:text-accent transition-colors">{product.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-text-muted">{product.size}</p>
          <p className="text-md font-bold text-accent">Rp{product.price.toLocaleString('id-ID')}</p>
        </div>
        
        {/* Quick Buy Button - hidden until group hover */}
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            if(product.inStock) {
              onAddToCart(product);
            }
          }}
          disabled={!product.inStock}
          className="w-full bg-accent text-background font-bold py-2 mt-4 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {product.inStock ? 'Beli' : 'Terjual'}
        </button>
      </div>
      {!product.inStock && (
        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md transform rotate-6">
          SOLD OUT
        </div>
      )}
    </div>
  );
};

export default ProductCard;