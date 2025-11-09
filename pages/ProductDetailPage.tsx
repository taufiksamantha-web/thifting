import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import StarRating from '../components/StarRating';
import ReviewsSection from '../components/ReviewsSection';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onCheckoutNow: (items: Product[]) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, allProducts, onBack, onSelectProduct, onAddToCart, onCheckoutNow }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  useEffect(() => {
    setSelectedImage(product.images[0]);
  }, [product]);

  const relatedProducts = allProducts.filter(
    p => p.category === product.category && p.id !== product.id && p.inStock
  ).slice(0, 4);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb/Back button */}
      <button onClick={onBack} className="text-accent hover:underline mb-8 text-sm">
        &larr; Kembali ke Koleksi {product.category}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-primary mb-4 relative group">
            <img 
              src={selectedImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-125"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, index) => (
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
        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-serif text-accent mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
              <StarRating rating={product.rating} />
              <span className="text-text-muted text-sm">{product.rating > 0 ? `${product.reviews.length} ulasan` : 'Belum ada ulasan'}</span>
          </div>

          <p className="text-2xl font-semibold text-text-main mb-4">Rp{product.price.toLocaleString('id-ID')}</p>

          <div className="flex items-center mb-6">
            <span className={`px-3 py-1 text-sm font-bold rounded-full ${product.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {product.inStock ? 'In Stock' : 'Sold Out'}
            </span>
          </div>

          <div className="space-y-4 text-text-muted border-y border-secondary py-6">
            <div className="grid grid-cols-3 gap-4">
              <span className="font-semibold text-text-main">Ukuran:</span>
              <span className="col-span-2">{product.size} {product.sizeDetails && `(${product.sizeDetails})`}</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-semibold text-text-main">Material:</span>
              <span className="col-span-2">{product.material}</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-semibold text-text-main">Kondisi:</span>
              <span className="col-span-2">{product.condition}</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-text-main mb-2">Deskripsi</h3>
            <p className="text-text-muted leading-relaxed">{product.description}</p>
          </div>

          {/* Action Buttons */}
          {product.inStock && (
            <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-4">
              <button onClick={() => onAddToCart(product)} className="w-full bg-secondary text-text-main font-bold py-3 px-6 rounded-md hover:bg-opacity-80 transition-colors">
                Masukkan Keranjang
              </button>
              <button onClick={() => onCheckoutNow([product])} className="w-full bg-accent text-background font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors">
                Beli Sekarang
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewsSection reviews={product.reviews} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="text-2xl font-serif text-center text-accent mb-12">Kamu Mungkin Juga Suka</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;