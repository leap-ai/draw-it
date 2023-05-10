import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const modelId = searchParams.get("modelId");
  const remixId = searchParams.get("remixId");

  const apiUrl = `https://api.tryleap.ai/api/v1/images/models/${modelId}/remix/${remixId}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.LEAP_API_KEY}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Request failed with status ${response.status}` },
        { status: response.status }
      );
    }

    const jsonResponse = await response.json();
    return NextResponse.json(jsonResponse);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error while checking the remix status:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
