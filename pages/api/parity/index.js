import PayParity from "@/db/PayParity";
import dbConnect from "@/db/connect";

console.log("API route accessed");
export default async function handler(request, response) {
  await dbConnect();
  console.log("Handling request");

  if (request.method === "GET") {
    const payParity = await PayParity.find();
    console.log("Database results:", payParity);
    return response.status(200).json(payParity);
  }
  return response.status(405).json({ message: "Method not allowed" });
}
