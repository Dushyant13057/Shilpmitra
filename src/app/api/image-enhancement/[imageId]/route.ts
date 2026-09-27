import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8080";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ imageId: string }> }
) {
  const { imageId } = await params;

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized access. Please log in." },
      { status: 401 }
    );
  }

  const token = authHeader.replace("Bearer ", "").trim();

  // Forward query strictly to Java 17 + Spring Boot Backend (Architecture Requirement 5)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const springRes = await fetch(`${BACKEND_URL}/api/image-enhancement/${imageId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const springData = await springRes.json();
    return NextResponse.json(springData, { status: springRes.status });
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    console.error("[Get Image Backend Error]:", err);
    return NextResponse.json(
      {
        error: `Backend service is unreachable at ${BACKEND_URL}. Please ensure the Java backend is running on port 8080.`,
      },
      { status: 503 }
    );
  }
}
