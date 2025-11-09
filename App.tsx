import React, { useState, useEffect } from 'react';
import { Product, Category, Order, StaticPageType } from './types';
import { PRODUCTS_DATA, CATEGORIES as INITIAL_CATEGORIES, ORDERS_DATA } from './constants';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import StaticPage from './pages/StaticPage';
import AdminLayout from './components/admin/AdminLayout';
import TrackOrderModal from './components/TrackOrderModal';
import QuickViewModal from './components/QuickViewModal'; // Import new component

type Page = 'home' | 'productList' | 'productDetail' | 'cart' | 'checkout' | 'orderConfirmation' | 'staticPage';

const App: React.FC = () => {
    // STATE MANAGEMENT
    const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);
    const [orders, setOrders] = useState<Order[]>(ORDERS_DATA);
    const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
    const [isAdminView, setIsAdminView] = useState(false);
    
    // NAVIGATION STATE
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category['name'] | undefined>(undefined);
    const [staticPageType, setStaticPageType] = useState<StaticPageType>('faq');
    
    // CART & CHECKOUT STATE
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);
    const [lastOrderId, setLastOrderId] = useState<string | null>(null);

    // MODAL STATE
    const [isTrackOrderModalOpen, setIsTrackOrderModalOpen] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null); // Quick view state

    // Persist cart to localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem('retroveCart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('retroveCart', JSON.stringify(cartItems));
    }, [cartItems]);


    // NAVIGATION HANDLERS
    const handleNavigateHome = () => {
        setCurrentPage('home');
        setSelectedProduct(null);
        setSelectedCategory(undefined);
    };

    const handleSelectCategory = (category: Category['name'] | 'all') => {
        setCurrentPage('productList');
        setSelectedCategory(category === 'all' ? undefined : category);
        setSelectedProduct(null);
    };

    const handleSelectProduct = (product: Product) => {
        setCurrentPage('productDetail');
        setSelectedProduct(product);
    };
    
    const handleNavigateToCart = () => setCurrentPage('cart');
    const handleNavigateToStaticPage = (pageType: StaticPageType) => {
        setStaticPageType(pageType);
        setCurrentPage('staticPage');
    };

    // QUICK VIEW HANDLERS
    const handleOpenQuickView = (product: Product) => {
        setQuickViewProduct(product);
    };

    const handleCloseQuickView = () => {
        setQuickViewProduct(null);
    };
    
    const handleNavigateToProductDetailFromQuickView = (product: Product) => {
        handleCloseQuickView();
        handleSelectProduct(product);
    };

    // CART HANDLERS
    const handleAddToCart = (product: Product) => {
        if (!cartItems.find(item => item.id === product.id)) {
            setCartItems(prev => [...prev, product]);
            alert(`${product.name} telah ditambahkan ke keranjang!`);
        } else {
            alert('Item ini sudah ada di keranjang Anda.');
        }
    };
    
    const handleRemoveFromCart = (productId: number) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    // CHECKOUT & ORDER HANDLERS
    const handleCheckout = (items: Product[]) => {
        setCheckoutItems(items);
        setCurrentPage('checkout');
    };
    
    const handleCheckoutNow = (product: Product) => {
        handleCheckout([product]);
    };

    const handlePlaceOrder = (customerDetails: { name: string; email: string; address: string; }) => {
        const newOrderId = `RTV-${1001 + orders.length}`;
        const newOrder: Order = {
            id: newOrderId,
            customerName: customerDetails.name,
            email: customerDetails.email,
            address: customerDetails.address,
            date: new Date().toISOString().split('T')[0],
            total: checkoutItems.reduce((acc, item) => acc + item.price, 0) + 25000,
            status: 'Pending',
            items: checkoutItems,
        };

        setOrders(prev => [...prev, newOrder]);
        
        // Update product stock
        const itemIdsToUpdate = checkoutItems.map(item => item.id);
        setProducts(prev => prev.map(p => itemIdsToUpdate.includes(p.id) ? { ...p, inStock: false } : p));
        
        // Clear cart of ordered items
        setCartItems(prev => prev.filter(cartItem => !itemIdsToUpdate.includes(cartItem.id)));

        setLastOrderId(newOrderId);
        setCurrentPage('orderConfirmation');
        setCheckoutItems([]);
    };

    // ADMIN HANDLERS
    const handleAddProduct = (productData: Partial<Product>) => {
        const newProduct: Product = {
            id: Math.max(...products.map(p => p.id), 0) + 1,
            name: productData.name || 'New Product',
            description: productData.description || '',
            price: productData.price || 0,
            images: ['https://picsum.photos/id/500/800/800'], // Placeholder image
            category: productData.category || categories[0]?.name || 'Uncategorized',
            size: productData.size || 'One Size',
            material: productData.material || 'Unknown',
            condition: productData.condition || 'New',
            inStock: productData.inStock !== undefined ? productData.inStock : true,
            rating: 0,
            reviews: [],
            ...productData
        };
        setProducts(prev => [newProduct, ...prev]);
    };
    
    const handleUpdateProduct = (updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };
    
    const handleDeleteProduct = (productId: number) => {
        setProducts(prev => prev.filter(p => p.id !== productId));
    };

    const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    };
    
    // CATEGORY HANDLERS
    const handleAddCategory = (categoryData: Omit<Category, 'id'>) => {
        // Simple check to prevent duplicate names
        if (categories.some(c => c.name.toLowerCase() === categoryData.name.toLowerCase())) {
            alert('Kategori dengan nama tersebut sudah ada.');
            return;
        }
        const newCategory: Category = {
            ...categoryData
        };
        setCategories(prev => [...prev, newCategory]);
    };

    const handleUpdateCategory = (updatedCategory: Category) => {
        setCategories(prev => prev.map(c => c.name === updatedCategory.name ? updatedCategory : c));
    };
    
    const handleDeleteCategory = (categoryName: string) => {
         // Optional: Check if any product is using this category before deleting
        const isCategoryInUse = products.some(p => p.category === categoryName);
        if (isCategoryInUse) {
            alert(`Tidak dapat menghapus kategori "${categoryName}" karena masih digunakan oleh produk.`);
            return;
        }
        setCategories(prev => prev.filter(c => c.name !== categoryName));
    };


    // RENDER LOGIC
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage products={products} categories={categories} onSelectCategory={handleSelectCategory} onSelectProduct={handleSelectProduct} onAddToCart={handleAddToCart} onQuickView={handleOpenQuickView} onCheckoutNow={handleCheckoutNow} />;
            case 'productList':
                return <ProductListPage products={products} category={selectedCategory} onSelectProduct={handleSelectProduct} onNavigateHome={handleNavigateHome} onAddToCart={handleAddToCart} onQuickView={handleOpenQuickView} onCheckoutNow={handleCheckoutNow} />;
            case 'productDetail':
                if (!selectedProduct) return <p>Product not found.</p>;
                return <ProductDetailPage product={selectedProduct} allProducts={products} onBack={() => handleSelectCategory(selectedProduct.category)} onSelectProduct={handleSelectProduct} onAddToCart={handleAddToCart} onCheckoutNow={handleCheckoutNow} onQuickView={handleOpenQuickView} />;
            case 'cart':
                return <CartPage products={products} cartItems={cartItems} onRemoveItem={handleRemoveFromCart} onCheckout={handleCheckout} onContinueShopping={handleNavigateHome} />;
            case 'checkout':
                return <CheckoutPage items={checkoutItems} onPlaceOrder={handlePlaceOrder} onBackToCart={handleNavigateToCart} />;
            case 'orderConfirmation':
                if (!lastOrderId) return <p>Order details not found.</p>;
                const order = orders.find(o => o.id === lastOrderId);
                return <OrderConfirmationPage orderId={lastOrderId} items={order ? order.items : []} onContinueShopping={handleNavigateHome} />;
            case 'staticPage':
                return <StaticPage page={staticPageType} onNavigateHome={handleNavigateHome} />;
            default:
                return <HomePage products={products} categories={categories} onSelectCategory={handleSelectCategory} onSelectProduct={handleSelectProduct} onAddToCart={handleAddToCart} onQuickView={handleOpenQuickView} onCheckoutNow={handleCheckoutNow} />;
        }
    };
    
    if (isAdminView) {
        return <AdminLayout 
            onToggleView={() => setIsAdminView(false)}
            products={products}
            orders={orders}
            categories={categories}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onAddCategory={handleAddCategory}
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDeleteCategory}
        />;
    }

    return (
        <div className="font-sans min-h-screen flex flex-col">
            <Header 
                categories={categories}
                onSelectCategory={handleSelectCategory}
                onNavigateHome={handleNavigateHome}
                onNavigateToCart={handleNavigateToCart}
                onToggleView={() => setIsAdminView(true)}
                onTrackOrder={() => setIsTrackOrderModalOpen(true)}
                cartItemCount={cartItems.length}
            />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer categories={categories} onSelectCategory={handleSelectCategory} onNavigateToStaticPage={handleNavigateToStaticPage} />
            {isTrackOrderModalOpen && <TrackOrderModal orders={orders} onClose={() => setIsTrackOrderModalOpen(false)} />}
            {quickViewProduct && (
                <QuickViewModal 
                    product={quickViewProduct} 
                    onClose={handleCloseQuickView} 
                    onAddToCart={handleAddToCart} 
                    onViewFullDetails={handleNavigateToProductDetailFromQuickView} 
                />
            )}
        </div>
    );
};

export default App;