import JobInfo from "@/db/JobInfo";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();
  if (req.method === "GET") {
    const jobs = await JobInfo.find();
    res.status(200).json(jobs);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
