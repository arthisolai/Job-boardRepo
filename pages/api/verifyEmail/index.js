import dbConnect from "@/db/connect";
import Email from "@/db/Email";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const { token } = req.query;

    console.log("token", token);

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token is required." });
    }

    try {
      const emailEntry = await Email.findOne({ verificationToken: token });

      if (!emailEntry) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid token." });
      }

      if (emailEntry.isVerified) {
        return res
          .status(400)
          .json({ success: false, message: "Email is already verified." });
      }

      emailEntry.isVerified = true;
      emailEntry.verificationToken = undefined;
      await emailEntry.save();
      res.redirect("/verification-success");
    } catch (error) {
      console.error("Error verifying email:", error);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }
}
