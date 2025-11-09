import React from 'react';
import { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';

interface ProductListPageProps {
  products: Product[];
  category?: Category['name'];
  onSelectProduct: (product: Product) => void;
  onNavigateHome: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductListPage: React.FC<ProductListPageProps> = ({ products, category, onSelectProduct, onNavigateHome, onAddToCart }) => {
  const getProducts = () => {
    if (category === 'Baru Masuk') {
      // Assuming products are listed chronologically, newest first.
      return [...products].sort((a,b) => b.id - a.id).slice(0, 12);
    }
    if (category) {
      return products.filter(p => p.category === category);
    }
    return products;
  };

  const productsToShow = getProducts();
  const title = category ? `Koleksi ${category}` : 'Semua Produk';
  const productCount = productsToShow.length;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-text-muted">
        <span 
          onClick={onNavigateHome} 
          className="cursor-pointer hover:text-accent"
        >
          Home
        </span>
        <span className="mx-2">/</span>
        <span className="text-text-main">{title}</span>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-accent">{title}</h1>
        <p className="text-text-muted mt-2">{productCount} item ditemukan</p>
      </div>

      {/* Product Grid */}
      {productsToShow.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productsToShow.map(product => (
            <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">Oops!</h2>
          <p className="text-text-muted mt-4">Tidak ada produk yang ditemukan di kategori ini.</p>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;