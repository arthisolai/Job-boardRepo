import multer from "multer";
import dbConnect from "@/db/connect";
import CompanyDetails from "@/db/CompanyDetails";

// Cloudinary upload function
const cloudinaryUpload = async (imageBuffer) => {
  const base64EncodedImage = `data:image/png;base64,${imageBuffer.toString(
    "base64"
  )}`;
  try {
    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`,
      {
        file: base64EncodedImage,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      }
    );
    return cloudinaryResponse.data.url; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};
// Cloudinary configuration & cloudinaryUpload function here...

const storage = multer.memoryStorage();
// const upload = multer({ storage: storage }).single("logo"); // Only expecting one file named 'logo'

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
}).single("logo");

export default async function handler(req, res) {
  console.log("File data:", req.file);
  console.log("Other form data:", req.body);

  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.error("Multer Error:", err);
      return res.status(500).json({ error: `Multer error: ${err.message}` });
    } else if (err) {
      // An unknown error occurred when uploading.
      console.error("Unknown Error:", err);
      return res.status(500).json({ error: `Unknown error: ${err.message}` });
    }

    try {
      await dbConnect();

      if (req.method === "POST") {
        console.log(
          "Reached /api/AddCompany/addCompany - POST request received"
        );

        // Log buffer details here:
        console.log("Image Buffer Length:", req.file.buffer.length);
        console.log(
          "Image Buffer Content:",
          req.file.buffer.toString("base64").substring(0, 100)
        );

        // Handle file upload to Cloudinary here if there's a file
        if (req.file) {
          console.log("Received file:", req.file.originalname);
          logoURL = await cloudinaryUpload(req.file.buffer);
        } else {
          console.log("No file received");
          return res.status(400).json({ error: "No file provided" });
        }

        const companyData = {
          ...req.body,
          companyLogo: logoURL,
        };

        const newCompany = await CompanyDetails.create(companyData);
        if (newCompany) {
          res.status(201).json(newCompany);
        } else {
          res
            .status(500)
            .json({ error: "Error adding company to the database" });
        }
      } else {
        res.status(405).json({ error: "Method not allowed" });
      }
    } catch (error) {
      res.status(500).json({ error: "Server Error", details: error.message });
    }
  });
}
