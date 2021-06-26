import { parse } from 'querystring'
import { v2 as cld } from 'cloudinary'
// files
import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withCheckAuthCookieAsAdmin from 'middlewares/withCheckAuthCookieAsAdmin'

export default nc
  .use(withCors(['GET', 'POST', 'DELETE'])) // cors
  .use(withCheckAuthCookieAsAdmin()) // check auth cookie mongodb, middleware 2
  /* ----------------------------- GET req => /admin/cloudinary/images ---------------------------- */
  .get(async (req, res) => {
    // there is no query for filtering & sorting
    if (Object.keys(req.query).length === 0) {
      const resources = await cld.api.resources({
        resource_type: 'image',
        type: 'upload', // default: 'all'
        max_results: 20, // default: 10
        direction: '', // desc || asc || -1 || 1
      })

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, count: resources.length, resources })
      return
    }

    // const customQuery = req.query
  })
  /* ---------------------------- POST req => /admin/cloudinary/images ---------------------------- */
  .post(async (_req, res) => {
    // const image = await cld.uploader.upload()

    // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(501).json({ error: false, message: 'Not yet implemented' })
  })
  /* ------------------------- DELETE req => /admin/cloudinary/images?ids ------------------------- */
  .delete(async (req, res) => {
    // get query params
    const params = parse(req.url)

    // delete uploaded resources
    // const response = await cld.api.delete_resources([''], { type: 'upload' })

    // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res
      .status(501)
      .json({ error: true, params, message: 'Not yet implemented' })
  })
