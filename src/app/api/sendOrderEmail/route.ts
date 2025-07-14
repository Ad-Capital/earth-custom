import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface EmailRequestBody {
  recipients: string[];
  orderId: string;
  customerName: string;
  orderDetails: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as EmailRequestBody;
    const { recipients, orderId, customerName, orderDetails } = body;

    if (!recipients || recipients.length === 0) {
      return NextResponse.json(
        { success: false, message: "No recipients provided." },
        { status: 400 }
      );
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Change if using another provider
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipients.join(","), // Send to multiple recipients
      subject: `New Order Received - ID: ${orderId}`,
      text: `Hello Admin,\n\nA new order has been placed by ${customerName}.\n\nOrder Details:\n${orderDetails}\n\nPlease review it as soon as possible.\n\nThanks!`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email notification sent.",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Failed to send email: ${(error as Error).message}`,
      },
      { status: 500 }
    );
  }
}
