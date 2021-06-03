import { parse } from 'cookie'
import { isValidObjectId } from 'mongoose'
import { decode } from 'jsonwebtoken'

class authCookie {
  // FIXME: throws an error because isValidObjectId is only available in the server env
  static validateClient(cookie: string): boolean {
    const decodedToken = decode(cookie)
    return isValidObjectId(decodedToken.sub)
  }

  static validateServer(cookie: string): boolean {
    const cookies = parse(cookie ?? '')
    const authCookie = cookies.auth

    if (authCookie) {
      return isValidObjectId(authCookie.sub)
    }

    return false
  }
}

export default authCookie
