import dbConnect from "@/db/connect";
import Email from "@/db/Email";
import { generateVerificationToken } from "@/utils/tokenUtils";
import EmailTemplate from "@/Components/EmailTemplate/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const token = generateVerificationToken();
      const existingEmail = await Email.findOne({ email: req.body.email });

      if (existingEmail) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }

      const newEmail = new Email({
        email: req.body.email,
        verificationToken: token,
        isSubscribed: true,
      });
      await newEmail.save();

      // Generate the verification link
      const verificationLink = `http://localhost:3000/api/verifyEmail?token=${token}`;

      // Generate the unsubscribe link
      const unsubscribeLink = `http://localhost:3000/api/unsubscribe?token=${token}`;

      const emailContent = EmailTemplate({
        firstName: req.body.name,
        verificationLink: verificationLink,
        unsubscribeLink: unsubscribeLink,
      });

      const emailResponse = await resend.emails.send({
        from: "GetGlobalSupport <support@getglobal.pro>",
        to: [req.body.email],
        subject: "Verify Your Email",
        react: emailContent,
      });

      console.log("Email Response:", emailResponse);

      res.status(201).json({ success: true, data: newEmail });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
