import Head from 'next/head'
// files
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import ProductsComp from 'components/products/ProductsComp'

export default function ProductsPage() {
  return (
    <div className="flex flex-col ">
      <Head>
        <title>Trishop - Products</title>
      </Head>

      <Nav />

      {/* main content */}
      <ProductsComp />

      <Footer />
    </div>
  )
}
