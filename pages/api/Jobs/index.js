import Job from "@/db/Job";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();
  // console.log("Database connected");

  if (request.method === "GET") {
    try {
      const { Location, Department, Position, query } = request.query;

      // console.log("Country:", country);

      console.log("Received Query Parameters:", request.query);

      // console.log("Received Query Parameter:", query);

      const filter = {};
      if (Location) filter["Location"] = Location;
      console.log("MongoDB filter:", filter);
      if (Department) filter["Department"] = Department;
      if (Position) filter["Position"] = Position;
      if (query) {
        filter["$or"] = [
          { Company: new RegExp(query, "i") },
          { Location: new RegExp(query, "i") },
          { Department: new RegExp(query, "i") },
          { Position: new RegExp(query, "i") },
        ];
      }
      console.log("MongoDB filter:", filter);

      // const testResults = await Job.find({
      //   Location: "Hamburg",
      // });
      // console.log("Test Results:", testResults);


      // const jobs = await Job.find(filter).populate("CompanyInfo");
      const jobs = await Job.find(filter)
        .populate({
          CompanyInfo: {
            companyLogo: 1,
          },
        })
        .limit(10);

      console.log("Jobs fetched:::::::::::::::::", jobs);

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

export const config = {
  api: {
    responseLimit: false,
  },
};
