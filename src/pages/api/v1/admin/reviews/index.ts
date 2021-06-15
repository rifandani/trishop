import { NextApiRequest, NextApiResponse } from 'next'
// files
import ReviewModel from 'mongo/models/Review'
import ProductModel from 'mongo/models/Product'
import connectMongo from 'middlewares/connectMongo'
import withYup from 'middlewares/withYup'
import checkAuthCookie from 'middlewares/checkAuthCookie'
import { addReviewApiSchema, TAddReviewApiSchema } from 'yup/apiSchema'

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.method === 'GET') {
      /* -------------------------------------------------------------------------- */
      /*                         GET req => /admin/reviews                         */
      /* -------------------------------------------------------------------------- */

      // there is no query for filtering & sorting
      if (Object.keys(req.query).length === 0) {
        const reviewsDoc = await ReviewModel.find() // .populate('productRef', 'reviewerName -_id').select('productRef reviewerId') cuma ambil reviewerName, trus hilangin _id dari response

        // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res
          .status(200)
          .json({ error: false, reviews: reviewsDoc, count: reviewsDoc.length })
        return
      }

      // const customQuery = req.query
    } else if (req.method === 'POST') {
      /* -------------------------------------------------------------------------- */
      /*                         POST req => /admin/reviews                         */
      /* -------------------------------------------------------------------------- */

      const { productRef, reviewerId, reviewerName, comment, star } =
        req.body as TAddReviewApiSchema

      // create review
      const reviewDoc = await ReviewModel.create({
        productRef, // pass a string => mongoose automatically converts it to ObjectId
        reviewerId,
        reviewerName,
        comment,
        star,
      })

      // productDoc.set('reviews', [reviewDoc._id])
      // productDoc.reviews.push(reviewDoc._id)
      // await productDoc.save()
      // https://docs.mongodb.com/manual/reference/operator/update/push/
      await ProductModel.findByIdAndUpdate(productRef, {
        $push: { reviews: reviewDoc._id }, // bisa tambah pake $each untuk push multiple value
      })

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, reviewId: reviewDoc._id })
    } else {
      // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only supports GET, POST method',
      })
    }
  } catch (err) {
    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({ error: true, name: err.name, message: err.message })
  }
}

export default checkAuthCookie(
  withYup(addReviewApiSchema, connectMongo(handler))
)
