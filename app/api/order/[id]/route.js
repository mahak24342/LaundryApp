import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export const dynamic = "force-dynamic";

export async function PATCH(req, context) {
  try {
    await connectDB();

    // ✅ FIX HERE
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    if (!body.status) {
      return NextResponse.json(
        { error: "Status required" },
        { status: 400 }
      );
    }

    const updated = await Order.findByIdAndUpdate(
      id,
      { status: body.status.toUpperCase() },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);

  } catch (err) {
    console.log("PATCH ERROR:", err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}