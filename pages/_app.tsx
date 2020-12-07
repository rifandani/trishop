import Head from 'next/head';
import type { AppProps /*, AppContext */ } from 'next/app';
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'gridjs/dist/theme/mermaid.css';
// files
// import '../styles/normalize.css';
import { CartProvider } from '../contexts/CartContext';

// create a custom progress bar
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TriShop</title>
        {/* meta */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        {/* link */}
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>

      <CartProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </CartProvider>
    </>
  );
}
