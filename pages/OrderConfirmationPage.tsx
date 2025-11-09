import React from 'react';
import { Product } from '../types';

interface OrderConfirmationPageProps {
  orderId: string;
  items: Product[];
  onContinueShopping: () => void;
}

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderId, items, onContinueShopping }) => {
  const total = items.reduce((acc, item) => acc + item.price, 0) + 25000; // with shipping

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="max-w-2xl mx-auto">
        <svg className="w-20 h-20 text-green-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h1 className="text-4xl font-serif text-accent mb-4">Terima Kasih Atas Pesanan Anda!</h1>
        <p className="text-text-muted mb-8">
          Pesanan Anda dengan nomor <strong className="text-text-main">{orderId}</strong> telah kami terima dan menunggu pembayaran.
        </p>
        
        <div className="bg-primary p-6 rounded-lg shadow-lg text-left mb-8">
            <h2 className="text-lg font-semibold text-text-main mb-4">Ringkasan Pesanan</h2>
            <ul className="space-y-3 mb-4">
              {items.map(item => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span className="text-text-muted">{item.name}</span>
                  <span className="text-text-main">Rp{item.price.toLocaleString('id-ID')}</span>
                </li>
              ))}
               <li className="flex justify-between text-sm">
                  <span className="text-text-muted">Pengiriman</span>
                  <span className="text-text-main">Rp25.000</span>
                </li>
            </ul>
            <div className="border-t border-secondary pt-4 flex justify-between font-bold">
                 <span className="text-text-main">Total</span>
                 <span className="text-accent">Rp{total.toLocaleString('id-ID')}</span>
            </div>
        </div>

        <div className="bg-secondary p-6 rounded-md text-sm text-left">
            <h3 className="font-semibold text-accent mb-2">Langkah Selanjutnya</h3>
            <p className="text-text-muted">
                1. Lakukan pembayaran sejumlah <strong className="text-text-main">Rp{total.toLocaleString('id-ID')}</strong> ke rekening Bank BCA <strong className="text-text-main">123-456-7890</strong> a/n Retrove Indonesia.
            </p>
            <p className="text-text-muted mt-2">
                2. Pesanan Anda akan kami kirimkan setelah pembayaran dikonfirmasi. Terima kasih telah berbelanja secara berkelanjutan!
            </p>
        </div>

        <button
          onClick={onContinueShopping}
          className="mt-10 bg-accent text-background font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all"
        >
          Kembali ke Halaman Utama
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;