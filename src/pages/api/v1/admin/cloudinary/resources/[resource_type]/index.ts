import { v2 as cld } from 'cloudinary'
// files
import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withCheckAuthCookieAsAdmin from 'middlewares/withCheckAuthCookieAsAdmin'
import getQueryAsString from 'utils/getQueryAsString'
import getQueryStringAsArray from 'utils/getQueryStringAsArray'

export default nc
  .use(withCors(['GET', 'PUT', 'DELETE'])) // cors
  .use(withCheckAuthCookieAsAdmin()) // ccheck auth cookie, middleware 2
  .get(
    '/api/v1/admin/cloudinary/resources/:resource_type',
    async (_req, res) => {
      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(501).json({ error: true, message: 'Not yet implemented' })
    }
  )
  .put(
    '/api/v1/admin/cloudinary/resources/:resource_type',
    async (_req, res) => {
      // PUT success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(501).json({ error: true, message: 'Not yet implemented' })
    }
  )
  /* ------------- DELETE req => /admin/cloudinary/resources/:resource_type?public_ids ------------ */
  /* --------------- https://cloudinary.com/documentation/admin_api#delete_resources -------------- */
  .delete(
    '/api/v1/admin/cloudinary/resources/:resource_type',
    async (req, res) => {
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
    }
  )
