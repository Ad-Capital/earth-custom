export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function POST(req: NextRequest) {
  try {
    const { transaction_id, paymentToken } = await req.json();

    if (!transaction_id || !paymentToken) {
      return NextResponse.json(
        { error: "transaction_id and paymentToken are required" },
        { status: 400 }
      );
    }

    // Verify with Flutterwave
    const fwRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!fwRes.ok) {
      return NextResponse.json(
        { error: "Failed to verify transaction with Flutterwave" },
        { status: 502 }
      );
    }

    const fwData = await fwRes.json();
    const tx = fwData.data;

    if (!tx || tx.status !== "successful") {
      return NextResponse.json(
        { error: "Transaction not successful" },
        { status: 400 }
      );
    }

    await dbConnect();

    const order = await Order.findOne({ paymentToken });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Verify the tx_ref belongs to this specific order | prevents cross-order replay attacks
    // tx_ref format: "order-{orderId}-{timestamp}"
    if (!tx.tx_ref?.startsWith(`order-${order._id}`)) {
      console.error("tx_ref mismatch", { txRef: tx.tx_ref, orderId: order._id });
      return NextResponse.json(
        { error: "Transaction reference mismatch" },
        { status: 400 }
      );
    }

    // Validate the amount and currency match
    if (
      tx.currency !== order.currency ||
      Math.round(tx.amount) !== Math.round(order.quotedPrice ?? 0)
    ) {
      console.error("Payment mismatch", {
        expected: { currency: order.currency, amount: order.quotedPrice },
        received: { currency: tx.currency, amount: tx.amount },
      });
      return NextResponse.json(
        { error: "Payment amount or currency mismatch" },
        { status: 400 }
      );
    }

    // Idempotency: already marked paid
    if (order.paymentStatus === "paid") {
      return NextResponse.json({ success: true });
    }

    await Order.findByIdAndUpdate(order._id, {
      $set: {
        paymentStatus: "paid",
        flutterwaveTransactionId: String(transaction_id),
        paidAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
