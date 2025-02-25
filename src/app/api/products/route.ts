import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageNumber = Number(searchParams.get("pageNumber") || "1");
  const pageSize = Number(searchParams.get("pageSize") || "6");
  const category = searchParams.get("category") || "";

  try {
    let url = `${process.env.API_BASE_URL}/api/Product?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    if (category) {
      url += `&category=${category}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch products from backend");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const productData = await request.json();
    const response = await fetch(`${process.env.API_BASE_URL}/api/Product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
