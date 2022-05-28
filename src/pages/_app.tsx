import { ThemeProvider } from '@mui/material'
import { theme } from 'config/mui.config'
import SEO from 'config/seo.config'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'gridjs/dist/theme/mermaid.css'
import { NextPage } from 'next'
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
import 'swiper/css/bundle'
import { SWRConfig } from 'swr'
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
dayjs.extend(relativeTime) // so that user can relative formatting
//#endregion

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
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
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
            <ToastContainer />
          </ThemeProvider>
        </Provider>
      </SWRConfig>
    </>
  )
}

export default MyApp
