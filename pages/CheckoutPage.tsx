// Fix: Implementing the CheckoutPage component with a form and order summary.
import React, { useState } from 'react';
import { Product } from '../types';

interface CheckoutPageProps {
  items: Product[];
  onPlaceOrder: (customerDetails: any) => void;
  onBackToCart: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ items, onPlaceOrder, onBackToCart }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const shippingCost = 25000;
  const total = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (formState.name && formState.email && formState.address) {
      onPlaceOrder(formState);
    } else {
      alert('Mohon isi semua field yang wajib diisi.');
    }
  };

  if (items.length === 0) {
      // This should ideally not happen if navigation is controlled, but as a fallback:
      return (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
              <h1 className="text-2xl">Tidak ada item untuk di-checkout.</h1>
              <button onClick={onBackToCart} className="mt-4 text-accent hover:underline">Kembali ke Keranjang</button>
          </div>
      )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={onBackToCart} className="text-accent hover:underline mb-8 text-sm">
        &larr; Kembali ke Keranjang
      </button>
      <h1 className="text-4xl font-serif text-accent text-center mb-12">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Shipping Details */}
        <div className="lg:col-span-2 bg-primary p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Alamat Pengiriman</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-1">Nama Lengkap</label>
              <input type="text" name="name" id="name" value={formState.name} onChange={handleInputChange} className="w-full bg-secondary border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent" required />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-1">Alamat Email</label>
              <input type="email" name="email" id="email" value={formState.email} onChange={handleInputChange} className="w-full bg-secondary border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent" required />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-text-muted mb-1">Alamat Lengkap</label>
              <textarea name="address" id="address" value={formState.address} onChange={handleInputChange} placeholder="Nama Jalan, No. Rumah, RT/RW" rows={3} className="w-full bg-secondary border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent" required />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-text-muted mb-1">Kota/Kabupaten</label>
              <input type="text" name="city" id="city" value={formState.city} onChange={handleInputChange} className="w-full bg-secondary border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent" required />
            </div>
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-text-muted mb-1">Kode Pos</label>
              <input type="text" name="zip" id="zip" value={formState.zip} onChange={handleInputChange} className="w-full bg-secondary border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent" required />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-primary p-6 rounded-lg shadow-lg sticky top-28">
            <h2 className="text-lg font-medium text-text-main mb-4">Ringkasan Pesanan</h2>
            <ul className="space-y-3 mb-4 border-b border-secondary pb-4">
                {items.map(item => (
                    <li key={item.id} className="flex justify-between items-start text-sm">
                        <span className="flex-1 pr-4 text-text-muted">{item.name}</span>
                        <span className="text-text-main font-medium">Rp{item.price.toLocaleString('id-ID')}</span>
                    </li>
                ))}
            </ul>
             <div className="space-y-2 border-b border-secondary pb-4">
              <div className="flex justify-between text-sm text-text-muted">
                <span>Subtotal</span>
                <span>Rp{subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-sm text-text-muted">
                <span>Pengiriman</span>
                <span>Rp{shippingCost.toLocaleString('id-ID')}</span>
              </div>
            </div>
            <div className="flex justify-between text-base font-bold text-text-main pt-4">
              <span>Total</span>
              <span>Rp{total.toLocaleString('id-ID')}</span>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-accent text-background font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Buat Pesanan
            </button>
            <p className="text-xs text-text-muted text-center mt-3">Dengan membuat pesanan, Anda setuju dengan Syarat & Ketentuan kami.</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
