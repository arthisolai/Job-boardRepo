import { cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "company-logos",
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => file.originalname, // use the original name as the public ID
  },
});

const parser = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false, // Disabling body parser
  },
};

export default async (req, res) => {
  if (req.method === "POST") {
    const upload = parser.single("logo");
    upload(req, res, async (error) => {
      if (error) {
        return res.status(500).json({ error: "Upload failed" });
      }
      // Handle the rest of the upload logic here
      const imageUrl = req.file.path;
      // Store this URL in your MongoDB collection
      // ... your MongoDB logic here ...

      res.status(200).json({ message: "Logo uploaded successfully", imageUrl });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
