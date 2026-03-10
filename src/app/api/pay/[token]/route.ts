export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function GET(_req: NextRequest, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;

  try {
    await dbConnect();

    const order = await Order.findOne({ paymentToken: token }).select(
      "fullName email artworkType medium size colorPalette purpose additionalNotes orderDate quotedPrice currency paymentStatus _id"
    );

    if (!order) {
      return NextResponse.json({ error: "Payment link not found" }, { status: 404 });
    }

    if (order.paymentStatus === "paid") {
      return NextResponse.json({ error: "This order has already been paid" }, { status: 400 });
    }

    return NextResponse.json({
      orderId: order._id,
      fullName: order.fullName,
      email: order.email,
      artworkType: order.artworkType,
      medium: order.medium,
      size: order.size,
      colorPalette: order.colorPalette,
      purpose: order.purpose,
      additionalNotes: order.additionalNotes,
      orderDate: order.orderDate,
      quotedPrice: order.quotedPrice,
      currency: order.currency,
      paymentStatus: order.paymentStatus,
    });
  } catch (error) {
    console.error("Error fetching payment details:", error);
    return NextResponse.json({ error: "Failed to fetch payment details" }, { status: 500 });
  }
}
