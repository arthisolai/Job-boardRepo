import dbConnect from "@/db/connect";
import Country from "@/db/Country";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { id } = req.query;
      console.log("Received ID:", id);
      if (!id) {
        return;
      }
      const country = await Country.findById(id);

      if (!country) {
        return res.status(404).json({ error: "Country not found" });
      }

      return res.status(200).json(country);
    } catch (error) {
      console.error("Error fetching country details:", error);
      return res.status(500).json({ error: "Unable to fetch country details" });
    }
  }
}
