import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  (await cookies()).set("token", "", {
    httpOnly: true,
    expires: new Date(0), // expire now
    path: "/",
  });

  return NextResponse.json({ success: true });
}
