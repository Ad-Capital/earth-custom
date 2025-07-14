import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Order document
export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phone?: string;
  preferredCommunication: "email" | "phone";
  artworkType: string;
  medium: string;
  size: string;
  colorPalette?: string;
  imageUrls: string[];
  purpose: string;
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  additionalNotes?: string;
  newsletter: boolean;
  orderDate: Date;
  status: "new" | "in_progress" | "completed" | "cancelled";
}

// Create the schema
const OrderSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    preferredCommunication: {
      type: String,
      enum: ["email", "phone"],
      default: "email",
    },
    artworkType: { type: String, required: true },
    medium: { type: String, required: true },
    size: { type: String, required: true },
    colorPalette: { type: String },
    imageUrls: [{ type: String }],
    purpose: { type: String, required: true },
    shippingAddress: {
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    additionalNotes: { type: String },
    newsletter: { type: Boolean, default: false },
    orderDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["new", "in_progress", "completed", "cancelled"],
      default: "new", // Automatically set to "new" when order is created
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields automatically
  }
);

// Use existing model or create new one
const Order =
  (mongoose.models.Order as mongoose.Model<IOrder>) ||
  mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
