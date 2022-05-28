import Footer from 'components/common/Footer'
import Nav from 'components/common/Nav'
import ProductsComp from 'components/products/ProductsComp'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

const ProductsPage: NextPage = () => {
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

export default ProductsPage
