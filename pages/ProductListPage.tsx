import React, { useState, useMemo, useEffect } from 'react';
import { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';
import ProductListItem from '../components/ProductListItem';

interface ProductListPageProps {
  products: Product[];
  category?: Category['name'];
  onSelectProduct: (product: Product) => void;
  onNavigateHome: () => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onCheckoutNow: (product: Product) => void;
}

const ProductListPage: React.FC<ProductListPageProps> = ({ products, category, onSelectProduct, onNavigateHome, onAddToCart, onQuickView, onCheckoutNow }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('newest');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Reset sort option to default when category changes for a consistent experience
  useEffect(() => {
    setSortOption('newest');
  }, [category]);

  const productsToShow = useMemo(() => {
    // 1. Initial filter by category
    let baseProducts;
    if (category && category !== 'Baru Masuk') {
      baseProducts = products.filter(p => p.category === category);
    } else {
      // 'Baru Masuk' and 'Semua Produk' start with all products
      baseProducts = [...products];
    }

    // 2. Filter by price range
    const min = parseFloat(priceRange.min);
    const max = parseFloat(priceRange.max);

    const filteredByPrice = baseProducts.filter(p => {
        const price = p.price;
        const minCondition = isNaN(min) || price >= min;
        const maxCondition = isNaN(max) || price <= max;
        return minCondition && maxCondition;
    });

    // 3. Sort the results
    const sortedProducts = [...filteredByPrice].sort((a, b) => {
        switch (sortOption) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'newest':
            default:
                // 'Baru Masuk' will default to this sort, as will others
                return b.id - a.id;
        }
    });

    return sortedProducts;
  }, [products, category, sortOption, priceRange]);
  
  const title = category ? `Koleksi ${category}` : 'Semua Produk';
  const productCount = productsToShow.length;

  const GridIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );

  const ListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-text-muted">
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
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif text-accent">{title}</h1>
        <p className="text-text-muted mt-2">{productCount} item ditemukan</p>
      </div>
      
      {/* Controls: Filter, Sort, View Switcher */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-primary rounded-lg shadow-md border border-secondary/50">
          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label htmlFor="sort" className="text-sm font-medium text-text-muted flex-shrink-0">Urutkan:</label>
                  <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="w-full sm:w-auto bg-background/50 border border-secondary rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent text-text-main text-sm">
                      <option value="newest">Terbaru</option>
                      <option value="price-asc">Harga: Terendah ke Tertinggi</option>
                      <option value="price-desc">Harga: Tertinggi ke Terendah</option>
                  </select>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label className="text-sm font-medium text-text-muted flex-shrink-0">Harga (Rp):</label>
                  <input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange(p => ({ ...p, min: e.target.value }))} className="w-full sm:w-24 bg-background/50 border border-secondary rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent text-text-main text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                  <span className="text-text-muted">-</span>
                  <input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange(p => ({ ...p, max: e.target.value }))} className="w-full sm:w-24 bg-background/50 border border-secondary rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent text-text-main text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
              </div>
          </div>

          {/* View Switcher */}
          <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-lg flex-shrink-0">
            <button 
              onClick={() => setViewMode('grid')} 
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-accent text-white' : 'hover:bg-primary/50 text-text-main'}`}
              aria-label="Grid View"
              title="Grid View"
            >
              <GridIcon />
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-accent text-white' : 'hover:bg-primary/50 text-text-main'}`}
              aria-label="List View"
              title="List View"
            >
              <ListIcon />
            </button>
          </div>
      </div>


      {/* Product Grid / List */}
      {productsToShow.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productsToShow.map(product => (
              <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} onQuickView={onQuickView} onCheckoutNow={onCheckoutNow} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {productsToShow.map(product => (
              <ProductListItem key={product.id} product={product} onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">Oops!</h2>
          <p className="text-text-muted mt-4">Tidak ada produk yang cocok dengan filter Anda.</p>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;