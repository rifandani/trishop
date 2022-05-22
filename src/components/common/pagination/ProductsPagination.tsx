import { Dispatch, FC, SetStateAction } from 'react'
import ReactPaginate from 'react-paginate'
import { IProduct } from 'types/Product'

interface Props {
  products: IProduct[]
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  limit: number
}

const ProductsPagination: FC<Props> = ({
  products,
  limit,
  currentPage,
  setCurrentPage,
}) => {
  //#region GENERAL
  const classNames =
    'bg-white text-orange-800 hover:bg-orange-200 px-2 py-1 border cursor-pointer rounded-md appearance-none focus:outline-none focus:ring focus:border-orange-300 list-none'

  const productCount = products.length
  const firstShow = productCount > 0 ? limit * currentPage + 1 : 0
  const secondShow =
    productCount > limit * (currentPage + 1)
      ? limit * (currentPage + 1)
      : productCount
  const pageCount = Math.ceil(productCount / limit)
  //#endregion

  return (
    <div className="mt-20 flex flex-col items-center">
      <article className="flex justify-center text-gray-500">
        Showing {firstShow} - {secondShow} of {productCount} products
      </article>

      <ReactPaginate
        previousLabel="Previous"
        breakLabel="..."
        nextLabel="Next"
        containerClassName="flex justify-center my-5 gap-3"
        activeClassName="bg-orange-200 appearance-none focus:outline-none focus:ring focus:border-orange-300 list-none shadow-md"
        previousClassName={classNames}
        nextClassName={classNames}
        breakClassName={classNames}
        pageClassName={classNames}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        onPageChange={(e) => setCurrentPage(e.selected)}
      />
    </div>
  )
}

export default ProductsPagination
