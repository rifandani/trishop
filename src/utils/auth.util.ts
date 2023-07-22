import { parse } from 'cookie'
import { IncomingHttpHeaders } from 'http'
import { verify } from 'jsonwebtoken'
import { AuthCookiePayload } from 'types'

export const checkAuthSSP = async (headers: IncomingHttpHeaders) => {
  const cookies = parse(headers?.cookie ?? '')
  const authCookie = cookies.auth

  // no authCookie === not logged in
  if (!authCookie)
    return {
      props: {},
    }

  // verify authCookie
  const { role } = verify(
    authCookie,
    process.env.MY_SECRET_KEY
  ) as AuthCookiePayload

  // role === ADMIN
  if (role === 'ADMIN')
    return {
      redirect: { destination: '/admin/dashboard', permanent: false },
    }

  // role === USER
  return {
    redirect: { destination: '/user/dashboard', permanent: false },
  }
}
