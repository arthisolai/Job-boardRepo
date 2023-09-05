import JobInfoAllCompanies from "@/db/JobInfoAllCompanies";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const job = await JobInfoAllCompanies.findById(id);
    return response.status(200).json(job);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
