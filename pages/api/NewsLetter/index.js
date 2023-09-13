import dbConnect from "@/db/connect";
import Email from "@/db/Email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all verified emails
    const verifiedEmails = await Email.find({ isVerified: true });

    // Loop through each email and send the newsletter or desired content
    for (let emailDoc of verifiedEmails) {
      const email = emailDoc.email;

      // Your email sending logic here
      await resend.emails.send({
        from: "GetGlobalSupport <support@getglobal.pro>",
        to: [email],
        subject: "Your Weekly Newsletter",
      });
    }

    res.status(200).end("Emails sent successfully");
  } catch (error) {
    console.error("Error sending scheduled emails:", error);
    res.status(500).end("Internal Server Error");
  }
}
