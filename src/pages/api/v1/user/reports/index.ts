import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
// files
import ReportModel from 'mongo/models/Report'
import connectMongo from 'middlewares/connectMongo'
import withYup from 'middlewares/withYup'
import checkAuthCookie from 'middlewares/checkAuthCookie'
import initMiddleware from 'middlewares/initMiddleware'
import { addReportApiSchema, TAddReportApiSchema } from 'yup/apiSchema'

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
)

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await cors(req, res) // Run cors

    if (req.method === 'POST') {
      /* -------------------------------------------------------------------------- */
      /*                         POST req => /user/reports                         */
      /* -------------------------------------------------------------------------- */

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
    } else {
      // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only supports POST method',
      })
    }
  } catch (err) {
    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({ error: true, name: err.name, message: err.message })
  }
}

export default checkAuthCookie(
  withYup(addReportApiSchema, connectMongo(handler))
)
