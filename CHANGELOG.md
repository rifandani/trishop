# Changelog

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
