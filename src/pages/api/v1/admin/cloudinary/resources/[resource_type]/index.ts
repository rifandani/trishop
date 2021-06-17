import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { v2 as cld } from 'cloudinary'
// files
import getQueryAsString from 'utils/getQueryAsString'
import getQueryStringAsArray from 'utils/getQueryStringAsArray'
import initMiddleware from 'middlewares/initMiddleware'
import checkAuthCookieAsAdmin from 'middlewares/checkAuthCookieAsAdmin'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'PUT', 'DELETE'],
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
      /*       GET req => /admin/cloudinary/resources/:resource_type                */
      /* -------------------------------------------------------------------------- */

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(501).json({ error: true, message: 'Not yet implemented' })
    } else if (req.method === 'PUT') {
      /* -------------------------------------------------------------------------- */
      /*       PUT req => /admin/cloudinary/resources/:resource_type                */
      /* -------------------------------------------------------------------------- */

      // PUT success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(501).json({ error: true, message: 'Not yet implemented' })
    } else if (req.method === 'DELETE') {
      /* -------------------------------------------------------------------------- */
      /*     DELETE req => /admin/cloudinary/resources/:resource_type?public_ids    */
      /* -------------------------------------------------------------------------- */
      /* ----- https://cloudinary.com/documentation/admin_api#delete_resources ---- */

      // get query params
      const resource_type = getQueryAsString(req.query.resource_type) // string
      const public_ids = getQueryStringAsArray(req.query.public_ids) // string []

      // delete uploaded resources
      const response = await cld.api.delete_resources(public_ids, {
        resource_type,
        type: 'upload',
      })

      // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, data: response })
    } else {
      // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only supports GET, PUT, DELETE method',
      })
    }
  } catch (err) {
    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({ error: true, name: err.name, message: err.message })
  }
}

export default checkAuthCookieAsAdmin(handler)
