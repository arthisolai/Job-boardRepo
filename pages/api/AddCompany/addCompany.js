import dbConnect from "@/db/connect";
import CompanyDetails from "@/db/CompanyDetails";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const newCompany = await CompanyDetails.create(req.body);
      res.status(201).json(newCompany);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
