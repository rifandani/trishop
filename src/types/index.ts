export interface ChildrenProps {
  children: React.ReactNode
}

export interface AuthCookiePayload {
  sub: string // subject, whom the token refers to
  email: string
  name: string
  role: 'USER' | 'ADMIN'
  iat?: number // issuedAt, seconds since Unix epoch
  exp?: number // expiredAt, seconds since Unix epoch
  iss?: string // issuer, token creator
}

export interface RefreshTokenCookiePayload {
  refreshToken: string
  iat?: number // issuedAt, seconds since Unix epoch
  exp?: number // expiredAt, seconds since Unix epoch
  iss?: string // issuer, token creator
}

export interface IPhotoURL {
  lastModified: number
  lastModifiedDate: Date
  name: string
  path: string
  preview?: string // hasil URL.createObjectURL(image)
  size: number
  type: string
  webkitRelativePath: string
}
