import { NextApiRequest, NextApiResponse } from 'next';
// files
import Product from 'mongo/models/Product';
import connectMongo from 'middlewares/connectMongo';

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // get all products
      const products = await Product.find();

      let x: string[] = [];

      const labels = products.map((product) => product.labels);
      labels.forEach((label: string[]) => {
        label.forEach((el: string) => x.push(el));
      });

      const categories = [...new Set(x)]; // filter duplicate value in array

      // JSON response => [category] ---------------------------------------- OK
      return res.status(200).json(categories);
    } catch (err) {
      // error 400 => BAD REQUEST
      return res.status(400).json({ error: true, message: 'Bad request' });
    }
  } else {
    // error 405 => METHOD NOT ALLOWED
    return res.status(405).json({
      error: true,
      message: 'Only supports GET',
    });
  }
};

export default connectMongo(handler);
