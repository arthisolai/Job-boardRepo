import dbConnect from "@/db/connect";
import CompanyDetails from "@/db/CompanyDetails";

export default async function handler(req, res) {
  try {
    await dbConnect();

    if (req.method === "POST") {
      console.log("Reached /api/AddCompany/addCompany - POST request received");

      const newCompany = await CompanyDetails.create(req.body);

      if (newCompany) {
        console.log("Company added:", newCompany);
        res.status(201).json(newCompany);
      } else {
        console.log("Error adding company to the database");
        res.status(500).json({ error: "Error adding company to the database" });
      }
    } else {
      console.log("Method not allowed");
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in /api/AddCompany/addCompany:", error);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
}
