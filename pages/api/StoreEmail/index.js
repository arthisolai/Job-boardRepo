import dbConnect from "@/db/connect";
import Email from "@/db/Email";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const existingEmail = await Email.findOne({ email: req.body.email });

      if (existingEmail) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }

      const newEmail = new Email({ email: req.body.email });
      await newEmail.save();

      res.status(201).json({ success: true, data: newEmail });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
