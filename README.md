<a href="https://trishop.vercel.app">
  <p align="center">
    <img height=100 src="./public/images/trishop.png"/>
  </p>

  <h1 style="color: #9c4221;" align="center">
    Trishop
  </h1>
</a>

<p align="center">
  <strong style="font-style: italic;">Open Source E-Commerce Platform</strong>
</p>

<p align="center">
  <a href="https://trishop.vercel.app">
    <img src="https://img.shields.io/badge/Status-Active-green.svg?style=for-the-badge" alt="trishop - status active" />
  </a>

  <a href="https://github.com/rifandani/trishop-web/blob/master/LICENSE">
    <img src="https://img.shields.io/apm/l/atomic-design-ui.svg?style=for-the-badge&color=000" alt="trishop - license mit" />
  </a>
</p>

---

## What is Trishop ❓

Trishop adalah platform e-commerce gratis dan open-source untuk unit usaha yang ingin mencari customer dan menjual produk nya secara online. Platform ini berbeda dengan platform seperti Shopee, Tokopedia atau sejenisnya yang menggunakan sistem multi-role user dimana user bisa registrasi sebagai pembeli dan penjual sekaligus. Platform ini dimaksudkan hanya untuk satu penjual dan semua customer online nya.

## Features 🎲

Trishop dilengkapi dengan fitur:

1. Full typed Next.js dengan Typescript + Eslint + Prettier ⚡
2. Peyimpanan database dengan Mongodb dan Mongoose ODM 🍃
3. Penyimpanan file storage dengan Cloudinary 💾
4. Autentikasi JWT dalam cookie 🔑
5. Otorisasi berdasarkan role: USER dan ADMIN 🔐
6. Form validation dengan Formik dan Yup ✨
7. Customer cart dan wishlist dengan react `context` dan `reducer` 🛠
8. Customer order dan checkout product dengan custom hooks `useLocalStorage` ⚒
9. Custom API routes middleware validation 🎊
10. Review product dengan menyertakan nama, komentar dan bintang ⭐
11. Report review yang terindikasi spam / mengandung SARA 🚫
12. Memakai coupon code ketika di cart bagi customer yang memilikinya 👩‍💻
13. Admin dashboard untuk fungsi CRUD user, product, coupons, reports, dan memantau status order product _(coming soon)_ 💎
14. Customer dashboard untuk memantau order product yang telah dibeli 🕵️‍♀️ _(coming soon)_
15. dll...

## Services 📃

|                     Service                     |            Description            |
| :---------------------------------------------: | :-------------------------------: |
|          [vercel](https://vercel.com/)          |          Next.js Hosting          |
|      [cloudinary](https://cloudinary.com)       |       File Storage Solution       |
| [mongodb](https://www.mongodb.com/cloud/atlas/) |          NoSQL Database           |
|        [midtrans](https://midtrans.com/)        | Payment Gateway **(coming soon)** |
|         [cypress](https://cypress.io/)          |   E2E Testing **(coming soon)**   |

## Branches 🔱

- [develop](https://github.com/rifandani/trishop/tree/develop) -> PR branch ini untuk kontribusi
- [main](https://github.com/rifandani/trishop) -> Jangan disentuh, branch ini untuk production

## Contributions 🧩

Trishop web dibuka untuk kontribusi baik itu kontribusi untuk fungsionalitas project ataupun berupa dokumentasi seperti CONTRIBUTING GUIDE, DESIGN GUIDELINES, CODE OF CONDUCT, dll. Saya merekomendasikan kalian membuat issue baru atau membalas dalam bentuk saran/komentar agar saya dapat mengetahui terlebih dahulu apa yang kalian ingin tambahkan/kerjakan. Dengan itu apa yang kita kerjakan tidak akan saling bertabrakan.

1. [Submit new issue](https://github.com/rifandani/trishop/issues)
2. Fork repository ini
3. Buat branch baru dari develop branch (jangan pernah bekerja di _main branch_), contoh:

   ```bash
    # ketika ingin menambah feature baru
    git checkout -b feature/redux
    # ketika ingin memperbaiki bug
    git checkout -b fix/admin-dashboard
   ```

4. Install semua dependencies `yarn install`
5. Buat file `.env.local` di root folder:

   ```py
   # untuk JWT
   MY_SECRET_KEY = 'TEST'
   # untuk mongodb
   MONGO_HOST = 'YOURCLUSTER'
   # untuk cloudinary
   CLOUDINARY_URL = 'YOURCLOUDINARYURL'
   ```

6. Jalankan dev server `yarn dev`
7. Fix bugs atau implementasi new features
8. Commit changes dengan message yang memiliki arti (at least make it pretty with [Emoji](https://gist.github.com/parmentf/035de27d6ed1dce0b36a)) 😎
9. Pastikan tidak ada error ataupun warning ketika menjalankan perintah `yarn lint` ✔
10. Push changes ke remote repo, dan buat pull request ke develop branch
11. Tunggu review dan comment terhadap pull request yang telah kalian buat
12. ~~Selalu tulis unit test (coming soon)~~
