// Fix: Implementing the OrderDetailModal component.
import React, { useState } from 'react';
import { Order } from '../../types';

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose, onUpdateStatus }) => {
  const [status, setStatus] = useState<Order['status']>(order.status);

  const handleUpdate = () => {
    onUpdateStatus(order.id, status);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-primary/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-accent">Detail Pesanan</h2>
            <p className="font-mono text-sm text-text-muted">{order.id}</p>
          </div>
          <button onClick={onClose} className="text-3xl leading-none text-text-muted hover:text-accent">&times;</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm mb-6">
            <div>
                <h3 className="font-semibold text-text-main mb-1">Pelanggan</h3>
                <p className="text-text-muted">{order.customerName}</p>
                <p className="text-text-muted">{order.email}</p>
            </div>
             <div>
                <h3 className="font-semibold text-text-main mb-1">Alamat Pengiriman</h3>
                <p className="text-text-muted">{order.address}</p>
            </div>
            <div>
                <h3 className="font-semibold text-text-main mb-1">Tanggal Pesanan</h3>
                <p className="text-text-muted">{order.date}</p>
            </div>
             <div className="flex flex-col">
                <h3 className="font-semibold text-text-main mb-1">Status</h3>
                 <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value as Order['status'])}
                    className="bg-white/50 border border-secondary rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent text-text-main"
                >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </div>
        </div>

        <div>
            <h3 className="font-semibold text-text-main mb-2">Item yang Dipesan</h3>
            <div className="border-t border-secondary">
              <ul className="space-y-3 py-3">
                  {order.items.map(item => (
                      <li key={item.id} className="flex justify-between items-center text-sm">
                          <span className="text-text-muted">{item.name}</span>
                          <span className="text-text-main font-medium">Rp{item.price.toLocaleString('id-ID')}</span>
                      </li>
                  ))}
              </ul>
            </div>
             <div className="border-t border-secondary mt-2 pt-3 flex justify-between font-bold">
                 <span className='text-text-main'>Total Pesanan</span>
                 <span className="text-accent text-lg">Rp{order.total.toLocaleString('id-ID')}</span>
            </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
            <button onClick={onClose} className="bg-secondary text-text-main font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">Tutup</button>
            <button onClick={handleUpdate} className="bg-accent text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors">Update Status</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;