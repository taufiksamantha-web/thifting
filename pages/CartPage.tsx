import React from 'react';
import { Product } from '../types';

interface CartPageProps {
  cartItems: Product[];
  onRemoveItem: (productId: number) => void;
  onCheckout: (items: Product[]) => void;
  onContinueShopping: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, onRemoveItem, onCheckout, onContinueShopping }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shippingCost = 25000; // Flat rate for example
  const total = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl font-serif text-accent mb-4">Keranjang Belanja Anda Kosong</h1>
        <p className="text-text-muted mb-8">Sepertinya Anda belum menambahkan item apapun.</p>
        <button
          onClick={onContinueShopping}
          className="bg-accent text-background font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all"
        >
          Mulai Belanja
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif text-accent text-center mb-12">Keranjang Belanja</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-primary p-6 rounded-lg shadow-lg">
          <ul role="list" className="divide-y divide-secondary">
            {cartItems.map((product) => (
              <li key={product.id} className="flex py-6">
                <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border border-secondary">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-text-main">
                      <h3>{product.name}</h3>
                      <p className="ml-4">Rp{product.price.toLocaleString('id-ID')}</p>
                    </div>
                    <p className="mt-1 text-sm text-text-muted">{product.size}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty 1 (Unique Item)</p>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => onRemoveItem(product.id)}
                        className="font-medium text-red-500 hover:text-red-400"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-primary p-6 rounded-lg shadow-lg sticky top-28">
            <h2 className="text-lg font-medium text-text-main mb-4">Ringkasan Pesanan</h2>
            <div className="space-y-2 border-b border-secondary pb-4">
              <div className="flex justify-between text-sm text-text-muted">
                <span>Subtotal</span>
                <span>Rp{subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-sm text-text-muted">
                <span>Pengiriman (Flat Rate)</span>
                <span>Rp{shippingCost.toLocaleString('id-ID')}</span>
              </div>
            </div>
            <div className="flex justify-between text-base font-bold text-text-main pt-4">
              <span>Total</span>
              <span>Rp{total.toLocaleString('id-ID')}</span>
            </div>
            <button
              onClick={() => onCheckout(cartItems)}
              className="mt-6 w-full bg-accent text-background font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Lanjutkan ke Pembayaran
            </button>
            <div className="mt-6 flex justify-center text-center text-sm text-text-muted">
              <p>
                atau{' '}
                <button
                  type="button"
                  onClick={onContinueShopping}
                  className="font-medium text-accent hover:text-opacity-80"
                >
                  Lanjutkan Belanja<span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;