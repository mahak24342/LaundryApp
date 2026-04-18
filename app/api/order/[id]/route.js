import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export const dynamic = "force-dynamic";

/* ---------------- PATCH (Update Status) ---------------- */
export async function PATCH(req, context) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIXED (params is async in Next.js)

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

/* ---------------- DELETE (Delete Order) ---------------- */
export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIXED

    const deleted = await Order.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (err) {
    console.log("DELETE ERROR:", err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}