// Fix: Implementing the AdminLayout component.
import React, { useState } from 'react';
import { Product, Order, Category } from '../../types';
import ProductFormModal from './ProductFormModal';
import OrderDetailModal from './OrderDetailModal';
import CategoryFormModal from './CategoryFormModal';

type AdminPage = 'dashboard' | 'products' | 'orders' | 'categories';

interface AdminLayoutProps {
    onToggleView: () => void;
    products: Product[];
    orders: Order[];
    categories: Category[];
    onAddProduct: (productData: Partial<Product>) => void;
    onUpdateProduct: (product: Product) => void;
    onDeleteProduct: (productId: number) => void;
    onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
    onAddCategory: (categoryData: Omit<Category, 'id'>) => void;
    onUpdateCategory: (category: Category) => void;
    onDeleteCategory: (categoryName: string) => void;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-primary p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="text-accent bg-accent/10 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-sm text-text-muted">{title}</p>
            <p className="text-2xl font-bold text-text-main">{value}</p>
        </div>
    </div>
);

const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
    const { onToggleView, products, orders, categories, onAddProduct, onUpdateProduct, onDeleteProduct, onUpdateOrderStatus, onAddCategory, onUpdateCategory, onDeleteCategory } = props;
    const [page, setPage] = useState<AdminPage>('dashboard');
    
    // Modal states
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    
    // Mobile sidebar state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const handleSaveProduct = (productData: Partial<Product>) => {
        if (productData.id) {
            onUpdateProduct(productData as Product);
        } else {
            onAddProduct(productData);
        }
        setIsProductModalOpen(false);
        setSelectedProduct(null);
    };

    const handleDeleteProductClick = (product: Product) => {
        if (window.confirm(`Anda yakin ingin menghapus "${product.name}"?`)) {
            onDeleteProduct(product.id);
        }
    }

    const handleSaveCategory = (categoryData: Category) => {
        // A bit of a hack: if the original name exists, it's an update.
        // A proper solution would use IDs.
        const originalCategory = categories.find(c => c.name === selectedCategory?.name);
        if(originalCategory) {
            onUpdateCategory(categoryData);
        } else {
            onAddCategory(categoryData);
        }
        setIsCategoryModalOpen(false);
        setSelectedCategory(null);
    };

    const handleDeleteCategoryClick = (category: Category) => {
        if (window.confirm(`Anda yakin ingin menghapus kategori "${category.name}"?`)) {
            onDeleteCategory(category.name);
        }
    };


    const renderPage = () => {
        switch (page) {
            case 'products':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-text-main">Manajemen Produk ({products.length})</h2>
                            <button onClick={() => { setSelectedProduct(null); setIsProductModalOpen(true); }} className="bg-accent text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition">Tambah Produk</button>
                        </div>
                        <div className="bg-primary rounded-lg shadow-md overflow-x-auto">
                            <table className="w-full text-left min-w-[600px]">
                                <thead className="border-b border-secondary">
                                    <tr>
                                        <th className="p-4 font-semibold">Nama Produk</th>
                                        <th className="p-4 font-semibold">Kategori</th>
                                        <th className="p-4 font-semibold">Harga</th>
                                        <th className="p-4 font-semibold">Stok</th>
                                        <th className="p-4 font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id} className="border-b border-secondary last:border-b-0">
                                            <td className="p-4 font-medium text-text-main">{p.name}</td>
                                            <td className="p-4 text-text-muted">{p.category}</td>
                                            <td className="p-4 text-text-muted">Rp{p.price.toLocaleString('id-ID')}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${p.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {p.inStock ? 'Tersedia' : 'Terjual'}
                                                </span>
                                            </td>
                                            <td className="p-4 space-x-4">
                                                <button onClick={() => { setSelectedProduct(p); setIsProductModalOpen(true); }} className="text-accent hover:underline font-medium">Edit</button>
                                                <button onClick={() => handleDeleteProductClick(p)} className="text-red-500 hover:underline font-medium">Hapus</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'orders':
                 return (
                    <div>
                        <h2 className="text-2xl font-semibold text-text-main mb-6">Manajemen Pesanan ({orders.length})</h2>
                        <div className="bg-primary rounded-lg shadow-md overflow-x-auto">
                             <table className="w-full text-left min-w-[700px]">
                                <thead className="border-b border-secondary">
                                    <tr>
                                        <th className="p-4 font-semibold">Order ID</th>
                                        <th className="p-4 font-semibold">Pelanggan</th>
                                        <th className="p-4 font-semibold">Tanggal</th>
                                        <th className="p-4 font-semibold">Total</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(o => (
                                        <tr key={o.id} className="border-b border-secondary last:border-b-0">
                                            <td className="p-4 font-mono text-accent">{o.id}</td>
                                            <td className="p-4 text-text-main">{o.customerName}</td>
                                            <td className="p-4 text-text-muted">{o.date}</td>
                                            <td className="p-4 text-text-muted">Rp{o.total.toLocaleString('id-ID')}</td>
                                            <td className="p-4 text-text-main"><span className="font-semibold">{o.status}</span></td>
                                            <td className="p-4"><button onClick={() => setSelectedOrder(o)} className="text-accent hover:underline font-medium">Detail</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'categories':
                 return (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-text-main">Manajemen Kategori ({categories.length})</h2>
                            <button onClick={() => { setSelectedCategory(null); setIsCategoryModalOpen(true); }} className="bg-accent text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition">Tambah Kategori</button>
                        </div>
                        <div className="bg-primary rounded-lg shadow-md overflow-x-auto">
                            <table className="w-full text-left min-w-[600px]">
                                <thead className="border-b border-secondary">
                                    <tr>
                                        <th className="p-4 font-semibold">Gambar</th>
                                        <th className="p-4 font-semibold">Nama Kategori</th>
                                        <th className="p-4 font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map(c => (
                                        <tr key={c.name} className="border-b border-secondary last:border-b-0">
                                            <td className="p-4">
                                                <img src={c.image} alt={c.name} className="w-16 h-16 object-cover rounded-md"/>
                                            </td>
                                            <td className="p-4 font-medium text-text-main">{c.name}</td>
                                            <td className="p-4 space-x-4">
                                                <button onClick={() => { setSelectedCategory(c); setIsCategoryModalOpen(true); }} className="text-accent hover:underline font-medium">Edit</button>
                                                <button onClick={() => handleDeleteCategoryClick(c)} className="text-red-500 hover:underline font-medium">Hapus</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'dashboard':
            default:
                const totalRevenue = orders.filter(o => o.status !== 'Pending').reduce((acc, o) => acc + o.total, 0);
                return (
                    <div>
                        <h2 className="text-2xl font-semibold text-text-main mb-6">Dashboard</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard title="Total Pendapatan" value={`Rp${(totalRevenue/1000).toFixed(0)} K`} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} />
                            <StatCard title="Total Pesanan" value={orders.length} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} />
                            <StatCard title="Total Produk" value={products.length} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>} />
                             <StatCard title="Pesanan Pending" value={orders.filter(o => o.status === 'Pending').length} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                        </div>
                    </div>
                );
        }
    };
    
    return (
        <div className="min-h-screen bg-background flex text-text-main">
             {/* Overlay for mobile sidebar */}
            {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden"></div>}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 bg-primary shadow-lg w-64 p-6 flex flex-col transform transition-transform duration-300 ease-in-out z-50 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center space-x-2 mb-10">
                     <svg className="h-8 w-8 text-accent" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 30 C20 10, 40 10, 50 30 S80 50, 80 70 C80 90, 60 90, 50 70 S20 50, 20 30" fill="none" stroke="currentColor" strokeWidth="5"/>
                        <path d="M50 30 L50 70" stroke="currentColor" strokeWidth="5"/>
                    </svg>
                    <span className="text-2xl font-serif font-bold tracking-wider text-accent">Retrove</span>
                </div>
                <nav className="flex-grow">
                    <ul className="space-y-2">
                        <li><button onClick={() => setPage('dashboard')} className={`w-full text-left font-semibold p-3 rounded-md transition-colors ${page === 'dashboard' ? 'bg-accent text-white' : 'hover:bg-secondary text-text-main'}`}>Dashboard</button></li>
                        <li><button onClick={() => setPage('products')} className={`w-full text-left font-semibold p-3 rounded-md transition-colors ${page === 'products' ? 'bg-accent text-white' : 'hover:bg-secondary text-text-main'}`}>Produk</button></li>
                        <li><button onClick={() => setPage('orders')} className={`w-full text-left font-semibold p-3 rounded-md transition-colors ${page === 'orders' ? 'bg-accent text-white' : 'hover:bg-secondary text-text-main'}`}>Pesanan</button></li>
                        <li><button onClick={() => setPage('categories')} className={`w-full text-left font-semibold p-3 rounded-md transition-colors ${page === 'categories' ? 'bg-accent text-white' : 'hover:bg-secondary text-text-main'}`}>Kategori</button></li>
                    </ul>
                </nav>
                <div>
                     <button onClick={onToggleView} className="w-full text-left p-3 rounded-md hover:bg-secondary text-text-main font-semibold transition-colors">
                        &larr; Kembali ke Toko
                    </button>
                </div>
            </aside>
            
            {/* Main Content */}
            <div className="flex-grow flex flex-col">
                {/* Mobile Header */}
                <header className="md:hidden bg-primary/80 backdrop-blur-lg shadow-sm p-4 flex items-center justify-between sticky top-0 z-30">
                     <button onClick={() => setIsSidebarOpen(true)} className="text-text-main">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                     </button>
                      <span className="text-lg font-serif font-bold text-accent">Admin Panel</span>
                </header>
                <main className="flex-grow p-6 sm:p-10 overflow-auto">
                    {renderPage()}
                </main>
            </div>
            
            {/* Modals */}
            {isProductModalOpen && (
                <ProductFormModal 
                    product={selectedProduct} 
                    categories={categories}
                    onClose={() => setIsProductModalOpen(false)} 
                    onSave={handleSaveProduct}
                />
            )}
            {selectedOrder && (
                <OrderDetailModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onUpdateStatus={onUpdateOrderStatus}
                />
            )}
            {isCategoryModalOpen && (
                <CategoryFormModal
                    category={selectedCategory}
                    onClose={() => setIsCategoryModalOpen(false)}
                    onSave={handleSaveCategory}
                />
            )}
        </div>
    );
};

export default AdminLayout;