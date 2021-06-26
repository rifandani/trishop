import Router from 'next/router'
import axios from 'axios'
import NProgress from 'nprogress'
import { SWRConfig } from 'swr'
import { ToastContainer, toast } from 'react-toastify'
import type { AppProps /*, AppContext */ } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { Provider } from 'react-redux'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
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
import SEO from 'config/seo'
import store from 'redux/store'
import { API_URL_DEV, API_URL_PROD } from 'config/constants'

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
  process.env.NODE_ENV === 'development' ? API_URL_DEV : API_URL_PROD

// axios default validateStatus
axios.defaults.validateStatus = (status) =>
  (status >= 200 && status < 300) || (status >= 400 && status < 500) // Resolve only if the status code is 200 more and less than 500

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [queryClient] = useState(() => new QueryClient())

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
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Component {...pageProps} />
            <ToastContainer />
          </Provider>
        </QueryClientProvider>
      </SWRConfig>
    </>
  )
}
