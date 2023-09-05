import JobInfoAllCompanies from "@/db/JobInfoAllCompanies";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();
  console.log("Database connected");

  if (request.method === "GET") {
    try {
      const { country, department, title, query } = request.query;

      console.log("Received Query Parameters:", request.query);

      console.log("Received Query Parameter:", query);

      const filter = {};
      if (country) filter["Location"] = country;
      if (department) filter["Department"] = department;
      if (title) filter["Position"] = title;
      if (query) filter["Company"] = new RegExp(query, "i");
      console.log("MongoDB filter:", filter);

      const jobs = await JobInfoAllCompanies.find(filter);
      // console.log("Jobs fetched:", jobs);

      if (!jobs || jobs.length === 0) {
        return response.status(404).json({ message: "No jobs found" });
      }
      response.status(200).json(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      response.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}
