import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function middleware(req) {
  const token = req.headers.get("authorization");

  if (!token) {
    return new NextResponse(JSON.stringify({ message: "Authorization required" }), { status: 401 });
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Invalid token" }), { status: 401 });
  }
}
