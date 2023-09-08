import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dbConnect from "@/db/connect";
import CompanyDetails from "@/db/CompanyDetails";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer to store uploaded files in memory
const storage = multer.memoryStorage();

// Create a multer middleware instance with the defined storage
const upload = multer({ storage }).single("logo");

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "company-logos",
//     format: async (req, file) => "png", // supports promises as well
//     public_id: (req, file) => file.originalname, // use the original name as the public ID
//   },
// });

const parser = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false, // Disabling body parser
  },
};

const uploadLogo = async (req, res) => {
  console.log("Full Request Object:", req);

  console.log("Request body:", req.body);
  try {
    await dbConnect();
    console.log("Method:::::::::", req.method);
    if (req.method === "POST") {
      const uploadPromise = new Promise((resolve, reject) => {
        const upload = parser.single("logo");
        upload(req, res, (error) => {
          if (error) {
            console.error("Error in parser middleware:", error);
            reject(error);
          } else {
            const file = req.file;
            resolve(file);
          }
        });
      });

      const uploadedFile = await uploadPromise;
      console.log("File uploaded:", uploadedFile);

      const imageUrl = uploadedFile.path;
      console.log("Cloudinary URL:", imageUrl);

      // // Validate and parse foundedIn as an integer
      // const foundedIn = parseInt(req.body.foundedIn, 10);

      // if (isNaN(foundedIn)) {
      //   // Handle validation error - foundedIn is not a valid number
      //   res.status(400).json({ error: "Invalid value for foundedIn" });
      //   return;
      // }

      const companyData = {
        companyName: req.body.companyName,
        companyURL: req.body.companyURL,
        careersURL: req.body.careersURL,
        aboutCompany: req.body.aboutCompany,
        country: req.body.country,
        city: req.body.city,
        companySize: req.body.companySize,
        industry: req.body.industry,
        foundedIn: req.body.industry,
        companyLogo: imageUrl,
        // ... Other fields
      };

      // const companyData = {
      //   ...req.body,
      //   companyLogo: imageUrl,
      // };

      // console.log("Before database insertion:", companyData);
      // const result = await CompanyDetails.create(companyData);

      // console.log("Database operation result:", result);
      console.log("After database insertion");
      // if (result && result.nModified === 0 && result.n === 0) {
      //   console.warn(
      //     "No documents matched the filter. Update operation was not performed."
      //   );
      // } else if (result && result.nModified === 0) {
      //   console.warn(
      //     "No documents were updated. The filter matched one or more documents but no changes were made."
      //   );
      // }

      res.status(200).json({ message: "Logo uploaded successfully", imageUrl });
    } else {
      console.log("Method not allowed");
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in uploadLogo:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

export default uploadLogo;
