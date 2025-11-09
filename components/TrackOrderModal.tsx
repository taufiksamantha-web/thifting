
import React, { useState } from 'react';
import { Order } from '../types';
import OrderStatusTimeline from './OrderStatusTimeline';

interface TrackOrderModalProps {
  orders: Order[];
  onClose: () => void;
}

const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ orders, onClose }) => {
  const [orderId, setOrderId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSearchedOrder(null);
    const foundOrder = orders.find(o => o.id.toLowerCase() === orderId.toLowerCase().trim());
    if (foundOrder) {
      setSearchedOrder(foundOrder);
    } else {
      setError('Order ID tidak ditemukan. Mohon periksa kembali.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-primary rounded-lg shadow-xl w-full max-w-lg p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-3xl leading-none text-text-muted hover:text-accent">&times;</button>
        <h2 className="text-2xl font-semibold mb-6 text-accent">Lacak Pesanan Anda</h2>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input 
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Masukkan Order ID (e.g., RTV-1001)"
            className="flex-grow bg-secondary border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button type="submit" className="bg-accent text-background font-bold py-2 px-4 rounded-md hover:bg-opacity-90">Lacak</button>
        </form>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {searchedOrder && (
          <div className="mt-8 border-t border-secondary pt-6">
            <h3 className="font-semibold text-lg">Status untuk Order <span className="font-mono text-accent">{searchedOrder.id}</span></h3>
            <p className="text-sm text-text-muted mb-4">Pelanggan: {searchedOrder.customerName}</p>
            <OrderStatusTimeline status={searchedOrder.status} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderModal;
