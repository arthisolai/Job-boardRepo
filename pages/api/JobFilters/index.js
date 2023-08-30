import dbConnect from "@/db/connect";
import JobInfo from "@/db/JobInfo";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const uniqueCountries = await JobInfo.distinct("location");
      const uniqueCompanies = await JobInfo.distinct("company");
      const uniqueTitles = await JobInfo.distinct("position");

      res.status(200).json({
        countries: uniqueCountries,
        companies: uniqueCompanies,
        titles: uniqueTitles,
      });
    } catch (error) {
      console.error("Error fetching unique job filters:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
