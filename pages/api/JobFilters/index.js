import dbConnect from "@/db/connect";
import JobInfoAllCompanies from "@/db/JobInfoAllCompanies";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const uniqueCountries = await JobInfoAllCompanies.distinct("Location");
      const uniqueDepartments = await JobInfoAllCompanies.distinct(
        "Department"
      );
      const uniqueTitles = await JobInfoAllCompanies.distinct("Position");

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
