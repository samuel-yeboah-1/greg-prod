import { NextRequest, NextResponse } from "next/server";
import { sendInterestEmail } from "@/services/register-interest";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    await sendInterestEmail({ email });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
