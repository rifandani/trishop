import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId, Model, SchemaType } from 'mongoose'
// files
import getQueryAsString from 'utils/getQueryAsString'

// yup middleware
const checkObjectId =
  (model: Model<SchemaType, {}, {}>, handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    // supported request method
    const isSupportedMethod = ['PUT', 'DELETE'].includes(req.method)
    const isGetRequestWithQueryId =
      req.method === 'GET' && Object.keys(req.query).includes('_id')

    if (isSupportedMethod || isGetRequestWithQueryId) {
      try {
        const objectId = getQueryAsString(req.query._id)
        const objectIdIsValid = isValidObjectId(objectId)

        if (!objectIdIsValid) {
          // client error => Bad Request -----------------------------------------------------------------
          res.status(400).json({ error: true, message: 'Not a valid ObjectId' })
          return
        }

        // find existing doc
        const docIsExists = await model.exists({ _id: objectId })

        if (!docIsExists) {
          // client error => Bad Request -----------------------------------------------------------------
          res.status(400).json({
            error: true,
            message:
              'Is a valid ObjectId, but can not find the doc. Maybe it is already deleted',
          })
          return
        }
      } catch (err) {
        // STOP execution
        // client error => Bad Request ------------------------------------------------------------------------------
        res.status(400).json({
          error: true,
          name: err.name,
          message: err.message,
          errors: err.errors,
        })
        return
      }
    }

    // continue to API handler ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    await handler(req, res)
  }

export default checkObjectId
