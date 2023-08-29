import PayParity from "@/db/PayParity";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  try {
    await dbConnect();

    if (request.method === "GET") {
      const payParity = await PayParity.find();

      if (payParity.length > 0) {
        return response.status(200).json(payParity);
      } else {
        return response.status(404).json({ message: "No records found" });
      }
    } else {
      return response.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
