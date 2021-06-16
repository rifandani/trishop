import { NextApiRequest, NextApiResponse } from 'next'

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function initMiddleware(middleware: any) {
  return (req: NextApiRequest, res: NextApiResponse): Promise<any> =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}
