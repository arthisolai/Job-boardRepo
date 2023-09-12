import dbConnect from "@/db/connect";
import Job from "@/db/Job";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const uniqueCountries = await Job.distinct("Location");
      const uniqueDepartments = await Job.distinct("Department");
      const uniqueTitles = await Job.distinct("Position");

      response.status(200).json({
        countries: uniqueCountries,
        departments: uniqueDepartments,
        titles: uniqueTitles,
      });
    } catch (error) {
      console.error("Error fetching unique job filters:", error);
      response.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}
