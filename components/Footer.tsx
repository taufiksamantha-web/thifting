import React from 'react';
import { StaticPageType, Category } from '../types';

interface FooterProps {
  categories: Category[];
  onSelectCategory: (category: Category['name'] | 'all') => void;
  onNavigateToStaticPage: (page: StaticPageType) => void;
}

const Footer: React.FC<FooterProps> = ({ categories, onSelectCategory, onNavigateToStaticPage }) => {
  const socialIcons = [
    <svg key="ig" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919 4.919 1.266.058 1.644.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" /></svg>,
    <svg key="tk" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.86-.95-6.43-2.88-1.57-1.92-2.18-4.56-1.8-7.18.38-2.62 1.96-4.94 4.08-6.25 2.12-1.31 4.76-1.64 7.18-1.02.34.09.67.22.98.36V0z" /></svg>,
    <svg key="tw" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.296 1.634 4.208 3.803 4.649-.6.164-1.24.223-1.88.132.645 1.956 2.508 3.379 4.6 3.419-2.07 1.623-4.678 2.588-7.52 2.588-.49 0-.974-.028-1.455-.086 2.392 1.536 5.232 2.427 8.3 2.427 9.96 0 15.413-8.24 15.135-15.49-1.043.743-2.268 1.226-3.58 1.417.96-.64 1.69-1.63 2.05-2.775z" /></svg>
  ];

  return (
    <footer className="bg-primary border-t border-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-serif text-accent mb-4">Retrove</h3>
            <p className="text-text-muted text-sm">Curated vintage and pre-loved clothing for the modern individual. Sustainable, unique, and full of character.</p>
          </div>
          <div>
            <h4 className="font-semibold text-text-main mb-4 tracking-wider">Toko</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onSelectCategory('Baru Masuk')} className="text-text-muted hover:text-accent transition-colors">Baru Masuk</button></li>
              {categories.slice(0, 4).map(cat => (
                  <li key={cat.name}><button onClick={() => onSelectCategory(cat.name)} className="text-text-muted hover:text-accent transition-colors">{cat.name}</button></li>
              ))}
              <li><button onClick={() => onSelectCategory('all')} className="text-text-muted hover:text-accent transition-colors">Semua</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-main mb-4 tracking-wider">Bantuan</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigateToStaticPage('contact')} className="text-text-muted hover:text-accent transition-colors">Kontak Kami</button></li>
              <li><button onClick={() => onNavigateToStaticPage('faq')} className="text-text-muted hover:text-accent transition-colors">FAQ</button></li>
              <li><button onClick={() => onNavigateToStaticPage('shipping')} className="text-text-muted hover:text-accent transition-colors">Pengiriman & Pengembalian</button></li>
              <li><button onClick={() => onNavigateToStaticPage('sizing')} className="text-text-muted hover:text-accent transition-colors">Panduan Ukuran</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-main mb-4 tracking-wider">Ikuti Kami</h4>
            <div className="flex space-x-4">
              {socialIcons.map((icon, index) => (
                <a key={index} href="#" className="text-text-muted hover:text-accent transition-colors">{icon}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-secondary text-center text-text-muted text-sm">
          {/* Fix: Replaced 'newgetFullYear' with 'new Date().getFullYear()' to get the current year. */}
          <p>&copy; {new Date().getFullYear()} Retrove. All Rights Reserved. A new life for old clothes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;