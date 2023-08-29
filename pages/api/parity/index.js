import PayParity from "@/db/PayParity";
import dbConnect from "@/db/connect";

// console.log("API route accessed");

export default async function handler(request, response) {
  try {
    await dbConnect();
    // console.log("Database connection established.");

    if (request.method === "GET") {
      //   console.log("Executing database query for GET request...");
      const payParity = await PayParity.find();
      //   console.log(
      //     "Query completed. Retrieved records count:",
      //     payParity.length
      //   );

      if (payParity.length > 0) {
        // console.log("Sending data to client...");
        return response.status(200).json(payParity);
      } else {
        // console.warn("No records found in the database.");
        return response.status(404).json({ message: "No records found" });
      }
    } else {
      //   console.warn("Method not allowed:", request.method);
      return response.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    // console.error("Error occurred:", error.message);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
