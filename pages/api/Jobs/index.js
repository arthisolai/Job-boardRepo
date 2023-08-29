import JobInfo from "@/db/JobInfo";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const jobs = await JobInfo.find();
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
