# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.4.1](https://github.com/rifandani/trishop/compare/v0.4.0...v0.4.1) (2022-10-02)


### Features

* **mui:** add mui and refactor admin dashboard ([3a42176](https://github.com/rifandani/trishop/commits/3a42176b89531541d751f287eea26ec9c28a8079))

## [0.4.0](https://github.com/rifandani/trishop/compare/v0.3.1...v0.4.0) (2022-05-28)


### Bug Fixes

* ImagePreview import ([90d3a9d](https://github.com/rifandani/trishop/commits/90d3a9da90efbab419c38bf334b32f2036d84c48))

### [0.3.1](https://github.com/rifandani/trishop/compare/v0.3.0...v0.3.1) (2021-07-02)

### ⚠ BREAKING CHANGES

- **backend:** admin dashboard using custom hooks with LoadingSpinner instead of SSR

### Bug Fixes

- **backend:** fix setCookie settings ([68dbe3a](https://github.com/rifandani/trishop/commits/68dbe3a60cd601a4805fe028b1572875f2733940))
- **backend:** next-connect with prefix routes in backend + admin dashboard using custom hooks ([a75022f](https://github.com/rifandani/trishop/commits/a75022f7bfa62a3e6c785efa7b6c0a072046f3cb))

## [0.3.0](https://github.com/rifandani/trishop/compare/v0.2.0...v0.3.0) (2021-06-24)

### Features

- **frontend:** adding redux-toolkit, react-redux ([f083373](https://github.com/rifandani/trishop/commits/f08337355a47dca8c3c93fee00138aa4762be134))

### Bug Fixes

- **frontend:** cannot find module 'contexts/CartReducer' ([aeae551](https://github.com/rifandani/trishop/commits/aeae551c74f792f469b365b0cbe801059800bb8c))
- **frontend:** type error: has no exported member 'PRODUCT' ([0a313e8](https://github.com/rifandani/trishop/commits/0a313e8a05764dfba78a58fb0858ef9f241966f5))

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
