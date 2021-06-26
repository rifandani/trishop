import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withMongoConnect from 'middlewares/withMongoConnect'
import withYupConnect from 'middlewares/withYupConnect'
import withCheckAuthCookie from 'middlewares/withCheckAuthCookie'
import ReviewModel from 'mongo/models/Review'
import ProductModel from 'mongo/models/Product'
import { addReviewApiSchema, TAddReviewApiSchema } from 'yup/apiSchema'

export default nc
  .use(withCors(['GET', 'POST'])) // cors
  .use(withCheckAuthCookie()) // check auth cookie middleware
  .use(withYupConnect(addReviewApiSchema)) // yup middleware
  .use(withMongoConnect()) // connect mongodb middleware
  .get(async (req, res) => {
    /* ---------------------------------- GET req => /user/reviews ---------------------------------- */
    if (Object.keys(req.query).length === 0) {
      const reviewsDoc = await ReviewModel.find() // .populate('productRef', 'reviewerName -__v').select('productRef reviewerId')

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res
        .status(200)
        .json({ error: false, reviews: reviewsDoc, count: reviewsDoc.length })
      return
    }

    // const customQuery = req.query
  })
  /* ---------------------------------- POST req => /user/reviews --------------------------------- */
  .post(async (req, res) => {
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

    // POST success => Created +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(201).json({ error: false, reviewId: reviewDoc._id })
  })
