import { NextApiRequest, NextApiResponse } from 'next';
// files
import connectDB from '../../../mongo/config/connectDB';
import Product from '../../../mongo/models/Product';

export default async function getCategories(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // connect DB
  await connectDB();

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
}
