// Fix: Populating the constants.ts file with mock data for the application.
import { Product, Category, Review, Order } from './types';

export const REVIEWS: Review[] = [
    { id: 1, author: 'Budi Santoso', date: '12 April 2024', rating: 5, comment: 'Jaketnya keren banget, kondisinya masih seperti baru. Pengiriman juga cepat. Recommended!' },
    { id: 2, author: 'Citra Lestari', date: '10 April 2024', rating: 4, comment: 'Warnanya sedikit beda dari foto, tapi bahannya bagus dan ukurannya pas. Overall puas.' },
    { id: 3, author: 'Agus Wijaya', date: '5 April 2024', rating: 5, comment: 'Barang langka, akhirnya nemu di sini. Terima kasih Retrove!' },
];

export const PRODUCTS_DATA: Product[] = [
  // Existing 10 products with updated, reliable image URLs
  {
    id: 1,
    name: 'Jaket Denim Levis Vintage',
    description: 'Jaket denim klasik dari Levis era 90-an. Warna biru medium wash dengan sedikit efek pudar alami yang keren. Cocok untuk gaya kasual sehari-hari.',
    price: 450000,
    images: ['https://picsum.photos/seed/levis1/800', 'https://picsum.photos/seed/levis2/800', 'https://picsum.photos/seed/levis3/800'],
    category: 'Jaket',
    size: 'L',
    sizeDetails: 'P 68cm, L 55cm',
    material: 'Denim',
    condition: '9.5/10 - Excellent',
    inStock: true,
    rating: 4.8,
    reviews: [REVIEWS[0], REVIEWS[1]],
  },
  {
    id: 2,
    name: 'Kemeja Flanel Kotak-Kotak',
    description: 'Kemeja flanel tebal dengan motif kotak-kotak klasik warna merah dan hitam. Hangat dan nyaman, cocok untuk cuaca dingin atau sebagai outer.',
    price: 220000,
    images: ['https://picsum.photos/seed/flanel1/800', 'https://picsum.photos/seed/flanel2/800'],
    category: 'Kemeja',
    size: 'M',
    material: 'Flanel Katun',
    condition: '9/10 - Great',
    inStock: true,
    rating: 4.5,
    reviews: [REVIEWS[2]],
  },
  {
    id: 3,
    name: 'Celana Kargo Army',
    description: 'Celana kargo bergaya militer dengan banyak kantong. Bahan ripstop yang kuat dan tahan lama. Warna hijau army yang otentik.',
    price: 350000,
    images: ['https://picsum.photos/seed/kargo1/800', 'https://picsum.photos/seed/kargo2/800'],
    category: 'Celana',
    size: '32',
    sizeDetails: 'Lingkar Pinggang 82cm',
    material: 'Cotton Ripstop',
    condition: '8.5/10 - Very Good',
    inStock: false,
    rating: 4.2,
    reviews: [],
  },
  {
    id: 4,
    name: 'Topi Baseball Polo Sport',
    description: 'Topi baseball vintage dari Polo Sport Ralph Lauren. Warna navy dengan logo bordir di bagian depan. Kondisi masih sangat baik.',
    price: 180000,
    images: ['https://picsum.photos/seed/polohat/800'],
    category: 'Aksesori',
    size: 'One Size',
    material: 'Katun',
    condition: '9/10 - Great',
    inStock: true,
    rating: 0,
    reviews: [],
  },
  {
    id: 5,
    name: 'Jaket Harrington Merah',
    description: 'Jaket Harrington klasik berwarna merah cerah. Desain ikonik dengan lapisan dalam motif tartan. Sempurna untuk gaya smart-casual.',
    price: 380000,
    images: ['https://picsum.photos/seed/harrington1/800', 'https://picsum.photos/seed/harrington2/800'],
    category: 'Jaket',
    size: 'M',
    material: 'Katun Drill',
    condition: '9/10 - Great',
    inStock: true,
    rating: 4.6,
    reviews: [],
  },
  {
    id: 6,
    name: 'Kemeja Hawaii Vintage',
    description: 'Kemeja lengan pendek dengan motif floral khas Hawaii. Warna dasar biru dengan bunga-bunga tropis. Bahan rayon yang adem dan jatuh.',
    price: 200000,
    images: ['https://picsum.photos/seed/hawaii1/800', 'https://picsum.photos/seed/hawaii2/800'],
    category: 'Kemeja',
    size: 'XL',
    material: 'Rayon',
    condition: '8/10 - Good',
    inStock: true,
    rating: 4.0,
    reviews: [],
  },
    {
    id: 7,
    name: 'Celana Chino Coklat',
    description: 'Celana chino klasik warna coklat khaki. Potongan slim-fit yang modern. Bahan katun twill yang nyaman untuk dipakai seharian.',
    price: 250000,
    images: ['https://picsum.photos/seed/chino1/800', 'https://picsum.photos/seed/chino2/800'],
    category: 'Celana',
    size: '30',
    material: 'Katun Twill',
    condition: '9.5/10 - Excellent',
    inStock: true,
    rating: 0,
    reviews: [],
  },
  {
    id: 8,
    name: 'Tas Selempang Kulit',
    description: 'Tas selempang dari kulit asli yang sudah menua dengan indah. Ukuran medium, cukup untuk membawa barang esensial. Desain timeless.',
    price: 550000,
    images: ['https://picsum.photos/seed/leathertas/800'],
    category: 'Aksesori',
    size: 'Medium',
    material: 'Kulit Asli',
    condition: '8.5/10 - Very Good, with patina',
    inStock: true,
    rating: 5,
    reviews: [],
  },
  {
    id: 9,
    name: 'Jaket Windbreaker 80s',
    description: 'Jaket windbreaker dengan color-blocking khas tahun 80an. Warna ungu, tosca, dan pink yang mencolok. Ringan dan cocok untuk layering.',
    price: 320000,
    images: ['https://picsum.photos/seed/windbreaker1/800', 'https://picsum.photos/seed/windbreaker2/800'],
    category: 'Jaket',
    size: 'L',
    material: 'Nylon',
    condition: '8/10 - Good',
    inStock: true,
    rating: 4.3,
    reviews: [],
  },
  {
    id: 10,
    name: 'Kemeja Chambray Biru Muda',
    description: 'Kemeja lengan panjang bahan chambray yang ringan dan adem. Warna biru muda yang versatile, mudah dipadupadankan.',
    price: 210000,
    images: ['https://picsum.photos/seed/chambray1/800', 'https://picsum.photos/seed/chambray2/800'],
    category: 'Kemeja',
    size: 'S',
    material: 'Chambray',
    condition: '9/10 - Great',
    inStock: false,
    rating: 4.7,
    reviews: [],
  },
  // Generated 90 new products with updated, reliable image URLs
  ...Array.from({ length: 90 }, (_, i) => {
    const id = 11 + i;
    const categories = ['Jaket', 'Kemeja', 'Celana', 'Aksesori', 'Sweater', 'Rok'];
    const productTypes = {
      'Jaket': ['Bomber', 'Varsity', 'Denim', 'Windbreaker'],
      'Kemeja': ['Flanel', 'Chambray', 'Hawaii', 'Lengan Panjang'],
      'Celana': ['Jeans', 'Kargo', 'Chino', 'Corduroy'],
      'Aksesori': ['Topi', 'Tas Selempang', 'Ikat Pinggang'],
      'Sweater': ['Crewneck', 'Hoodie', 'Rajut'],
      'Rok': ['Mini Denim', 'Midi Plisket', 'Maxi Floral'],
    };
    const brands = ['Adidas', 'Nike', 'Champion', 'Fila', 'Uniqlo', 'Levis', 'Polo Ralph Lauren', 'Tommy Hilfiger', 'Zara', 'Stussy'];
    const adjectives = ['Vintage', 'Retro', 'Oversized', 'Klasik', 'Langka', '90an', '80an', 'Y2K'];
    const colors = ['Merah', 'Biru Tua', 'Hijau Army', 'Hitam Pekat', 'Putih Gading', 'Abu-abu', 'Coklat Karamel', 'Ungu'];
    const materials = ['Katun', 'Denim', 'Wol', 'Kulit Sintetis', 'Nilon', 'Polyester', 'Rayon', 'Corduroy'];
    const sizes = ['S', 'M', 'L', 'XL', 'One Size', '28', '30', '32', '34', '36'];
    const conditions = ['10/10 - Mint', '9.5/10 - Excellent', '9/10 - Great', '8.5/10 - Very Good', '8/10 - Good', '7.5/10 - Decent'];

    const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
    const category = getRandom(categories);
    const type = getRandom(productTypes[category as keyof typeof productTypes]);
    const brand = getRandom(brands);
    const adjective = getRandom(adjectives);
    const color = getRandom(colors);
    
    return {
      id,
      name: `${type} ${brand} ${adjective} ${color}`,
      description: `Sebuah item ${adjective.toLowerCase()} yang otentik, ${type.toLowerCase()} ${brand.toLowerCase()} berwarna ${color.toLowerCase()}. Dibuat dengan bahan berkualitas tinggi, item ini menawarkan gaya dan kenyamanan. Sempurna untuk melengkapi koleksi fashion berkelanjutan Anda. Item unik ini hanya ada satu, jadi jangan sampai ketinggalan.`,
      price: (Math.floor(Math.random() * 61) + 15) * 10000, // 150k to 750k
      images: [
          `https://picsum.photos/seed/${id}-a/800`, 
          `https://picsum.photos/seed/${id}-b/800`, 
          `https://picsum.photos/seed/${id}-c/800`
      ],
      category,
      size: getRandom(sizes),
      material: getRandom(materials),
      condition: getRandom(conditions),
      inStock: Math.random() > 0.15,
      rating: parseFloat((Math.random() * (5.0 - 3.8) + 3.8).toFixed(1)),
      reviews: [],
    };
  }),
];

