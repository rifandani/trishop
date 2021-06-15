import Router from 'next/router'
import axios from 'axios'
import NProgress from 'nprogress'
import { SWRConfig } from 'swr'
import { ToastContainer, toast } from 'react-toastify'
import type { AppProps /*, AppContext */ } from 'next/app'
import { DefaultSeo } from 'next-seo'
// Import styles
import '../styles/index.css'
import 'nprogress/nprogress.css'
import 'gridjs/dist/theme/mermaid.css'
import 'react-toastify/dist/ReactToastify.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/thumbs/thumbs.min.css'
import 'swiper/components/pagination/pagination.min.css'
// files
import { CartProvider } from 'contexts/CartContext'
import { WishlistProvider } from 'contexts/WishlistContext'
import { UserProvider } from 'contexts/UserContext'
import SEO from 'config/seo'

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

// axios default baseUrl
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/v1'
    : 'https://trishop.vercel.app/api/v1'

// axios default validateStatus
axios.defaults.validateStatus = (status) =>
  (status >= 200 && status < 300) || (status >= 400 && status < 500) // Resolve only if the status code is 200 more and less than 500

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <DefaultSeo {...SEO} />

      <SWRConfig
        value={{
          // refreshInterval: 3000, // automatic re-fetching data in API every 3s
          fetcher: (url: string) => axios.get(url).then((res) => res.data),
          onError: (err) => toast.error(err.message),
        }}
      >
        <CartProvider>
          <WishlistProvider>
            <UserProvider>
              <Component {...pageProps} />
              <ToastContainer />
            </UserProvider>
          </WishlistProvider>
        </CartProvider>
      </SWRConfig>
    </>
  )
}
