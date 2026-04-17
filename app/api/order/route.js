import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();
console.log("conected")
    return Response.json({
      message: "Hello API + DB Connected ✅",
      status: mongoose.connection.readyState
    });
  } catch (error) {
    return Response.json({
      message: "DB Connection Failed ❌",
      error: error.message
    });
  }
}