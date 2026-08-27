import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: "Logout successful",
      },
      { status: 200 }
    );

    response.cookies.delete("token");
    return response;
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Logout failed",
      },
      { status: 400 }
    );
  }
}