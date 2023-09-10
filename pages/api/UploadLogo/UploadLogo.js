// import cloudinary from "cloudinary";
// import axios from "axios";
// import dbConnect from "@/db/connect";
// import CompanyDetails from "@/db/CompanyDetails";

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const config = {
//   api: {
//     bodyParser: false, // Disabling body parser
//   },
// };

// const uploadLogo = async (req, res) => {
//   try {
//     await dbConnect();
//     console.log("Image Buffer Length:", req.file.buffer.length);
//     console.log("Image Buffer Content:", req.file.buffer.toString("base64"));

//     if (req.method === "POST") {
//       try {
//         const imageUrl = await cloudinaryUpload(req.file.buffer);
//         if (imageUrl) {
//           const companyData = {
//             companyName: req.body.companyName,
//             companyURL: req.body.companyURL,
//             careersURL: req.body.careersURL,
//             aboutCompany: req.body.aboutCompany,
//             country: req.body.country,
//             city: req.body.city,
//             companySize: req.body.companySize,
//             industry: req.body.industry,
//             foundedIn: req.body.foundedIn,
//             companyLogo: imageUrl,
//             // ... Other fields
//           };
//           console.log("Image Processing Completed");
//           console.log("Company Data:", companyData);

//           const result = await CompanyDetails.create(companyData);
//           console.log("Database operation result:", result);

//           res
//             .status(201)
//             .json({ message: "Logo uploaded successfully", imageUrl });
//         } else {
//           console.error("Image upload to Cloudinary failed");
//           res.status(500).json({ error: "Image upload to Cloudinary failed" });
//         }
//       } catch (error) {
//         console.error("Error in cloudinaryUpload:", error);
//         res.status(500).json({ error: "Image upload to Cloudinary failed" });
//       }
//     } else {
//       console.log("Method not allowed");
//       res.status(405).json({ error: "Method not allowed" });
//     }
//   } catch (error) {
//     console.error("Error in uploadLogo:", error);
//     res.status(500).json({ error: "Server error", details: error.message });
//   }
// };

// export default uploadLogo;

// const cloudinaryUpload = async (imageBuffer) => {
//   try {
//     const cloudinaryResponse = await axios.post(
//       `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`,
//       imageBuffer,
//       {
//         headers: {
//           "Content-Type": "image/*", // Change this to the appropriate image format if needed
//         },
//         params: {
//           upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
//         },
//       }
//     );
//     console.log("Cloudinary Response:", cloudinaryResponse);

//     if (cloudinaryResponse.data && cloudinaryResponse.data.secure_url) {
//       console.log(
//         "Cloudinary upload successful:",
//         cloudinaryResponse.data.secure_url
//       );

//       return cloudinaryResponse.data.secure_url;
//     } else {
//       console.error("Cloudinary upload failed:", cloudinaryResponse.data);
//       return null;
//     }
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     return null;
//   }
// };
