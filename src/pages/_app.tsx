import { ThemeProvider } from '@mui/material'
import { theme } from 'config/mui.config'
import SEO from 'config/seo.config'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import relativeTime from 'dayjs/plugin/relativeTime'
import { NextPage } from 'next'
import { DefaultSeo } from 'next-seo'
import type { AppProps /*, AppContext */ } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import store from 'redux/store'
import { httpGet } from 'services/http'
import 'swiper/css/bundle'
import { Middleware, mutate, SWRConfig, SWRHook } from 'swr'
import '../styles/index.css'

//#region NPROGRESS - create a custom progress bar
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
//#endregion

//#region DAYJS
dayjs.locale('id')
dayjs.extend(relativeTime) // so that user can relative formatting
//#endregion

// #region SWR MIDDLEWARE
const liveQueries = new Set()
const trackLiveQueriesMiddleware: Middleware =
  (useSWRNext: SWRHook) => (key, fetcher, config) => {
    // Before hook runs...

    // Handle the next middleware, or the `useSWR` hook if this is the last one.
    const swr = useSWRNext(key, fetcher, config)

    // After hook runs...
    useEffect(() => {
      liveQueries.add(key)

      return () => {
        liveQueries.delete(key)
      }
    }, [key])

    return swr
  }
export const revalidateLiveQueries = async () => {
  const promises = [...liveQueries.values()].map((key) => mutate(key))

  return Promise.all(promises)
}
// #endregion

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo {...SEO} />

      <SWRConfig
        value={{
          // refreshInterval: 3000, // automatic re-fetching data in API every 3s
          fetcher: (url: string) => httpGet(url).then((res) => res.data),
          onError: (err) => toast.error(err.message),
          use: [trackLiveQueriesMiddleware],
        }}
      >
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
            <ToastContainer
              position="bottom-left"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </ThemeProvider>
        </Provider>
      </SWRConfig>
    </>
  )
}

export default MyApp
