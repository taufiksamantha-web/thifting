// Fix: Implementing the AdminLayout component.
import React, { useState } from 'react';
import { Product, Order } from '../../types';
import ProductFormModal from './ProductFormModal';
import OrderDetailModal from './OrderDetailModal';

type AdminPage = 'dashboard' | 'products' | 'orders';

interface AdminLayoutProps {
    onToggleView: () => void;
    products: Product[];
    orders: Order[];
    onAddProduct: (productData: Partial<Product>) => void;
    onUpdateProduct: (product: Product) => void;
    onDeleteProduct: (productId: number) => void;
    onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-secondary p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="text-accent bg-primary p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-sm text-text-muted">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const AdminLayout: React.FC<AdminLayoutProps> = ({ onToggleView, products, orders, onAddProduct, onUpdateProduct, onDeleteProduct, onUpdateOrderStatus }) => {
    const [page, setPage] = useState<AdminPage>('dashboard');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    
    const handleSaveProduct = (productData: Partial<Product>) => {
        if (productData.id) {
            onUpdateProduct(productData as Product);
        } else {
            onAddProduct(productData);
        }
        setIsProductModalOpen(false);
        setSelectedProduct(null);
    };

    const handleDeleteClick = (product: Product) => {
        if (window.confirm(`Anda yakin ingin menghapus "${product.name}"?`)) {
            onDeleteProduct(product.id);
        }
    }

    const renderPage = () => {
        switch (page) {
            case 'products':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">Manajemen Produk ({products.length})</h2>
                            <button onClick={() => { setSelectedProduct(null); setIsProductModalOpen(true); }} className="bg-accent text-background font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Tambah Produk</button>
                        </div>
                        <div className="bg-secondary rounded-lg overflow-x-auto">
                            <table className="w-full text-left min-w-[600px]">
                                <thead className="bg-primary">
                                    <tr>
                                        <th className="p-4">Nama Produk</th>
                                        <th className="p-4">Kategori</th>
                                        <th className="p-4">Harga</th>
                                        <th className="p-4">Stok</th>
                                        <th className="p-4">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id} className="border-b border-primary">
                                            <td className="p-4 font-medium">{p.name}</td>
                                            <td className="p-4">{p.category}</td>
                                            <td className="p-4">Rp{p.price.toLocaleString('id-ID')}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${p.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                    {p.inStock ? 'Tersedia' : 'Terjual'}
                                                </span>
                                            </td>
                                            <td className="p-4 space-x-4">
                                                <button onClick={() => { setSelectedProduct(p); setIsProductModalOpen(true); }} className="text-accent hover:underline">Edit</button>
                                                <button onClick={() => handleDeleteClick(p)} className="text-red-500 hover:underline">Hapus</button>
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
                        <h2 className="text-2xl font-semibold mb-6">Manajemen Pesanan ({orders.length})</h2>
                        <div className="bg-secondary rounded-lg overflow-x-auto">
                             <table className="w-full text-left min-w-[700px]">
                                <thead className="bg-primary">
                                    <tr>
                                        <th className="p-4">Order ID</th>
                                        <th className="p-4">Pelanggan</th>
                                        <th className="p-4">Tanggal</th>
                                        <th className="p-4">Total</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(o => (
                                        <tr key={o.id} className="border-b border-primary">
                                            <td className="p-4 font-mono text-accent">{o.id}</td>
                                            <td className="p-4">{o.customerName}</td>
                                            <td className="p-4">{o.date}</td>
                                            <td className="p-4">Rp{o.total.toLocaleString('id-ID')}</td>
                                            <td className="p-4"><span className="font-semibold">{o.status}</span></td>
                                            <td className="p-4"><button onClick={() => setSelectedOrder(o)} className="text-accent hover:underline">Detail</button></td>
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
                        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
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
            {/* Sidebar */}
            <aside className="w-64 bg-primary flex-shrink-0 p-6 flex flex-col">
                <div className="flex items-center space-x-2 mb-10">
                     <svg className="h-8 w-8 text-accent" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 30 C20 10, 40 10, 50 30 S80 50, 80 70 C80 90, 60 90, 50 70 S20 50, 20 30" fill="none" stroke="currentColor" strokeWidth="5"/>
                        <path d="M50 30 L50 70" stroke="currentColor" strokeWidth="5"/>
                    </svg>
                    <span className="text-2xl font-serif font-bold tracking-wider text-accent">Retrove</span>
                </div>
                <nav className="flex-grow">
                    <ul className="space-y-2">
                        <li><button onClick={() => setPage('dashboard')} className={`w-full text-left p-3 rounded-md transition-colors ${page === 'dashboard' ? 'bg-accent text-background' : 'hover:bg-secondary'}`}>Dashboard</button></li>
                        <li><button onClick={() => setPage('products')} className={`w-full text-left p-3 rounded-md transition-colors ${page === 'products' ? 'bg-accent text-background' : 'hover:bg-secondary'}`}>Produk</button></li>
                        <li><button onClick={() => setPage('orders')} className={`w-full text-left p-3 rounded-md transition-colors ${page === 'orders' ? 'bg-accent text-background' : 'hover:bg-secondary'}`}>Pesanan</button></li>
                    </ul>
                </nav>
                <div>
                     <button onClick={onToggleView} className="w-full text-left p-3 rounded-md hover:bg-secondary transition-colors">
                        &larr; Kembali ke Toko
                    </button>
                </div>
            </aside>
            
            {/* Main Content */}
            <main className="flex-grow p-10 overflow-auto">
                {renderPage()}
            </main>
            
            {/* Modals */}
            {isProductModalOpen && (
                <ProductFormModal 
                    product={selectedProduct} 
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
        </div>
    );
};

export default AdminLayout;