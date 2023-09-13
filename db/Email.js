import mongoose from "mongoose";
const { Schema } = mongoose;

const emailSchema = new Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Email = mongoose.models.Email || mongoose.model("Email", emailSchema);

export default Email;
