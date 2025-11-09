import React from 'react';
import { StaticPageType } from '../types';

interface StaticPageProps {
  page: StaticPageType;
  onNavigateHome: () => void;
}

const pageContent = {
  faq: {
    title: 'Frequently Asked Questions (FAQ)',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-accent">Bagaimana kondisi barang yang dijual?</h3>
          <p>Setiap item kami kurasi dan periksa dengan teliti. Kami memberikan rating kondisi (misal: 9/10) dan deskripsi jujur tentang setiap kekurangan minor. Kami hanya menjual pakaian bekas berkualitas tinggi.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-accent">Apakah barang bisa dikembalikan?</h3>
          <p>Karena setiap item adalah unik (stok hanya 1), kami tidak menerima pengembalian atau penukaran. Mohon periksa detail ukuran dan kondisi dengan seksama sebelum membeli. Hubungi kami jika Anda ragu.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-accent">Berapa lama proses pengiriman?</h3>
          <p>Pesanan akan diproses dalam 1-2 hari kerja setelah pembayaran dikonfirmasi. Waktu pengiriman standar adalah 2-5 hari kerja tergantung lokasi Anda.</p>
        </div>
      </div>
    )
  },
  contact: {
    title: 'Kontak Kami',
    content: (
      <div>
        <p className="mb-4">Punya pertanyaan atau butuh bantuan? Jangan ragu untuk menghubungi kami melalui:</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Email:</strong> support@retrove.com</li>
          <li><strong>WhatsApp:</strong> +62 812 3456 7890 (Chat Only)</li>
          <li><strong>Instagram:</strong> @retrove.id</li>
        </ul>
        <p className="mt-4">Jam operasional kami adalah Senin - Jumat, 09:00 - 17:00 WIB.</p>
      </div>
    )
  },
  shipping: {
    title: 'Pengiriman & Pengembalian',
    content: (
       <div>
        <h3 className="text-lg font-semibold text-accent mb-2">Informasi Pengiriman</h3>
        <p>Kami menggunakan jasa pengiriman terpercaya untuk memastikan pesanan Anda sampai dengan aman. Biaya pengiriman flat rate sebesar Rp25.000 ke seluruh Indonesia. Nomor resi akan dikirimkan melalui email setelah pesanan dikirim.</p>
        <h3 className="text-lg font-semibold text-accent mt-6 mb-2">Kebijakan Pengembalian</h3>
        <p>Semua penjualan bersifat final. Kami tidak menerima pengembalian atau penukaran barang. Kami berusaha memberikan informasi sedetail mungkin pada deskripsi produk. Jika ada kesalahan dari pihak kami (salah kirim barang), silakan hubungi customer service.</p>
      </div>
    )
  },
  sizing: {
    title: 'Panduan Ukuran',
    content: (
      <div>
        <p>Ukuran pada pakaian vintage bisa berbeda dengan ukuran modern. Kami selalu mencantumkan ukuran yang tertera pada label dan seringkali memberikan detail tambahan seperti "L fit M" (label L tapi pas seperti ukuran M).</p>
        <p className="mt-4">Untuk memastikan ukuran yang pas, kami sarankan Anda membandingkan dimensi yang kami berikan (jika ada) dengan pakaian yang sudah Anda miliki.</p>
      </div>
    )
  }
};

const StaticPage: React.FC<StaticPageProps> = ({ page, onNavigateHome }) => {
  const { title, content } = pageContent[page];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 text-sm text-text-muted">
        <span onClick={onNavigateHome} className="cursor-pointer hover:text-accent">Home</span>
        <span className="mx-2">/</span>
        <span className="text-text-main">{title}</span>
      </div>
      <div className="max-w-4xl mx-auto bg-primary p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-serif text-accent mb-8">{title}</h1>
        <div className="text-text-muted leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};

export default StaticPage;