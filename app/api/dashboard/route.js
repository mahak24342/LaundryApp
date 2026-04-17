import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {
  console.log("👉 Dashboard API hit");

  try {
    await connectDB();

    // ✅ Total Orders
    const totalOrders = await Order.countDocuments();

    // ✅ Total Revenue
    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
        },
      },
    ]);

    // ✅ Orders per Status
    const statusData = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    return Response.json({
      totalOrders,
      totalRevenue: revenueData[0]?.totalRevenue || 0,
      statusData,
    });

  } catch (error) {
    console.error("❌ Dashboard Error:", error);

    return Response.json(
      { error: "Failed to load dashboard" },
      { status: 500 }
    );
  }
}