import { NextApiRequest, NextApiResponse } from 'next'
// files
import CouponModel from 'mongo/models/Coupon'
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
      /*                          GET req => /admin/coupons                         */
      /* -------------------------------------------------------------------------- */

      // there is no query for filtering & sorting
      if (Object.keys(req.query).length === 0) {
        const coupons = await CouponModel.find()

        // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(200).json({ error: false, coupons, count: coupons.length })
        return
      }

      // const customQuery = req.query
    } else if (req.method === 'POST') {
      /* -------------------------------------------------------------------------- */
      /*                         POST req => /admin/coupons                        */
      /* -------------------------------------------------------------------------- */

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
    } else {
      // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only supports GET, POST method',
      })
    }
  } catch (err) {
    if (err.message.includes('duplicate key')) {
      // client error -----------------------------------------------------------------
      res.status(400).json({
        error: true,
        message: 'Code already exists. Please use a unique code',
      })
      return
    }

    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({ error: true, name: err.name, message: err.message })
  }
}

export default withYup(couponApiSchema, connectMongo(handler))
