import dbConnect from "@/lib/dbConnect";

// GET /api/v1 — Health check endpoint
export async function GET() {
  try {
    await dbConnect();

    return Response.json(
      {
        success: true,
        message: "🚀 Car Doctor API server is running",
        database: "Connected to MongoDB",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error";

    return Response.json(
      {
        success: false,
        message: "Server is running but database connection failed",
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
