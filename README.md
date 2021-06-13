<a href="https://trishop.vercel.app">
  <p align="center">
    <img height=100 src="./public/images/trishop.png"/>
  </p>

  <h1 style="color: #9c4221;" align="center">
    TriShop
  </h1>
</a>

<p align="center">
  <strong style="font-style: italic;">Free E-Commerce Platform</strong>
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

Trishop adalah platform e-commerce gratis dan open-source untuk unit usaha yang ingin mencari customer dan menjual produk nya secara online. Platform ini dilengkapi dengan fitur:

1. Full typed Next.js dengan Typescript + Eslint + Prettier ⚡
2. Peyimpanan database dengan Mongodb dan Mongoose ODM 🍃
3. Penyimpanan file storage dengan Cloudinary 💾
4. Autentikasi JWT dalam cookie 🔑
5. Otorisasi berdasarkan role: USER dan ADMIN 🔐
6. Customer _(coming soon)_ dan Admin dashboard 💎
7. Form validation dengan Formik dan Yup ✨
8. Customer cart dan wishlist dengan react context dan reducer 🛠
9. Customer order dan checkout product dengan custom hooks `useLocalStorage` ⚒
10. Custom API routes middleware validation 🎊
11. dll...

## Services 📃

|                     Service                     |            Description            |
| :---------------------------------------------: | :-------------------------------: |
|          [vercel](https://vercel.com/)          |          Next.js Hosting          |
|      [cloudinary](https://cloudinary.com)       |       File Storage Solution       |
| [mongodb](https://www.mongodb.com/cloud/atlas/) |          NoSQL Database           |
|        [midtrans](https://midtrans.com/)        | Payment Gateway **(coming soon)** |
|         [cypress](https://cypress.io/)          |   E2E Testing **(coming soon)**   |

## Branches 🔱

- [dev](https://github.com/rifandani/trishop/tree/dev) -> PR branch ini untuk kontribusi _(coming soon)_
- [main](https://github.com/rifandani/trishop) -> Jangan disentuh, branch ini untuk production

## Contributions 🧩

Trishop web dibuka untuk kontribusi, tetapi saya merekomendasikan kalian membuat issue baru atau membalas dalam bentuk komentar agar saya dapat mengetahui terlebih dahulu apa yang kalian ingin tambahkan/kerjakan. Dengan itu apa yang kita kerjakan tidak akan saling bertabrakan.

1. [Submit new issue](https://github.com/rifandani/trishop/issues)
2. Fork repository ini
3. Buat branch baru (jangan pernah bekerja di _main branch_)
4. Install semua dependencies `yarn install`
5. Buat file `.env.local` di root folder:

   ```env
   MY_SECRET_KEY = 'TEST'
   MONGO_HOST = 'YOURCLUSTER'
   CLOUDINARY_URL = 'YOURCLOUDINARYURL'
   ```

6. Jalankan dev server `yarn dev`
7. Fix bugs atau implement new features
8. Pastikan tidak ada error ataupun warning ketika menjalankan `yarn lint`
9. _Selalu tulis unit test (coming soon)_
