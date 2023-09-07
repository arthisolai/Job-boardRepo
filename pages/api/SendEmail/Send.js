import EmailTemplate from "@/Components/EmailTemplate/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request, response) {
  try {
    const body = request.body;
    console.log("body", body);
    const { email, name } = body;
    const data = await resend.emails.send({
      from: "GetGlobalSupport <support@getglobal.pro>",
      to: [email],
      subject: "Hello world",
      react: EmailTemplate({ firstName: name }),
    });

    console.log("Email Response:", data);

    response.status(200).json(data);
  } catch (error) {
    console.error("Error sending email:", error);
    response.status(400).json({ error: error.message });
  }
}
