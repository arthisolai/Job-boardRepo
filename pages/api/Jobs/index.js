import JobInfo from "@/db/JobInfo";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();
  console.log("Database connected");

  if (request.method === "GET") {
    try {
      const { country, department, title } = request.query;

      const filter = {};
      if (country) filter["location"] = country;
      if (department) filter["department"] = department;
      if (title) filter["position"] = title;

      const jobs = await JobInfo.find(filter);
      console.log("Jobs fetched:", jobs);

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