export const CATEGORIES: Category[] = [
  { name: 'Jaket', image: 'https://picsum.photos/seed/jackets/500' },
  { name: 'Kemeja', image: 'https://picsum.photos/seed/shirts/500' },
  { name: 'Celana', image: 'https://picsum.photos/seed/pants/500' },
  { name: 'Sweater', image: 'https://picsum.photos/seed/sweaters/500' },
  { name: 'Rok', image: 'https://picsum.photos/seed/skirts/500' },
  { name: 'Aksesori', image: 'https://picsum.photos/seed/accessories/500' },
];

export const ORDERS_DATA: Order[] = [
    { id: 'RTV-1001', customerName: 'Dewi Anggraini', email: 'dewi@example.com', address: 'Jl. Merdeka No. 17, Jakarta', date: '2024-05-20', total: 670000, status: 'Shipped', items: [PRODUCTS_DATA[0], PRODUCTS_DATA[1]] },
    { id: 'RTV-1002', customerName: 'Eko Prasetyo', email: 'eko@example.com', address: 'Jl. Sudirman No. 22, Bandung', date: '2024-05-19', total: 205000, status: 'Delivered', items: [PRODUCTS_DATA[3]] },
    { id: 'RTV-1003', customerName: 'Fitriani', email: 'fitri@example.com', address: 'Jl. Gajah Mada No. 8, Surabaya', date: '2024-05-21', total: 405000, status: 'Paid', items: [PRODUCTS_DATA[4]] },
    { id: 'RTV-1004', customerName: 'Galih Nugroho', email: 'galih@example.com', address: 'Jl. Pahlawan No. 45, Semarang', date: '2024-05-22', total: 225000, status: 'Pending', items: [PRODUCTS_DATA[5]] },
];