import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withCheckAuthCookieAsAdmin from 'middlewares/withCheckAuthCookieAsAdmin'
import withYupConnect from 'middlewares/withYupConnect'
import withMongoConnect from 'middlewares/withMongoConnect'
import CouponModel from 'mongo/models/Coupon'
import { couponApiSchema, TCouponApiSchema } from 'yup/apiSchema'

interface CouponCodes {
  _id: string
  code: string
}

export default nc
  .use(withCors(['GET', 'POST'])) // cors
  .use(withCheckAuthCookieAsAdmin()) // check auth cookie
  .use(withYupConnect(couponApiSchema)) // yup
  .use(withMongoConnect()) // connect mongodb
  .get('/api/v1/admin/coupons', async (req, res) => {
    // there is no query for filtering & sorting
    if (Object.keys(req.query).length === 0) {
      // find all coupons
      const coupons = await CouponModel.find()

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, coupons, count: coupons.length })
      return
    }

    // const customQuery = req.query
  })
  .post('/api/v1/admin/coupons', async (req, res) => {
    // destructure req.body
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

    // create new coupon to mongodb
    const couponDoc = await CouponModel.create({
      desc,
      discount,
      validUntil,
      minTransaction,
      code: code.toUpperCase(),
    })

    // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(201).json({
      error: false,
      couponId: couponDoc._id,
    })
  })
