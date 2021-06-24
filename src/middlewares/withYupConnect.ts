/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextHandler } from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

const withYupConnect =
  (schema: OptionalObjectSchema<ObjectShape>) =>
  async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    // list of supported request method
    const isSupportedMethod = ['POST', 'PUT'].includes(req.method)

    if (isSupportedMethod) {
      try {
        // validate req.body
        await schema.validate(req.body, {
          abortEarly: false,
          strict: true,
          stripUnknown: true,
        })
      } catch (err) {
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

    // continue ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    next()
  }

export default withYupConnect
