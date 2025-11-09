
# Skema Basis Data E-commerce Thrifting "Retrove"

Dokumen ini merinci desain skema basis data untuk aplikasi e-commerce Retrove. Skema ini dioptimalkan untuk menangani produk dengan stok tunggal (kuantitas selalu 1), yang merupakan karakteristik utama dari toko thrifting.

## Diagram Relasi Entitas (ERD - Textual)

```
[Users] 1--* [Orders]
  |
  `-- (role: admin/customer)

[Categories] 1--* [Products]

[Products] 1--* [ProductImages]
   |
   `--1 [OrderItems] (Satu produk hanya bisa ada di satu item pesanan aktif)

[Orders] 1--* [OrderItems]
   |
   `--1 [Shipping]

```

---

## Rincian Tabel

### 1. `Users`
Menyimpan data untuk pelanggan dan administrator.

| Nama Kolom         | Tipe Data      | Kendala                        | Deskripsi                                        |
|--------------------|----------------|--------------------------------|----------------------------------------------------|
| `user_id`          | `INT` / `UUID` | **Primary Key**, AUTO_INCREMENT | Identifier unik untuk setiap pengguna.             |
| `email`            | `VARCHAR(255)` | NOT NULL, UNIQUE               | Alamat email pengguna, digunakan untuk login.      |
| `password_hash`    | `VARCHAR(255)` | NOT NULL                       | Hash password pengguna.                            |
| `full_name`        | `VARCHAR(100)` | NOT NULL                       | Nama lengkap pengguna.                             |
| `phone_number`     | `VARCHAR(20)`  | NULL                           | Nomor telepon pengguna.                            |
| `shipping_address` | `TEXT` / `JSON`| NULL                           | Alamat pengiriman default pengguna.                |
| `role`             | `ENUM('customer', 'admin')` | NOT NULL, DEFAULT 'customer' | Peran pengguna dalam sistem.                       |
| `created_at`       | `TIMESTAMP`    | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Waktu saat akun dibuat.                          |

### 2. `Categories`
Menyimpan kategori produk yang berbeda.

| Nama Kolom      | Tipe Data      | Kendala                         | Deskripsi                           |
|-----------------|----------------|---------------------------------|-------------------------------------|
| `category_id`   | `INT`          | **Primary Key**, AUTO_INCREMENT | Identifier unik untuk kategori.     |
| `name`          | `VARCHAR(50)`  | NOT NULL, UNIQUE                | Nama kategori (misal: "Pria", "Wanita"). |

### 3. `Products`
Tabel inti yang berisi detail setiap item thrifting.

| Nama Kolom          | Tipe Data        | Kendala                         | Deskripsi                                                           |
|---------------------|------------------|---------------------------------|---------------------------------------------------------------------|
| `product_id`        | `INT` / `UUID`   | **Primary Key**, AUTO_INCREMENT | Identifier unik untuk setiap produk.                                |
| `name`              | `VARCHAR(255)`   | NOT NULL                        | Nama produk.                                                        |
| `description`       | `TEXT`           | NOT NULL                        | Deskripsi detail dan "storytelling" tentang produk.                 |
| `price`             | `DECIMAL(10, 2)` | NOT NULL                        | Harga jual produk.                                                  |
| `acquisition_price` | `DECIMAL(10, 2)` | NULL                            | Harga beli/modal (hanya untuk admin).                               |
| `category_id`       | `INT`            | NOT NULL, **Foreign Key**       | Merujuk ke `Categories(category_id)`.                               |
| `size`              | `VARCHAR(20)`    | NOT NULL                        | Ukuran produk (misal: "L fit M").                                   |
| `material`          | `VARCHAR(50)`    | NULL                            | Bahan utama produk.                                                 |
| `condition_rating`  | `TINYINT`        | NOT NULL, CHECK (1-5)           | Peringkat kondisi produk dalam skala 1-5.                           |
| `is_available`      | `BOOLEAN`        | NOT NULL, DEFAULT TRUE          | **Kunci Stok**: `TRUE` jika tersedia, `FALSE` jika sudah terjual. |
| `unique_code`       | `VARCHAR(20)`    | NULL, UNIQUE                    | Kode internal unik untuk pelacakan.                                 |
| `date_listed`       | `TIMESTAMP`      | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Tanggal produk ditambahkan ke toko.                               |

### 4. `ProductImages`
Menyimpan URL gambar untuk setiap produk.

| Nama Kolom     | Tipe Data      | Kendala                         | Deskripsi                                         |
|----------------|----------------|---------------------------------|---------------------------------------------------|
| `image_id`     | `INT`          | **Primary Key**, AUTO_INCREMENT | Identifier unik untuk gambar.                     |
| `product_id`   | `INT` / `UUID` | NOT NULL, **Foreign Key**       | Merujuk ke `Products(product_id)` (ON DELETE CASCADE). |
| `image_url`    | `VARCHAR(255)` | NOT NULL                        | URL ke lokasi gambar.                             |
| `is_primary`   | `BOOLEAN`      | NOT NULL, DEFAULT FALSE         | `TRUE` jika ini adalah gambar utama/thumbnail produk. |

### 5. `Orders`
Menyimpan informasi header untuk setiap pesanan.

| Nama Kolom                  | Tipe Data      | Kendala                         | Deskripsi                                                                    |
|-----------------------------|----------------|---------------------------------|------------------------------------------------------------------------------|
| `order_id`                  | `INT` / `UUID` | **Primary Key**, AUTO_INCREMENT | Identifier unik untuk pesanan.                                               |
| `user_id`                   | `INT` / `UUID` | NOT NULL, **Foreign Key**       | Merujuk ke `Users(user_id)`.                                                 |
| `order_date`                | `TIMESTAMP`    | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Tanggal dan waktu pesanan dibuat.                                            |
| `total_amount`              | `DECIMAL(10, 2)`| NOT NULL                       | Total harga pesanan (termasuk ongkir, dll).                                  |
| `shipping_address_snapshot` | `TEXT`         | NOT NULL                        | Salinan alamat pengiriman saat checkout untuk menjaga integritas data.         |
| `payment_method`            | `VARCHAR(50)`  | NOT NULL                        | Metode pembayaran yang digunakan.                                            |
| `payment_status`            | `ENUM('pending', 'paid', 'failed')` | NOT NULL, DEFAULT 'pending' | Status pembayaran.                                                           |
| `order_status`              | `ENUM('Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled')` | NOT NULL, DEFAULT 'Pending' | Status pemrosesan pesanan.                                                   |

### 6. `OrderItems`
Tabel perantara yang menghubungkan pesanan dengan produk.

| Nama Kolom          | Tipe Data      | Kendala                         | Deskripsi                                                                 |
|---------------------|----------------|---------------------------------|---------------------------------------------------------------------------|
| `order_item_id`     | `INT`          | **Primary Key**, AUTO_INCREMENT | Identifier unik untuk item pesanan.                                       |
| `order_id`          | `INT` / `UUID` | NOT NULL, **Foreign Key**       | Merujuk ke `Orders(order_id)`.                                            |
| `product_id`        | `INT` / `UUID` | NOT NULL, **Foreign Key**, UNIQUE | Merujuk ke `Products(product_id)`. **UNIQUE** karena stok hanya 1.        |
| `quantity`          | `INT`          | NOT NULL, DEFAULT 1, CHECK (=1) | Kuantitas selalu 1 untuk produk thrifting.                                |
| `price_at_purchase` | `DECIMAL(10, 2)`| NOT NULL                       | Harga produk saat dibeli untuk menjaga integritas data jika harga berubah. |

### 7. `Shipping`
Menyimpan informasi pengiriman yang terkait dengan pesanan.

| Nama Kolom          | Tipe Data      | Kendala                         | Deskripsi                                |
|---------------------|----------------|---------------------------------|------------------------------------------|
| `shipping_id`       | `INT`          | **Primary Key**, AUTO_INCREMENT | Identifier unik untuk pengiriman.        |
| `order_id`          | `INT` / `UUID` | NOT NULL, **Foreign Key**, UNIQUE | Merujuk ke `Orders(order_id)`. (Relasi 1-ke-1). |
| `tracking_number`   | `VARCHAR(100)` | NULL                            | Nomor resi pengiriman.                   |
| `shipping_company`  | `VARCHAR(50)`  | NULL                            | Jasa ekspedisi yang digunakan.           |
| `shipping_cost`     | `DECIMAL(10, 2)`| NOT NULL                        | Biaya pengiriman untuk pesanan ini.      |
| `shipped_date`      | `TIMESTAMP`    | NULL                            | Tanggal barang dikirimkan.               |

