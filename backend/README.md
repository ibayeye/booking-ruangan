# Booking App (Laravel 12)

<h3>Backend Booking App</h3>

Backend dari booking app ini dibuat menggunakan **Laravel 12**, **PHP 8.3.16**, **Node.js v22.18**, dan **MySQL**.  
Project ini menyediakan API untuk frontend (React + Vite).

---

## Requirements

Sebelum menjalankan project, pastikan sudah ter-install:

-   PHP >= 8.3.16
-   Composer >= 2.7.7
-   Node.js v22.18 (untuk Vite & build asset)
-   MySQL / MariaDB
-   Git

---

## Setup Project

### 1. Clone Repository

<code>
git clone https://github.com/ibayeye/booking-ruangan.git

cd backend
</code>

### 2. Install Depedencies

<code>
composer install

npm install
</code>

### 3. Copy & Konfirugrasi .env

<code>
Copy file .env.example

Rename jadi .env

Ganti

    APP_NAME=Laravel
    APP_ENV=local
    APP_KEY=
    APP_DEBUG=true
    APP_URL=http://localhost

    DB_CONNECTION=sqlite
    # DB_HOST=127.0.0.1
    # DB_PORT=3306
    # DB_DATABASE=laravel
    # DB_USERNAME=root
    # DB_PASSWORD=

Jadi

    APP_NAME=Laravel
    APP_ENV=local
    APP_KEY=base64:wQzvefnK3nCD2LRtajF+w15G1FHXSjS6N1iZlNPL2pk=
    APP_DEBUG=true
    APP_URL=http://localhost

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=booking-ruangan
    DB_USERNAME=root
    DB_PASSWORD=

</code>
note* "Jangan lupa buat terlebih dahulu database dengan nama booking-ruangan"

### 4. Generate Key, Migrasi dan Seed Database

<code>
php artisan key:generate

php artisan migrate --seed
</code>

### 5. Jalankan server

<code>
php artisan serve
</code>
