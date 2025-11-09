// Fix: Implementing the ProductFormModal component.
import React, { useState, useEffect } from 'react';
import { Product, Category } from '../../types';

interface ProductFormModalProps {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ product, categories, onClose, onSave }) => {
  const [formState, setFormState] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: categories[0]?.name || '',
    size: '',
    inStock: true,
  });

  useEffect(() => {
    if (product) {
      setFormState(product);
    } else {
      // Reset for new product
      setFormState({
        name: '', description: '', price: 0, category: categories[0]?.name || '', size: '', inStock: true, images: [],
      });
    }
  }, [product, categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setFormState(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormState(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) || 0 : value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-primary/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 text-accent">{product ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-1">Nama Produk</label>
            <input type="text" name="name" value={formState.name} onChange={handleChange} className="w-full bg-white/50 border border-secondary rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent text-text-main" required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text-muted mb-1">Deskripsi</label>
            <textarea name="description" value={formState.description} onChange={handleChange} rows={4} className="w-full bg-white/50 border border-secondary rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent text-text-main"></textarea>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-text-muted mb-1">Harga (Rp)</label>
              <input type="number" name="price" value={formState.price} onChange={handleChange} className="w-full bg-white/50 border border-secondary rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent text-text-main" required />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-text-muted mb-1">Kategori</label>
              <select name="category" value={formState.category} onChange={handleChange} className="w-full bg-white/50 border border-secondary rounded-md py-2 px-3 h-[42px] focus:outline-none focus:ring-2 focus:ring-accent text-text-main">
                {categories.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-text-muted mb-1">Ukuran</label>
              <input type="text" name="size" value={formState.size} onChange={handleChange} className="w-full bg-white/50 border border-secondary rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent text-text-main" />
            </div>
             <div>
              <label htmlFor="inStock" className="block text-sm font-medium text-text-muted mb-1">Status</label>
               <div className="flex items-center h-[42px] bg-white/50 border border-secondary rounded-md px-3">
                <input id="inStock" type="checkbox" name="inStock" checked={!!formState.inStock} onChange={handleChange} className="h-5 w-5 rounded text-accent bg-secondary border-gray-300 focus:ring-accent" />
                <label htmlFor="inStock" className="ml-2 text-text-main">Tersedia</label>
               </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-6">
            <button type="button" onClick={onClose} className="bg-secondary text-text-main font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">Batal</button>
            <button type="submit" className="bg-accent text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;