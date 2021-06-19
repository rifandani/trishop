import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
// files
import getQueryAsString from 'utils/getQueryAsString'
import ReportModel from 'mongo/models/Report'
import ReviewModel from 'mongo/models/Review'
import connectMongo from 'middlewares/connectMongo'
import checkObjectId from 'middlewares/checkObjectId'
import initMiddleware from 'middlewares/initMiddleware'
import checkAuthCookieAsAdmin from 'middlewares/checkAuthCookieAsAdmin'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'DELETE'],
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
      /*                       GET req => /admin/reports/:_id                      */
      /* -------------------------------------------------------------------------- */

      // get id
      const reportId = getQueryAsString(req.query._id)

      // get report
      const reportDoc = await ReportModel.findById(reportId)
        .populate({ path: 'reviewRef', model: ReviewModel })
        .exec()

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, report: reportDoc })
    } else if (req.method === 'DELETE') {
      /* -------------------------------------------------------------------------- */
      /*        DELETE req => /admin/reports/:_id?withreview=true                   */
      /* -------------------------------------------------------------------------- */

      const reportId = getQueryAsString(req.query._id)

      // just delete one report
      await ReportModel.findByIdAndDelete(reportId)

      // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, message: 'Report deleted' })
    } else {
      // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only supports GET, DELETE method',
      })
    }
  } catch (err) {
    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({ error: true, name: err.name, message: err.message })
  }
}

export default checkAuthCookieAsAdmin(
  connectMongo(checkObjectId(ReportModel, handler))
)
