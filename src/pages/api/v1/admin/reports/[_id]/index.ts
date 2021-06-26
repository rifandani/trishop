import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withCheckAuthCookieAsAdmin from 'middlewares/withCheckAuthCookieAsAdmin'
import withMongoConnect from 'middlewares/withMongoConnect'
import withCheckObjectId from 'middlewares/withCheckObjectId'
import getQueryAsString from 'utils/getQueryAsString'
import ReportModel from 'mongo/models/Report'
import ReviewModel from 'mongo/models/Review'

export default nc
  .use(withCors(['GET', 'DELETE'])) // cors
  .use(withCheckAuthCookieAsAdmin()) // check auth cookie middleware
  .use(withMongoConnect()) // connect mongodb middleware
  .use(withCheckObjectId(ReportModel)) // check query object id middleware
  /* ------------------------------- GET req => /admin/reports/:_id ------------------------------- */
  .get(async (req, res) => {
    // get id
    const reportId = getQueryAsString(req.query._id)

    // get report
    const reportDoc = await ReportModel.findById(reportId)
      .populate({ path: 'reviewRef', model: ReviewModel })
      .exec()

    // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({ error: false, report: reportDoc })
  })
  /* ------------------------------ DELETE req => /admin/reports/:_id ----------------------------- */
  /* -------------------------------- TODO: delete report + review -------------------------------- */
  .delete(async (req, res) => {
    const reportId = getQueryAsString(req.query._id)

    // just delete one report
    await ReportModel.findByIdAndDelete(reportId)

    // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({ error: false, message: 'Report deleted' })
  })
