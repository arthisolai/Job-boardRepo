//

//---------------------------BASE 64--------------------------

import dbConnect from "@/db/connect";
import Company from "@/db/Company";

export default async function handler(req, res) {
  try {
    await dbConnect();

    if (req.method === "POST") {
      const companyData = req.body;
      const newCompany = await Company.create(companyData);

      if (newCompany) {
        res.status(201).json(newCompany);
      } else {
        res.status(500).json({ error: "Error adding company to the database" });
      }
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
}
