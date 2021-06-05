import { NextApiRequest, NextApiResponse } from 'next'
// files
import CouponModel from 'mongo/models/Coupon'
import connectMongo from 'middlewares/connectMongo'
import withYup from 'middlewares/withYup'
import { couponApiSchema, TCouponApiSchema } from 'yup/apiSchema'

// TODO: add authentication middleware for all ADMIN api's
const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      /* -------------------------------------------------------------------------- */
      /*                          GET req => /admin/coupons                         */
      /* -------------------------------------------------------------------------- */

      const coupons = await CouponModel.find()

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, coupons, count: coupons.length })
    } else if (req.method === 'POST') {
      /* -------------------------------------------------------------------------- */
      /*                         POST req => /admin/coupons                        */
      /* -------------------------------------------------------------------------- */

      const { discount, minTransaction, code, desc, imageUrl, validUntil } =
        req.body as TCouponApiSchema

      // create new coupon to mongodb
      const coupon = await CouponModel.create({
        discount,
        minTransaction,
        code,
        desc,
        imageUrl,
        validUntil,
      })

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, couponId: coupon._id })
    } else {
      // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only supports GET, POST, PUT, DELETE method',
      })
    }
  } catch (err) {
    // GET server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({ error: true, name: err.name, message: err.message })
  }
}

export default withYup(couponApiSchema, connectMongo(handler))
