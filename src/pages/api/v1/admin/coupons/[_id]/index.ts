import { NextApiRequest, NextApiResponse } from 'next'
// files
import CouponModel from 'mongo/models/Coupon'
import getQueryAsString from 'utils/getQueryAsString'
import checkObjectId from 'middlewares/checkObjectId'
import connectMongo from 'middlewares/connectMongo'
import withYup from 'middlewares/withYup'
import { couponApiSchema, TCouponApiSchema } from 'yup/apiSchema'

interface CouponCodes {
  _id: string
  code: string
}

// TODO: add authentication middleware for all ADMIN api's
const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.method === 'GET') {
      /* -------------------------------------------------------------------------- */
      /*                       GET req => /admin/coupons/:_id                       */
      /* -------------------------------------------------------------------------- */

      // get id from query
      const couponId = getQueryAsString(req.query._id)

      // get coupon by couponId
      const coupon = await CouponModel.findById(couponId)

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, coupon })
    } else if (req.method === 'PUT') {
      /* -------------------------------------------------------------------------- */
      /*                       PUT req => /admin/coupons/:_id                       */
      /* -------------------------------------------------------------------------- */

      // get id from query
      const couponId = getQueryAsString(req.query._id)

      const { discount, minTransaction, code, desc, validUntil } =
        req.body as TCouponApiSchema

      // get all coupons code
      const couponsDoc = await CouponModel.find().select('code') // { _id: string, code: string }[]
      const coupons = JSON.parse(JSON.stringify(couponsDoc)) as CouponCodes[]
      const codes = coupons.map((coupon) => coupon.code)
      const codeAlreadyExists = codes.includes(code.toUpperCase())

      if (codeAlreadyExists) {
        // client error -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message: 'Code already exists. Please use a unique code',
        })
        return
      }

      // update coupon
      await CouponModel.findByIdAndUpdate(couponId, {
        discount,
        minTransaction,
        code,
        desc,
        validUntil,
      })

      // PUT success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, message: 'Coupon updated' })
    } else if (req.method === 'DELETE') {
      /* -------------------------------------------------------------------------- */
      /*                      DELETE req => /admin/coupons/:_id                     */
      /* -------------------------------------------------------------------------- */

      // get id from query
      const couponId = getQueryAsString(req.query._id)

      // delete coupon
      await CouponModel.findByIdAndDelete(couponId)

      // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, message: 'Coupon deleted' })
    } else {
      // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only supports GET, PUT, DELETE method',
      })
    }
  } catch (err) {
    // GET server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({ error: true, name: err.name, message: err.message })
  }
}

export default checkObjectId(
  CouponModel,
  withYup(couponApiSchema, connectMongo(handler))
)
