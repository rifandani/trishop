# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.3.0](https://github.com/rifandani/trishop/compare/v0.2.0...v0.3.0) (2021-06-24)


### Features

* **frontend:** adding redux-toolkit, react-redux ([f083373](https://github.com/rifandani/trishop/commits/f08337355a47dca8c3c93fee00138aa4762be134))


### Bug Fixes

* **frontend:** cannot find module 'contexts/CartReducer' ([aeae551](https://github.com/rifandani/trishop/commits/aeae551c74f792f469b365b0cbe801059800bb8c))
* **frontend:** type error: has no exported member 'PRODUCT' ([0a313e8](https://github.com/rifandani/trishop/commits/0a313e8a05764dfba78a58fb0858ef9f241966f5))

## 0.2.0 (2021-06-18)

---

## Changelog2

Sebelum menggunakan `standard-version`

### 18 Juni 2021

- Menambahkan `chromatic.yml` workflows
- Menambahkan `standard-version` untuk generate changelog
- Update `CONTRIBUTING.md` dan `README.md`

### 17 Juni 2021

- Update semua deps terutama `nextjs v11.0.0`
- Implementasi middleware `checkAuthCookieAsAdmin` untuk API routes prefix `/admin`
- Implementasi middleware `checkAuthCookie` untuk API routes prefix `/user`
- Implementasi `storybook` untuk dokumentasi UI component

### 16 Juni 2021

- Refactor code di page `/products/:id` menggunakan `useSWR` daripada `getStaticProps`
- Menambahkan component untuk user dashboard di page `/user/dashboard`
- Implementasi cors dengan deps `cors` agar API bisa diakses di deployment _Preview_ mode

### 15 Juni 2021

- Implementasi SEO dengan deps `next-seo`

### 14 Juni 2021

- Menambahkan `CHANGELOG.md`
- Menambahkan `CODE_OF_CONDUCT.md`
- Membuat grup komunitas Roompy di [Discord](https://discord.gg/W9gPJ6kUPY)
- Mengubah penyimpanan user state yang awalnya dari cookies ke local storage `useLocalStorage('user')`

### 13 Juni 2021

- Initial release v0.2.0
