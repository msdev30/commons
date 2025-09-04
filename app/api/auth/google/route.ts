import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")

  googleAuthUrl.searchParams.set("client_id", process.env.GOOGLE_OAUTH_CLIENT_ID!)
  googleAuthUrl.searchParams.set("redirect_uri", process.env.GOOGLE_OAUTH_REDIRECT_URI!)
  googleAuthUrl.searchParams.set("response_type", "code")
  googleAuthUrl.searchParams.set("scope", "openid email profile")
  googleAuthUrl.searchParams.set("access_type", "offline")
  googleAuthUrl.searchParams.set("prompt", "consent")

  return NextResponse.redirect(googleAuthUrl.toString())
}
