// Fix: Populating the types.ts file with all the necessary type definitions.
export interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'Jaket' | 'Kemeja' | 'Celana' | 'Aksesori';
  size: string;
  sizeDetails?: string;
  material: string;
  condition: string; // e.g., "9/10, Like New"
  inStock: boolean;
  rating: number;
  reviews: Review[];
}

export interface Category {
  name: 'Jaket' | 'Kemeja' | 'Celana' | 'Aksesori' | 'Baru Masuk';
  image: string;
}

export type StaticPageType = 'contact' | 'faq' | 'shipping' | 'sizing';

export interface Order {
    id: string;
    customerName: string;
    email: string;
    address: string;
    date: string;
    total: number;
    status: 'Pending' | 'Paid' | 'Shipped' | 'Delivered';
    items: Product[];
}
