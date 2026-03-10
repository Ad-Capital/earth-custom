import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

interface ShippingAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface OrderRequestBody {
  fullName: string;
  email: string;
  phone?: string;
  preferredCommunication: "email" | "phone";
  artworkType: string;
  medium: string;
  size: string;
  colorPalette: string;
  imageUrls: string[];
  purpose: string;
  shippingAddress: ShippingAddress;
  additionalNotes?: string;
  newsletter: boolean;
  orderDate: Date;
}

export async function POST(request: NextRequest) {
  try {
    // Add basic request validation
    if (!request.body) {
      return NextResponse.json(
        { success: false, message: "Request body is required" },
        { status: 400 }
      );
    }

    const body = (await request.json()) as OrderRequestBody;
    console.log("Order request received:", body);

    if (!body.fullName || !body.email) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for required environment variables
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI environment variable is not set");
      return NextResponse.json(
        { success: false, message: "Database configuration error" },
        { status: 500 }
      );
    }

    console.log("Connecting to MongoDB...");
    await dbConnect();
    console.log("Connected to MongoDB successfully");

    console.log("Creating new order document...");
    const newOrder = new Order(body);
    const savedOrder = await newOrder.save();
    console.log("Order saved successfully with ID:", savedOrder._id);

    // Send email notification (don't block the response)
    sendOrderNotification(savedOrder).catch(error => 
      console.error("Email notification failed:", error)
    );

    return NextResponse.json({
      success: true,
      message: "Order submitted successfully",
      orderId: savedOrder._id,
    });
  } catch (error) {
    console.error("Error in orders API:", error);
    
    // Provide more specific error messages
    let errorMessage = "Internal server error";
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Check for specific MongoDB connection errors
      if (error.message.includes("MongoServerError") || 
          error.message.includes("connection") ||
          error.message.includes("ENOTFOUND") ||
          error.message.includes("authentication")) {
        errorMessage = "Database connection failed";
      }
    }
    
    return NextResponse.json(
      {
        success: false,
        message: `Failed to process order: ${errorMessage}`,
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    );
  }
}

//Function to send email notification
async function sendOrderNotification(order: any) {
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || []; // Get multiple emails from .env
  if (adminEmails.length === 0) {
    console.warn("No admin emails configured.");
    return;
  }

  if (!process.env.NEXTAUTH_URL) {
    console.warn("NEXTAUTH_URL not configured, skipping email notification.");
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/sendOrderEmail`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients: adminEmails,
          orderId: order._id,
          customerName: order.fullName,
          orderDetails: JSON.stringify(order, null, 2),
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send email notification: ${response.status} ${errorText}`);
    }

    console.log("Email notification sent successfully.");
  } catch (error) {
    console.error("Error sending email notification:", error);
    // Don't rethrow - we don't want email failures to break order submission
  }
}
