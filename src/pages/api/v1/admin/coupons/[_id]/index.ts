import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withCheckAuthCookieAsAdmin from 'middlewares/withCheckAuthCookieAsAdmin'
import withYupConnect from 'middlewares/withYupConnect'
import withMongoConnect from 'middlewares/withMongoConnect'
import withCheckObjectId from 'middlewares/withCheckObjectId'
import CouponModel from 'mongo/models/Coupon'
import getQueryAsString from 'utils/getQueryAsString'
import { couponApiSchema, TCouponApiSchema } from 'yup/apiSchema'

interface CouponCodes {
  _id: string
  code: string
}

export default nc
  .use(withCors(['GET', 'PUT', 'DELETE'])) // cors
  .use(withCheckAuthCookieAsAdmin()) // check auth cookie middleware
  .use(withYupConnect(couponApiSchema)) // yup middleware
  .use(withMongoConnect()) // connect mongodb middleware
  .use(withCheckObjectId(CouponModel)) // check query object id middleware
  /* ------------------------------- GET req => /admin/coupons/:_id ------------------------------- */
  .get(async (req, res) => {
    // get id from query
    const couponId = getQueryAsString(req.query._id)

    // get coupon by couponId
    const coupon = await CouponModel.findById(couponId)

    // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({ error: false, coupon })
  })
  /* ------------------------------- PUT req => /admin/coupons/:_id ------------------------------- */
  .put(async (req, res) => {
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
  })
  /* ------------------------------ DELETE req => /admin/coupons/:_id ----------------------------- */
  .delete(async (req, res) => {
    // get id from query
    const couponId = getQueryAsString(req.query._id)

    // delete coupon
    await CouponModel.findByIdAndDelete(couponId)

    // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({ error: false, message: 'Coupon deleted' })
  })
