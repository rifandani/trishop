/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

// yup middleware
const withYup =
  (schema: OptionalObjectSchema<ObjectShape>, handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    // supported request method
    const isSupportedMethod = ['POST', 'PUT'].includes(req.method)

    if (isSupportedMethod) {
      try {
        // req.url === '/api/qrcode'
        // const newSchema = req.method === 'POST' ? schema : schema.concat(object({ id: number().required().positive() }))
        // const newSchema = req.method === 'PUT' ? schema : schema.omit(['password', 'confirmPassword', 'termsConditions'])

        // validate req.body
        await schema.validate(req.body, {
          abortEarly: false,
          strict: true,
          stripUnknown: true,
        })
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

export default withYup
