import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { v2 as cld } from 'cloudinary'
import { parse } from 'querystring'
// files
import initMiddleware from 'middlewares/initMiddleware'
import checkAuthCookieAsAdmin from 'middlewares/checkAuthCookieAsAdmin'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'DELETE'],
  })
)

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await cors(req, res) // Run cors

    if (req.method === 'GET') {
      /* -------------------------------------------------------------------------- */
      /*                         GET req => /admin/cloudinary/images                */
      /* -------------------------------------------------------------------------- */

      // there is no query for filtering & sorting
      if (Object.keys(req.query).length === 0) {
        const resources = await cld.api.resources({
          resource_type: 'image',
          type: 'upload', // default: 'all'
          max_results: 20, // default: 10
          direction: '', // desc || asc || -1 || 1
        })

        // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res
          .status(200)
          .json({ error: false, count: resources.length, resources })
        return
      }
    } else if (req.method === 'POST') {
      /* -------------------------------------------------------------------------- */
      /*                         POST req => /admin/cloudinary/images               */
      /* -------------------------------------------------------------------------- */

      // const image = await cld.uploader.upload()

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(501).json({ error: false, message: 'Not yet implemented' })
    } else if (req.method === 'DELETE') {
      /* -------------------------------------------------------------------------- */
      /*               DELETE req => /admin/cloudinary/images?ids                       */
      /* -------------------------------------------------------------------------- */

      // get query params
      const params = parse(req.url)

      // delete uploaded resources
      // const response = await cld.api.delete_resources([''], { type: 'upload' })

      // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res
        .status(501)
        .json({ error: true, params, message: 'Not yet implemented' })
    } else {
      // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only supports GET, POST, DELETE method',
      })
    }
  } catch (err) {
    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({ error: true, name: err.name, message: err.message })
  }
}

export default checkAuthCookieAsAdmin(handler)
