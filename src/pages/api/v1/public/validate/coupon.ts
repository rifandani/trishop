import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
// files
import initMiddleware from 'middlewares/initMiddleware'
import CouponModel from 'mongo/models/Coupon'
import withYup from 'middlewares/withYup'
import connectMongo from 'middlewares/connectMongo'
import {
  validateCouponApiSchema,
  TValidateCouponApiSchema,
} from 'yup/apiSchema'

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
)

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await cors(req, res) // Run cors

    if (req.method === 'POST') {
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
    } else {
      // client error => invalid req method -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only support POST req',
      })
    }
  } catch (err) {
    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({ error: true, name: err.name, message: err.message })
  }
}

export default withYup(validateCouponApiSchema, connectMongo(handler))
