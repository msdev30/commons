import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.redirect("/auth/signin?error=missing_code")
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID!,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI!,
      }),
    })

    const tokens = await tokenResponse.json()

    if (tokens.access_token) {
      // Get user info from Google
      const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      })

      const user = await userResponse.json()

      // Create session and redirect
      const response = NextResponse.redirect("/")
      response.cookies.set("auth-token", tokens.id_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60, // 1 day
      })

      return response
    }

    return NextResponse.redirect("/auth/signin?error=auth_failed")
  } catch (error) {
    console.error("OAuth callback error:", error)
    return NextResponse.redirect("/auth/signin?error=server_error")
  }
}
