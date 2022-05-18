import SEO from 'config/seo'
import 'gridjs/dist/theme/mermaid.css'
import { DefaultSeo } from 'next-seo'
import type { AppProps /*, AppContext */ } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Provider } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import store from 'redux/store'
import { httpGet } from 'services/http'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/thumbs/thumbs.min.css'
import 'swiper/swiper.min.css'
import { SWRConfig } from 'swr'
import '../styles/index.css'

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

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <DefaultSeo {...SEO} />

      <SWRConfig
        value={{
          // refreshInterval: 3000, // automatic re-fetching data in API every 3s
          fetcher: (url: string) => httpGet(url).then((res) => res.data),
          onError: (err) => toast.error(err.message),
        }}
      >
        <Provider store={store}>
          <Component {...pageProps} />
          <ToastContainer />
        </Provider>
      </SWRConfig>
    </>
  )
}
