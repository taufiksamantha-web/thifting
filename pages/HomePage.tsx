import React from 'react';
import { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  products: Product[];
  categories: Category[];
  onSelectCategory: (category: Category['name']) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onCheckoutNow: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, categories, onSelectCategory, onSelectProduct, onAddToCart, onQuickView, onCheckoutNow }) => {
  const newArrivals = [...products].sort((a,b) => b.id - a.id).slice(0, 4);

  // Simulate logic for featured products. In a real app, this would come from analytics.
  const bestSellingIds = [1, 5, 6, 8];
  const mostSearchedIds = [2, 9, 7, 4];
  
  const bestSellingProducts = products.filter(p => bestSellingIds.includes(p.id));
  const mostSearchedProducts = products.filter(p => mostSearchedIds.includes(p.id));


  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/id/10/1600/900')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight">A New Life for Old Clothes</h1>
          <p className="text-lg text-gray-200 mt-4 max-w-2xl">Discover unique, hand-picked vintage pieces that tell a story. Sustainable fashion for the conscious soul.</p>
          <button 
            onClick={() => onSelectCategory('Baru Masuk')}
            className="mt-8 bg-accent text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all text-lg"
          >
            Shop New Arrivals
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center text-accent mb-12">Jelajahi Kategori</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map(category => (
              <div 
                key={category.name} 
                className="group relative rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
                onClick={() => onSelectCategory(category.name)}
              >
                <img src={category.image} alt={category.name} className="w-full h-full object-cover aspect-square transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                  <h3 className="text-xl font-semibold text-white tracking-wider uppercase text-center">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center text-accent mb-12">Baru Masuk</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} onQuickView={onQuickView} onCheckoutNow={onCheckoutNow} />
            ))}
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={() => onSelectCategory('Baru Masuk')}
              className="text-accent font-semibold border-b-2 border-accent hover:border-text-main transition-colors"
            >
              Lihat Semua Koleksi &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Best Selling Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center text-accent mb-12">Produk Terlaris</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellingProducts.map(product => (
              <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} onQuickView={onQuickView} onCheckoutNow={onCheckoutNow} />
            ))}
          </div>
        </div>
      </section>

      {/* Most Searched Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center text-accent mb-12">Paling Banyak Dicari</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mostSearchedProducts.map(product => (
              <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} onQuickView={onQuickView} onCheckoutNow={onCheckoutNow} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;