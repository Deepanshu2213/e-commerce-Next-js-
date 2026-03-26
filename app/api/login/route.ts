import { connectDB } from "@/app/db/db";
import { User } from "@/app/models/User";
import { setCookie } from "@/app/utility/responseUtils";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectDB();
  const { email, password } = await req.json();
  try {
    const user = await User.login(email, password);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const res = NextResponse.json({ success: true, userId: user._id }, { status: 200 });
    return setCookie(user, res);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 401 });
  }
}
export const GET = async (req: NextRequest) => {
  await connectDB();
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Code not found" }, { status: 401 });
  }
  const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI)
  const { tokens } = await oauth2Client.getToken(code as string);
  oauth2Client.setCredentials(tokens);
  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
  const userInfo = await oauth2.userinfo.get();
  let { email, verified_email, name } = userInfo.data;
  if (!email || !verified_email) {
    return NextResponse.json({ error: "Email not found" }, { status: 401 });
  }
  name = name ? name : '';
  let user = await User.findOne({ email: email })
  if (!user) {
    user = new User({
      email: email,
      password: code,
      firstName: name,
      lastName: '',
    })
    await user.save();
    const res = NextResponse.redirect(new URL('/', req.url));
    return setCookie(user, res);
  }
  const res = NextResponse.redirect(new URL('/', req.url));
  return setCookie(user, res);
}