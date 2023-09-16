import dbConnect from "@/db/connect";
import Country from "@/db/Country";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const countries = await Country.find();
      res.status(200).json(countries);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch countries" });
    }
  }
}
