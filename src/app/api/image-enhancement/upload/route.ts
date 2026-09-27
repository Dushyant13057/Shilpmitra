import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8080";
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in to upload product images." },
      { status: 401 }
    );
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Please select an image file to upload." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds the 10MB maximum upload limit." },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: "Unsupported image format. Accepted formats are JPG, JPEG, PNG, and WEBP." },
        { status: 400 }
      );
    }

    // Forward upload directly to Java 17 + Spring Boot Backend
    const springFormData = new FormData();
    springFormData.append("file", file);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout for upload

    try {
      const springRes = await fetch(`${BACKEND_URL}/api/image-enhancement/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: springFormData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const springData = await springRes.json();
      return NextResponse.json(springData, { status: springRes.status });
    } catch (fetchErr: unknown) {
      clearTimeout(timeoutId);
      console.error("[Upload Backend Error]:", fetchErr);
      return NextResponse.json(
        {
          error: `Spring Boot backend service is unreachable at ${BACKEND_URL}. Please ensure the Java backend is running on port 8080.`,
        },
        { status: 503 }
      );
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    console.error("[Image Upload Proxy Error]:", err);
    return NextResponse.json(
      { error: "Image upload failed: " + msg },
      { status: 500 }
    );
  }
}
