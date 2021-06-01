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
  /* ------------------------------------------------------------------------------------------------------------------ */
  /*                           GET req => /admin/coupons + /admin/coupons?couponId={couponId}                           */
  /* ------------------------------------------------------------------------------------------------------------------ */
  if (req.method === 'GET') {
    try {
      // there is no query => GET /admin/coupons
      if (Object.keys(req.query).length === 0) {
        const coupons = await CouponModel.find()

        // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(200).json({ error: false, coupons })
        return
      }

      // ther is query {couponId}
      // check id validity
      const couponId = getQueryAsString(req.query.couponId)
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
    } catch (err) {
      // GET server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
    /* -------------------------------------------------------------------------- */
    /*                         POST req => /admin/coupons                        */
    /* -------------------------------------------------------------------------- */
  } else if (req.method === 'POST') {
    const { discount, minTransaction, code, desc, imageUrl, validUntil } =
      req.body as TCouponApiSchema

    try {
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
    } catch (err) {
      // POST server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
    /* -------------------------------------------------------------------------- */
    /*              PUT req => /admin/coupons?couponId={couponId}              */
    /* -------------------------------------------------------------------------- */
  } else if (req.method === 'PUT') {
    // check couponId validity
    const couponId = getQueryAsString(req.query.couponId)
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

    try {
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
    } catch (err) {
      // PUT server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
    /* -------------------------------------------------------------------------- */
    /*              DELETE req => /admin/coupons?couponId={couponId}              */
    /* -------------------------------------------------------------------------- */
  } else if (req.method === 'DELETE') {
    // check couponId validity
    const couponId = getQueryAsString(req.query.couponId)
    const couponIdIsValid = isValidObjectId(couponId)
    if (!couponIdIsValid) {
      // PUT client error => Bad Request -----------------------------------------------------------------
      res
        .status(400)
        .json({ error: true, message: 'couponId is not a valid ObjectId' })
      return
    }

    try {
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
    } catch (err) {
      // server error => internal server error ----------------------------------------
      res.status(500).json({
        error: true,
        name: err.name,
        message: err.message,
      })
    }
  } else {
    // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
    res.status(405).json({
      error: true,
      message: 'Only supports GET, POST, PUT, DELETE method',
    })
  }
}

export default withYup(couponApiSchema, connectMongo(handler))
