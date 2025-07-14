import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { UploadApiResponse } from "cloudinary/types";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { images } = data as { images: string[] };

    if (!images || !Array.isArray(images)) {
      return NextResponse.json(
        { success: false, message: "No images provided" },
        { status: 400 }
      );
    }

    console.log(`Attempting to upload ${images.length} images to Cloudinary`);

    const uploadPromises = images.map(async (base64Image: string) => {
      // Upload to Cloudinary
      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload(
          base64Image,
          { resource_type: "image" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              resolve(result!);
            }
          }
        );
      });

      return result.secure_url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    console.log("Successfully uploaded images:", imageUrls);

    return NextResponse.json({ success: true, imageUrls });
  } catch (error) {
    console.error("Error uploading images:", error);
    const err = error as Error;
    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload images",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
