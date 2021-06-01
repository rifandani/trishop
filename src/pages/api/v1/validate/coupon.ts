import { NextApiRequest, NextApiResponse } from 'next'
// files
import CouponModel from 'mongo/models/Coupon'
import withYup from 'middlewares/withYup'
import connectMongo from 'middlewares/connectMongo'
import {
  validateCouponApiSchema,
  TValidateCouponApiSchema,
} from 'yup/apiSchema'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // destructure request body form
    const { userId, code } = req.body as TValidateCouponApiSchema

    try {
      // find existing coupon by {code}
      const couponIsExists = await CouponModel.exists({
        code: code.toUpperCase(),
      })
      if (!couponIsExists) {
        // PUT client error => Bad Request -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message:
            'userId is a valid ObjectId, but can not find the coupon. Maybe it is already deleted',
        })
        return
      }

      // find coupon by {code}
      const couponByCode = await CouponModel.findOne({
        code: code.toUpperCase(),
      })

      // check coupon {usedBy} with userId
      const couponIsAlreadyUsed = couponByCode.usedBy.includes(userId)
      if (couponIsAlreadyUsed) {
        // client error => Bad request -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message: 'You have already used the coupon code',
        })
        return
      }

      // compare coupon {validUntil} - milliseconds - with today's Date
      const couponIsStillValid = couponByCode.validUntil > Date.now()
      if (!couponIsStillValid) {
        // client error => Bad request -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message: 'Coupon code is no longer valid',
        })
        return
      }

      // POST SUCCESS => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, coupon: couponByCode })
    } catch (err) {
      // POST server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
  } else {
    // client error => invalid req method -----------------------------------------------------------------
    res.status(405).json({ error: true, message: 'Only support POST req' })
  }
}

export default withYup(validateCouponApiSchema, connectMongo(handler))
