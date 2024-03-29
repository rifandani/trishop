import nc from 'middlewares/nc'
import withCheckAuthCookieAsAdmin from 'middlewares/withCheckAuthCookieAsAdmin'
import withCheckObjectId from 'middlewares/withCheckObjectId'
import withCors from 'middlewares/withCors'
import withMongoConnect from 'middlewares/withMongoConnect'
import ReportModel from 'mongo/models/Report'
import ReviewModel from 'mongo/models/Review'
import getQueryAsString from 'utils/getQueryAsString'

export default nc
  .use(withCors(['GET', 'DELETE'])) // cors
  .use(withCheckAuthCookieAsAdmin()) // check auth cookie
  .use(withMongoConnect()) // connect mongodb
  .use(withCheckObjectId(ReportModel)) // check query object id
  .get('/api/v1/admin/reports/:_id', async (req, res) => {
    // get id
    const reportId = getQueryAsString(req.query._id)

    // get report
    const reportDoc = await ReportModel.findById(reportId)
      .populate({ path: 'reviewRef', model: ReviewModel })
      .exec()

    // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({ error: false, report: reportDoc })
  })
  .delete('/api/v1/admin/reports/:_id', async (req, res) => {
    /* -------------------------------- TODO: delete report + review -------------------------------- */
    const reportId = getQueryAsString(req.query._id)

    // just delete one report
    await ReportModel.findByIdAndDelete(reportId)

    // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({ error: false, message: 'Report deleted' })
  })
