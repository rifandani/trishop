export interface ChildrenProps {
  children: React.ReactNode
}

export interface AuthCookiePayload {
  sub: string // subject, whom the token refers to
  email: string
  name: string
  role: 'USER' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
  iat?: number // issuedAt, seconds since Unix epoch
  exp?: number // expiredAt, seconds since Unix epoch
}

export interface RefreshTokenCookiePayload {
  refreshToken: string
  iat?: number // issuedAt, seconds since Unix epoch
  exp?: number // expiredAt, seconds since Unix epoch
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
