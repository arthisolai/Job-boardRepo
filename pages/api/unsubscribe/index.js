import dbConnect from "@/db/connect";
import Email from "@/db/Email";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const token = req.query.token;
      const user = await Email.findOne({ verificationToken: token });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid token." });
      }

      user.isSubscribed = false;
      await user.save();

      res.redirect("/success-unsubscribe");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
