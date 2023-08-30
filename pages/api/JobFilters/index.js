import dbConnect from "@/db/connect";
import JobInfo from "@/db/JobInfo";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const uniqueCountries = await JobInfo.distinct("location");
      const uniqueDepartments = await JobInfo.distinct("department");
      const uniqueTitles = await JobInfo.distinct("position");

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
