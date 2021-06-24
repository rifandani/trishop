import Cors from 'cors'
// files
import nc from 'middlewares/nc'
import withCheckAuthCookieAsAdmin from 'middlewares/withCheckAuthCookieAsAdmin'
import withYupConnect from 'middlewares/withYupConnect'
import withMongoConnect from 'middlewares/withMongoConnect'
import ReportModel from 'mongo/models/Report'
import ReviewModel from 'mongo/models/Review'
import { addReportApiSchema, TAddReportApiSchema } from 'yup/apiSchema'

export default nc
  // cors, middleware 1
  .use(
    Cors({
      methods: ['GET', 'POST'],
    })
  )
  .use(withCheckAuthCookieAsAdmin()) // check auth cookie middleware
  .use(withYupConnect(addReportApiSchema)) // yup middleware
  .use(withMongoConnect()) // connect mongodb middleware
  /* ---------------------------------- GET req => /admin/reports --------------------------------- */
  .get(async (req, res) => {
    // there is no query for filtering & sorting
    if (Object.keys(req.query).length === 0) {
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
  /* --------------------------------- POST req => /admin/reports --------------------------------- */
  .post(async (req, res) => {
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
