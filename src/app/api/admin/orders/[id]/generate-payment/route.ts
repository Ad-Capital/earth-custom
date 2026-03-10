export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { randomUUID } from "crypto";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const { amount } = await req.json();

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "A valid amount (USD) is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Re-use existing token or generate a fresh one
    const token = order.paymentToken ?? randomUUID();

    await Order.findByIdAndUpdate(id, {
      $set: {
        quotedPrice: amount,
        currency: "USD",
        paymentToken: token,
        paymentStatus: "unpaid",
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const paymentUrl = `${baseUrl}/pay/${token}`;

    return NextResponse.json({ paymentUrl }, { status: 200 });
  } catch (error) {
    console.error("Error generating payment link:", error);
    return NextResponse.json(
      { error: "Failed to generate payment link" },
      { status: 500 }
    );
  }
}
