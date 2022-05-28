import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withMongoConnect from 'middlewares/withMongoConnect'
import withYupConnect from 'middlewares/withYupConnect'
import CouponModel from 'mongo/models/Coupon'
import {
  TValidateCouponApiSchema, validateCouponApiSchema
} from 'yup/apiSchema'

export default nc
  .use(withCors(['POST'])) // cors
  .use(withMongoConnect()) // connect mongodb middleware
  .use(withYupConnect(validateCouponApiSchema)) // yup middleware
  .post('/api/v1/public/validate/coupon', async (req, res) => {
    const { userId, code } = req.body as TValidateCouponApiSchema // destructure request body form

    // find existing coupon by {code}
    const couponIsExists = await CouponModel.exists({
      code: code.toUpperCase(),
    })
    if (!couponIsExists) {
      // client error => Bad Request -----------------------------------------------------------------
      res.status(400).json({
        error: true,
        message:
          'Coupon code does not exists',
      })
      return
    }

    // find coupon by {code}
    const coupon = await CouponModel.findOne({
      code: code.toUpperCase(),
    })

    // check coupon {usedBy} with userId
    const couponIsAlreadyUsed = coupon.usedBy.includes(userId)
    if (couponIsAlreadyUsed) {
      // client error => Bad request -----------------------------------------------------------------
      res.status(400).json({
        error: true,
        message: 'You have already used the coupon code',
      })
      return
    }

    // compare coupon {validUntil} with today's Date milliseconds
    const couponIsStillValid = coupon.validUntil > Date.now()
    if (!couponIsStillValid) {
      // client error => Bad request -----------------------------------------------------------------
      res.status(400).json({
        error: true,
        message: 'Coupon code is no longer valid',
      })
      return
    }

    // POST SUCCESS => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(201).json({ error: false, coupon: coupon })
  })
