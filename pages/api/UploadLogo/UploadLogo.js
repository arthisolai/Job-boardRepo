import cloudinary from "cloudinary";
import axios from "axios";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryUpload = async (imageBuffer) => {
  try {
    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`,
      imageBuffer,
      {
        headers: {
          "Content-Type": "image/*", // Change this to the appropriate image format if needed
        },
        params: {
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        },
      }
    );
    console.log("Cloudinary Response:", cloudinaryResponse);

    if (cloudinaryResponse.data && cloudinaryResponse.data.secure_url) {
      console.log(
        "Cloudinary upload successful:",
        cloudinaryResponse.data.secure_url
      );

      return cloudinaryResponse.data.secure_url;
    } else {
      console.error("Cloudinary upload failed:", cloudinaryResponse.data);
      return null;
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};
