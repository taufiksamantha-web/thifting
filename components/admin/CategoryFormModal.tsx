import React, { useState, useEffect } from 'react';
import { Category } from '../../types';

interface CategoryFormModalProps {
  category: Category | null;
  onClose: () => void;
  onSave: (category: Category) => void;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({ category, onClose, onSave }) => {
  const [formState, setFormState] = useState<Category>({
    name: '',
    image: '',
  });

  useEffect(() => {
    if (category) {
      setFormState(category);
    } else {
      // Reset for new category
      setFormState({ name: '', image: '' });
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.image) {
      alert('Nama dan URL gambar tidak boleh kosong.');
      return;
    }
    onSave(formState);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-primary/80 backdrop-blur-xl border border-secondary/50 rounded-xl shadow-2xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-accent">{category ? 'Edit Kategori' : 'Tambah Kategori Baru'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-1">Nama Kategori</label>
            <input 
              type="text" 
              name="name" 
              value={formState.name} 
              onChange={handleChange} 
              className="w-full bg-background/50 border border-secondary rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent text-text-main"
              // Disable editing name for existing categories to avoid breaking relations
              // A better system would use IDs
              disabled={!!category} 
              required 
            />
             {category && <p className="text-xs text-amber-500 mt-1">Nama kategori tidak dapat diubah.</p>}
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-text-muted mb-1">URL Gambar</label>
            <input 
              type="text" 
              name="image" 
              value={formState.image} 
              onChange={handleChange} 
              className="w-full bg-background/50 border border-secondary rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent text-text-main" 
              required 
            />
          </div>
          <div className="flex justify-end gap-4 pt-6">
            <button type="button" onClick={onClose} className="bg-secondary text-text-main font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors">Batal</button>
            <button type="submit" className="bg-accent text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;