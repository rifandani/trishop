/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextHandler } from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

const withYupConnect =
  (schema: OptionalObjectSchema<ObjectShape>) =>
  async (req: NextApiRequest, _res: NextApiResponse, next: NextHandler) => {
    // list of supported request method
    const isSupportedMethod = ['POST', 'PUT'].includes(req.method)

    if (isSupportedMethod) {
      // validate req.body
      await schema.validate(req.body, {
        abortEarly: false,
        strict: true,
        stripUnknown: true,
      })
    }

    // continue ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    next()
  }

export default withYupConnect
