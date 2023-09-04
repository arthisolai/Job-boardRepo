import dbConnect from "@/db/connect";
import CompanyDetails from "@/db/CompanyDetails";

export default async function handler(request, response) {
  try {
    await dbConnect();

    if (request.method === "GET") {
      const companies = await CompanyDetails.find();
      console.log("Companies:", companies);

      return response.status(200).json(companies);
    } else {
      return response.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
