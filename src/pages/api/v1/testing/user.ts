import { NextApiRequest, NextApiResponse } from 'next';
// files
import ProductModel from 'mongo/models/Product';
import connectMongo from 'middlewares/connectMongo';

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // destructure request body form
    const { name, role, email, password } = req.body;

    try {
      // user test
      // const doc = await UserModel.create({ name, role, email, password });
      // const user = await UserModel.findById('60aa308e55522939344fd48e');

      // product test
      // const doc = await UserModel.create({ name, role, email, password });
      const product = await ProductModel.findById('5fc906411b6b543c64b6e43d');

      // SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({
        // doc,
        // user,
        product,
        error: false,
      });
    } catch (err) {
      // POST server error => Internal Server Error -----------------------------------------------------------------
      res.status(500).json({
        error: true,
        name: err.name,
        message: err.message,
      });
      return;
    }
  } else {
    // client error => Method Not Allowed -----------------------------------------------------------------
    res.status(405).json({ error: true, message: 'Only support POST req' });
  }
};

export default connectMongo(handler);
