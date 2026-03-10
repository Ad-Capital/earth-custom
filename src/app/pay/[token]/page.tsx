import { notFound } from "next/navigation";
import PaymentClient from "./PaymentClient";

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

async function getPaymentDetails(token: string): Promise<OrderPaymentData | null | "paid"> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/pay/${token}`, { cache: "no-store" });

    if (res.status === 400) {
      return "paid";
    }

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch {
    return null;
  }
}

export default async function PayPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const data = await getPaymentDetails(token);

  if (data === null) {
    notFound();
  }

  if (data === "paid") {
    return (
      <div className="min-h-screen bg-[#F5F0EA] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✓</div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Already Paid</h1>
          <p className="text-gray-500">This order has already been paid. Thank you!</p>
        </div>
      </div>
    );
  }

  return <PaymentClient order={data} token={token} />;
}
