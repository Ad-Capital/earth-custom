"use client";

import { useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import Image from "next/image";

interface OrderPaymentData {
  orderId: string;
  fullName: string;
  email: string;
  artworkType: string;
  medium: string;
  size: string;
  colorPalette?: string;
  purpose: string;
  additionalNotes?: string;
  orderDate: string;
  quotedPrice: number;
  currency: string;
  paymentStatus: string;
}

interface Props {
  order: OrderPaymentData;
  token: string;
}

export default function PaymentClient({ order, token }: Props) {
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const firstName = order.fullName.split(" ")[0];
  const invoiceNumber = String(order.orderId).slice(-8).toUpperCase();
  const invoiceDate = new Date(order.orderDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
    tx_ref: `order-${order.orderId}-${Date.now()}`,
    amount: order.quotedPrice,
    currency: order.currency,
    payment_options: "card,banktransfer,ussd",
    customer: {
      email: order.email,
      name: order.fullName,
      phone_number: "",
    },
    customizations: {
      title: "Earth Inc",
      description: `Custom ${order.artworkType} — ${order.size}`,
      logo: `https://earthinc.io/images/earthLogoWhite.png`,
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  async function verifyPayment(transaction_id: number) {
    setStatus("verifying");
    try {
      const res = await fetch("/api/flutterwave/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transaction_id, paymentToken: token }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Verification failed");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Payment verification failed. Please contact support."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen" style={{ background: "#F9F6FF" }}>
        <div className="px-6 py-5 flex justify-center" style={{ background: "#1E0734" }}>
          <Image src="/images/earthLogoWhite.png" alt="Earth Inc" width={100} height={40} />
        </div>
        <div className="flex flex-col items-center justify-center px-4 py-20">
          <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(139.87deg, #EA6EE7 -2.71%, #AB54FD 60.23%, #7D2AE7 94.74%)",
              }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              You&apos;re all set, {firstName}!
            </h1>
            <p className="text-gray-500 leading-relaxed text-sm">
              Your payment has been received. Our artists are excited to bring your vision to life.
              We&apos;ll be in touch very soon.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400">Confirmation sent to</p>
              <p className="text-sm font-medium text-gray-700 mt-1">{order.email}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F9F6FF" }}>
      {/* Dark branded header */}
      <div className="px-6 pt-10 pb-16 text-center" style={{ background: "#1E0734" }}>
        <Image
          src="/images/earthLogoWhite.png"
          alt="Earth Inc"
          width={180}
          height={50}
          className="mx-auto mb-8"
        />
        <p className="text-xs tracking-widest uppercase mb-3 font-medium" style={{ color: "#AB54FD" }}>
          Custom artwork payment
        </p>
        <h1 className="text-white text-3xl font-bold mb-3">Hello, {firstName} 👋</h1>
        <p className="text-sm leading-relaxed mx-auto max-w-xs" style={{ color: "#DFCAF9" }}>
          Below is a recap of what we discussed, along with your invoice. Complete your payment and
          we&apos;ll get started.
        </p>
      </div>

      <div className="px-4 -mt-6 pb-16 space-y-4 max-w-lg mx-auto">

        {/* Section 1: Consultation Brief */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: "#DFCAF9", color: "#7D2AE7" }}
            >
              Consultation Brief
            </span>
          </div>

          {/* Purpose - displayed as a personal statement */}
          <blockquote
            className="text-sm leading-relaxed text-gray-600 italic border-l-4 pl-4 mb-5"
            style={{ borderColor: "#AB54FD" }}
          >
            &ldquo;{order.purpose}&rdquo;
          </blockquote>

          <div className="space-y-3 text-sm">
            <Row label="Artwork type" value={order.artworkType} />
            <Row label="Medium" value={order.medium} />
            <Row label="Size" value={order.size} />
            {order.colorPalette && (
              <Row label="Colour palette" value={order.colorPalette} />
            )}
          </div>

          {order.additionalNotes && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-1">Additional notes</p>
              <p className="text-sm text-gray-600 leading-relaxed">{order.additionalNotes}</p>
            </div>
          )}
        </div>

        {/* Section 2: Invoice */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          {/* Invoice header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Invoice</p>
              <p className="text-lg font-bold text-gray-900">#{invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 mb-1">Date issued</p>
              <p className="text-sm font-medium text-gray-700">{invoiceDate}</p>
            </div>
          </div>

          {/* Billed to */}
          <div className="mb-5 pb-5 border-b border-gray-100">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Billed to</p>
            <p className="text-sm font-semibold text-gray-800">{order.fullName}</p>
            <p className="text-sm text-gray-500">{order.email}</p>
          </div>

          {/* Line item */}
          <div className="mb-5 pb-5 border-b border-gray-100">
            <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest mb-3">
              <span>Description</span>
              <span>Amount</span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Custom {order.artworkType}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {order.medium} · {order.size}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-800">
                ${order.quotedPrice.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-semibold text-gray-700">Total due</span>
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ${order.quotedPrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400 ml-1">{order.currency}</span>
            </div>
          </div>

          {/* Error */}
          {status === "error" && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm text-center">
              {errorMsg}
            </div>
          )}

          {/* Pay button */}
          <button
            disabled={status === "verifying"}
            onClick={() =>
              handleFlutterPayment({
                callback: (response) => {
                  closePaymentModal();
                  if (response.status === "successful") {
                    verifyPayment(response.transaction_id);
                  } else {
                    setErrorMsg("Payment was not completed. Please try again.");
                    setStatus("error");
                  }
                },
                onClose: () => {},
              })
            }
            className="w-full py-4 rounded-2xl text-white font-semibold text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed transition-opacity hover:opacity-90"
            style={{
              background:
                "linear-gradient(139.87deg, #EA6EE7 -2.71%, #AB54FD 60.23%, #7D2AE7 94.74%)",
            }}
          >
            {status === "verifying"
              ? "Verifying payment…"
              : `Pay $${order.quotedPrice.toLocaleString()} ${order.currency}`}
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">🔒 Secured by Flutterwave</p>
        </div>

      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium text-gray-800 text-right max-w-[60%]">{value}</span>
    </div>
  );
}
