import { v2 as cld } from 'cloudinary'
import nc from 'middlewares/nc'
import withCheckAuthCookieAsAdmin from 'middlewares/withCheckAuthCookieAsAdmin'
import withCors from 'middlewares/withCors'
import { parse } from 'querystring'

export default nc
  .use(withCors(['GET', 'POST', 'DELETE']))
  .use(withCheckAuthCookieAsAdmin())
  .get('/api/v1/admin/cloudinary/resources', async (req, res) => {
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
  .post('/api/v1/admin/cloudinary/resources', async (_req, res) => {
    // const image = await cld.uploader.upload()

    // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(501).json({ error: false, message: 'Not yet implemented' })
  })
  .delete('/api/v1/admin/cloudinary/resources', async (req, res) => {
    // get query params
    const params = parse(req.url)

    // delete uploaded resources
    // const response = await cld.api.delete_resources([''], { type: 'upload' })

    // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res
      .status(501)
      .json({ error: true, params, message: 'Not yet implemented' })
  })
