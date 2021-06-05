import { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose'
// files
import CouponModel from 'mongo/models/Coupon'
import getQueryAsString from 'utils/getQueryAsString'
import connectMongo from 'middlewares/connectMongo'
import withYup from 'middlewares/withYup'
import { couponApiSchema, TCouponApiSchema } from 'yup/apiSchema'

// TODO: add authentication middleware for all ADMIN api's
const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      /* -------------------------------------------------------------------------- */
      /*                       GET req => /admin/coupons/:_id                       */
      /* -------------------------------------------------------------------------- */

      // check id validity
      const couponId = getQueryAsString(req.query._id)
      const couponIdIsValid = isValidObjectId(couponId)
      if (!couponIdIsValid) {
        // GET client error => Bad Request -----------------------------------------------------------------
        res
          .status(400)
          .json({ error: true, message: 'couponId is not a valid ObjectId' })
        return
      }

      // find existing coupon
      const couponIsExists = await CouponModel.exists({ _id: couponId })
      if (!couponIsExists) {
        // PUT client error => Bad Request -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message:
            'couponId is a valid ObjectId, but can not find the coupon. Maybe it is already deleted',
        })
        return
      }

      // get coupon by couponId
      const coupon = await CouponModel.findById(couponId)

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, coupon })
    } else if (req.method === 'PUT') {
      /* -------------------------------------------------------------------------- */
      /*                       PUT req => /admin/coupons/:_id                       */
      /* -------------------------------------------------------------------------- */

      // check couponId validity
      const couponId = getQueryAsString(req.query._id)
      const couponIdIsValid = isValidObjectId(couponId)
      if (!couponIdIsValid) {
        // PUT client error => Bad Request -----------------------------------------------------------------
        res
          .status(400)
          .json({ error: true, message: 'couponId is not a valid ObjectId' })
        return
      }

      const { discount, minTransaction, code, desc, imageUrl, validUntil } =
        req.body as TCouponApiSchema

      // find existing coupon
      const couponIsExists = await CouponModel.exists({ _id: couponId })
      if (!couponIsExists) {
        // PUT client error => Bad Request -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message:
            'couponId is a valid ObjectId, but can not find the coupon. Maybe it is already deleted',
        })
        return
      }

      // update coupon
      await CouponModel.findByIdAndUpdate(couponId, {
        discount,
        minTransaction,
        code,
        desc,
        imageUrl,
        validUntil,
      })

      // PUT success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, message: 'Coupon updated' })
    } else if (req.method === 'DELETE') {
      /* -------------------------------------------------------------------------- */
      /*                      DELETE req => /admin/coupons/:_id                     */
      /* -------------------------------------------------------------------------- */

      // check couponId validity
      const couponId = getQueryAsString(req.query._id)
      const couponIdIsValid = isValidObjectId(couponId)
      if (!couponIdIsValid) {
        // PUT client error => Bad Request -----------------------------------------------------------------
        res
          .status(400)
          .json({ error: true, message: 'couponId is not a valid ObjectId' })
        return
      }

      // find existing coupon
      const couponIsExists = await CouponModel.exists({ _id: couponId })
      if (!couponIsExists) {
        // PUT client error => Bad Request -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message:
            'couponId is a valid ObjectId, but can not find the coupon. Maybe it is already deleted',
        })
        return
      }

      // delete coupon
      await CouponModel.findByIdAndDelete(couponId)

      // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, message: 'Coupon deleted' })
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
