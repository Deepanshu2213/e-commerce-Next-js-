import { User } from "@/app/models/User";
import { setCookie } from "@/app/utility/responseUtils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
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