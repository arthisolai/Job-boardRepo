import dbConnect from "@/db/connect";
import Email from "@/db/Email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  try {
    await dbConnect();
    const verifiedEmails = await Email.find({ isVerified: true });

    for (let emailDoc of verifiedEmails) {
      const email = emailDoc.email;
      console.log("email", email);
      var data = await resend.emails.send({
        from: "GetGlobalSupport <support@getglobal.pro>",
        to: [email],
        subject: "Your Weekly Newsletter",
        text: "Hello! Here's your weekly newsletter. Enjoy reading!",
      });
    }

    res.status(200).json(data);
    // res.status(200).end("Emails sent successfully");
  } catch (error) {
    console.error("Error sending scheduled emails:", error);
    res.status(500).end("Internal Server Error");
  }
}
