# Technical Test PT. EIGEN TRI MATHEMA

## Backend Test Case
1. Clone Repositori
   ```bash
   git clone https://github.com/didikad/Technical_test_EIGEN.git repository
   cd repository
   ```
  
2.Install Dependensi
  ```bash
  npm install
  ```

3. Variable lingkungan
     Buat file .env di direktori root proyek.
   ```bash
   DB_NAME=database_testing
   DB_USER=root
   DB_PASSWORD=
   DB_HOST=localhost
   DB_DIALECT=mysql
   
   ENV_DEV=local
   ```
   
4. Menjalankan API
   ```bash
      npm start
   ```

5. Jalankan migrate dan seeder sequelize
   ```bash
      npx sequelize-cli db:migrate
      npx sequelize-cli db:seed:all
   ```
   
6. Route API
   6.1. POST /api/books/borrow
        Untuk Meminjam Buku, berikut contoh body nya :
   ```bash
       {
        "memberId" : 1,
        "bookId" : 2,
        "startDate": "2024-08-06"
       }
   ```
   
   6.2. POST /api/books/return
        Untuk Mengembalikan Buku, berikut contoh body nya :
   ```bash
       {
        "memberId" : 1,
        "bookId" : 2
       }
   ```
   
   6.3. GET /api/books/available-books
        Untuk  buku yang masih bisa dipinjam, berikut response nya :
   ```bash
       {
          "availableBooks": [
              {
                  "id": 1,
                  "code": "B001",
                  "title": "JavaScript: The Good Parts",
                  "author": "Douglas Crockford",
                  "stock": 10,
                  "createdAt": "2024-08-06T15:03:27.000Z",
                  "updatedAt": "2024-08-06T15:03:27.000Z"
              }
          ]
      }
   ```
   
   6.4. GET /api/books/members
        Untuk melihat member dan jumlah buku yang dipinjam, berikut response nya :
   ```bash
       {
          "data": [
              {
                  "member": {
                      "id": 1,
                      "name": "John Doe",
                      "code": "M001",
                      "createdAt": "2024-08-06T15:03:27.000Z",
                      "updatedAt": "2024-08-06T15:03:27.000Z"
                  },
                  "books_borrowed": 2
              },
              {
                  "member": {
                      "id": 2,
                      "name": "Jane Smith",
                      "code": "M002",
                      "createdAt": "2024-08-06T15:03:27.000Z",
                      "updatedAt": "2024-08-06T15:03:27.000Z"
                  },
                  "books_borrowed": 0
              },
              {
                  "member": {
                      "id": 3,
                      "name": "Alice Johnson",
                      "code": "M003",
                      "createdAt": "2024-08-06T15:03:27.000Z",
                      "updatedAt": "2024-08-06T15:03:27.000Z"
                  },
                  "books_borrowed": 0
              }
          ]
      }
   ```
     
7. Troubleshooting
     Jika Anda mengalami masalah saat menginstal dependensi, coba jalankan:
   ```bash
    npm cache clean --force
    rm -rf node_modules
    npm install
   ```

   Pastikan juga file .env dibuat dan pastikan memasukan nama database dengan benar


## Algoritma Test Case
Berada di folder TEST_ALGORITMA
