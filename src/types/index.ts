import { JwtPayload } from 'jsonwebtoken'

export interface ChildrenProps {
  children: React.ReactNode
}

export interface ImagePreview extends File {
  preview?: string // hasil URL.createObjectURL(image)
}

/* ----------------------------------------- JWT Payload ---------------------------------------- */

export interface AuthCookiePayload extends JwtPayload {
  sub: string // subject, whom the token refers to
  email: string
  name: string
  role: 'USER' | 'ADMIN'
}

export interface RefreshTokenCookiePayload extends JwtPayload {
  refreshToken: string
}

/* ----------------------------------------- GENERIC RESPONSE ---------------------------------------- */

export interface HttpResponse {
  error: boolean
  message?: string
}
