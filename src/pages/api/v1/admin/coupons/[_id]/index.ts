import nc from 'middlewares/nc'
import withCheckAuthCookieAsAdmin from 'middlewares/withCheckAuthCookieAsAdmin'
import withCheckObjectId from 'middlewares/withCheckObjectId'
import withCors from 'middlewares/withCors'
import withMongoConnect from 'middlewares/withMongoConnect'
import withYupConnect from 'middlewares/withYupConnect'
import CouponModel from 'mongo/models/Coupon'
import getQueryAsString from 'utils/getQueryAsString'
import { couponApiSchema, TCouponApiSchema } from 'yup/apiSchema'

export default nc
  .use(withCors(['GET', 'PUT', 'DELETE'])) // cors
  .use(withCheckAuthCookieAsAdmin()) // check auth cookie
  .use(withYupConnect(couponApiSchema)) // yup
  .use(withMongoConnect()) // connect mongodb
  .use(withCheckObjectId(CouponModel)) // check query object id
  .get('/api/v1/admin/coupons/:_id', async (req, res) => {
    // get id from query
    const couponId = getQueryAsString(req.query._id)

    // get coupon by couponId
    const coupon = await CouponModel.findById(couponId)

    // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({ error: false, coupon })
  })
  .put('/api/v1/admin/coupons/:_id', async (req, res) => {
    // get id from query
    const couponId = getQueryAsString(req.query._id)

    const { discount, minTransaction, code, desc, validUntil } =
      req.body as TCouponApiSchema

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
  .delete('/api/v1/admin/coupons/:_id', async (req, res) => {
    // get id from query
    const couponId = getQueryAsString(req.query._id)

    // delete coupon
    await CouponModel.findByIdAndDelete(couponId)

    // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({ error: false, message: 'Coupon deleted' })
  })
