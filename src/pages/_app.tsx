import Head from 'next/head'
import type { AppProps /*, AppContext */ } from 'next/app'
import Router from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'gridjs/dist/theme/mermaid.css'
import axios from 'axios'
import { SWRConfig } from 'swr'
// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/thumbs/thumbs.min.css'
// files
import '../styles/index.css'
import { CartProvider } from 'contexts/CartContext'

// create a custom progress bar
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})
Router.events.on('routeChangeError', () => {
  NProgress.done()
})

// axios BASE URL
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/v1'
    : 'https://trishop.vercel.app/api/v1'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TriShop - Cake shop</title>
        {/* meta */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta property="og:title" content="TriShop" key="title" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="favicon.ico" />
        <meta name="twitter:title" content="TriShop - Cake shop" />
        <meta
          name="twitter:card"
          content="Tell us your custom cake design. We make your dream cake becomes reality"
        />
        <meta
          name="description"
          content="We make your dream cake becomes reality"
        />
        <meta name="twitter:image" content="favicon.ico" />
        <link rel="icon" href="favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>

      <SWRConfig
        value={{
          // refreshInterval: 3000, // automatic re-fetching data in API every 3s
          fetcher: (url: string) => axios.get(url).then((res) => res.data),
          onError: (err) => toast.error(err.message),
        }}
      >
        <CartProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </CartProvider>
      </SWRConfig>
    </>
  )
}
