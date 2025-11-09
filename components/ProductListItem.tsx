import React from 'react';
import { Product } from '../types';

interface ProductListItemProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, onSelectProduct, onAddToCart }) => {
  return (
    <div
      className="group relative flex flex-col sm:flex-row bg-primary rounded-lg overflow-hidden shadow-lg border border-secondary/30 cursor-pointer transition-all duration-300 hover:shadow-accent/20 hover:border-accent/50"
      onClick={() => onSelectProduct(product)}
    >
      {/* Image */}
      <div className="flex-shrink-0 sm:w-48 md:w-56 h-64 sm:h-auto bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 p-4 sm:p-6">
        <div className="flex-1">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-xl font-semibold text-text-main group-hover:text-pink-400 transition-colors pr-4">{product.name}</h3>
            <p className="text-lg font-bold text-text-main flex-shrink-0">Rp{product.price.toLocaleString('id-ID')}</p>
          </div>
          <p className="text-sm text-text-muted mt-1">{product.size} - <span className="italic">{product.condition}</span></p>
          <p className="text-text-muted mt-4 text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
            {product.description}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 pt-4 border-t border-secondary/50 flex items-center justify-end">
           {product.inStock ? (
             <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="bg-accent text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Tambah Keranjang
            </button>
           ) : (
             <span className="font-bold text-red-500">TERJUAL</span>
           )}
        </div>
      </div>
       {!product.inStock && (
         <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md transform -rotate-6">
           SOLD OUT
         </div>
       )}
    </div>
  );
};

export default ProductListItem;
