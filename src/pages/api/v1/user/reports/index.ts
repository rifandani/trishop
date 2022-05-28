import nc from 'middlewares/nc'
import withCheckAuthCookie from 'middlewares/withCheckAuthCookie'
import withCors from 'middlewares/withCors'
import withMongoConnect from 'middlewares/withMongoConnect'
import withYupConnect from 'middlewares/withYupConnect'
import ReportModel from 'mongo/models/Report'
import { addReportApiSchema, TAddReportApiSchema } from 'yup/apiSchema'

export default nc
  .use(withCors(['POST'])) // cors
  .use(withCheckAuthCookie()) // check auth cookie middleware
  .use(withYupConnect(addReportApiSchema)) // yup middleware
  .use(withMongoConnect()) // connect mongodb middleware
  .post('/api/v1/user/reports', async (req, res) => {
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
