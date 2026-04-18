import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  console.log("👉 Create Order API hit");

  try {
    await connectDB();
    const body = await req.json();

    const total = body.garments.reduce(
      (sum, g) => sum + g.quantity * g.price,
      0
    );

    const order = await Order.create({
      ...body,
      total,
    });
console.log("created order")
    return Response.json(order);
  } catch (error) {
    console.error("❌ Create Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
export async function GET(req) {
  console.log("👉 Get Orders API hit");

  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const phone = searchParams.get("phone");
    const name = searchParams.get("name");

    let query = {};

    // ✅ status filter
    if (status) {
      query.status = status;
    }

    // ✅ FIX: search by name OR phone (partial match)
    if (name || phone) {
      query.$or = [
        {
          customerName: {
            $regex: name || phone || "",
            $options: "i",
          },
        },
        {
          phone: {
            $regex: phone || name || "",
            $options: "i",
          },
        },
      ];
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    return Response.json(orders);
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}