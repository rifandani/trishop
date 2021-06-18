# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 0.2.0 (2021-06-18)

# Changelog

## 18 Juni 2021

- Menambahkan `chromatic.yml` workflows

## 17 Juni 2021

- Update semua deps terutama `nextjs v11.0.0`
- Implementasi middleware `checkAuthCookieAsAdmin` untuk API routes prefix `/admin`
- Implementasi middleware `checkAuthCookie` untuk API routes prefix `/user`
- Implementasi `storybook` untuk dokumentasi UI component

## 16 Juni 2021

- Refactor code di page `/products/:id` menggunakan `useSWR` daripada `getStaticProps`
- Menambahkan component untuk user dashboard di page `/user/dashboard`
- Implementasi cors dengan deps `cors` agar API bisa diakses di deployment _Preview_ mode

## 15 Juni 2021

- Implementasi SEO dengan deps `next-seo`

## 14 Juni 2021

- Menambahkan `CHANGELOG.md`
- Menambahkan `CODE_OF_CONDUCT.md`
- Membuat grup komunitas Roompy di [Discord](https://discord.gg/W9gPJ6kUPY)
- Mengubah penyimpanan user state yang awalnya dari cookies ke local storage `useLocalStorage('user')`

## 13 Juni 2021

- Initial release v0.2.0
