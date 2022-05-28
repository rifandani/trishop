import nc from 'middlewares/nc'
import withCheckAuthCookieAsAdmin from 'middlewares/withCheckAuthCookieAsAdmin'
import withCors from 'middlewares/withCors'
import withMongoConnect from 'middlewares/withMongoConnect'
import withYupConnect from 'middlewares/withYupConnect'
import ReportModel from 'mongo/models/Report'
import ReviewModel from 'mongo/models/Review'
import { addReportApiSchema, TAddReportApiSchema } from 'yup/apiSchema'

export default nc
  .use(withCors(['GET', 'POST'])) // cors
  .use(withCheckAuthCookieAsAdmin()) // check auth cookie
  .use(withYupConnect(addReportApiSchema)) // yup
  .use(withMongoConnect()) // connect mongodb
  .get('/api/v1/admin/reports', async (req, res) => {
    // there is no query for filtering & sorting
    if (Object.keys(req.query).length === 0) {
      // find report and populate reviewRef property
      const reportsDoc = await ReportModel.find()
        .populate({ path: 'reviewRef', model: ReviewModel })
        .sort({ createdAt: -1 }) // desc
        .exec()

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res
        .status(200)
        .json({ error: false, reports: reportsDoc, count: reportsDoc.length })
      return
    }

    // const customQuery = req.query
  })
  .post('/api/v1/admin/reports', async (req, res) => {
    // destructure req.body
    const { reviewRef, reporter, argument, typeId } =
      req.body as TAddReportApiSchema

    // create report
    const reportDoc = await ReportModel.create({
      reviewRef,
      reporter,
      argument,
      typeId,
    })

    // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(201).json({ error: false, reportId: reportDoc._id })
  })
