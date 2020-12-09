import { NextApiRequest, NextApiResponse } from 'next';

export default async function Coupon(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const availableCoupons = ['10off', '20off'];

    const coupon = req.body.coupon; // asumsi coupon sudah lowercase
    const isValidCoupon = availableCoupons.includes(coupon);

    if (!isValidCoupon) {
      // BAD REQUEST => coupon tidak valid
      return res
        .status(200)
        .json({ error: true, message: 'Coupon is not valid' });
    }

    if (coupon === '10off') {
      // SUCCESS - return discount value
      return res.status(200).json({ error: false, discount: 0.1 });
    }

    // SUCCESS - return discount value
    return res.status(200).json({ error: false, discount: 0.2 });
  } else {
    // error => invalid req method
    return res
      .status(405)
      .json({ error: true, message: 'Only support POST req' });
  }
}
