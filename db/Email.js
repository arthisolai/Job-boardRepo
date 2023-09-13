import mongoose from "mongoose";
const { Schema } = mongoose;

const emailSchema = new Schema({
  email: { type: String, required: true, unique: true },
  verificationToken: { type: String },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Email = mongoose.models.Email || mongoose.model("Email", emailSchema);

export default Email;
