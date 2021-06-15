import { NextSeo } from 'next-seo'
// files
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import ProductsComp from 'components/products/ProductsComp'

export default function ProductsPage(): JSX.Element {
  return (
    <div className="flex flex-col ">
      <NextSeo
        title="Our Products"
        description="Trishop has a wide selection of cake categories ranging from chocolate, strawberry, buttercream, peanut, and many more."
      />

      <Nav />

      {/* main content */}
      <ProductsComp />

      <Footer />
    </div>
  )
}
