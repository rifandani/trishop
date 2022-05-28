import { isValidObjectId, Model } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'
import getQueryAsString from 'utils/getQueryAsString'

const withCheckObjectId =
  <T>(
    model: Model<
      T,
      Record<string, unknown>,
      Record<string, unknown>,
      Record<string, unknown>
    >
  ) =>
  async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    // supported request method
    const isSupportedMethod = ['PUT', 'DELETE'].includes(req.method)
    const isGetRequestWithQueryId =
      req.method === 'GET' && Object.keys(req.query).includes('_id')

    if (isSupportedMethod || isGetRequestWithQueryId) {
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
    }

    // continue ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    next()
  }

export default withCheckObjectId
