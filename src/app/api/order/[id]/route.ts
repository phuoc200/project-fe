import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id?: string } }
) {
  const { id } = await params;

  try {
    const response = await fetch(`http://localhost:5000/api/order/${id}`);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch orders" },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
