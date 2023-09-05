import mongoose from "mongoose";
const { Schema } = mongoose;

const companySchema = new Schema({
  companyName: { type: String, required: true },
  companyURL: { type: String, required: true },
  careersURL: { type: String, required: true },
  aboutCompany: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  companySize: { type: String, required: true },
  industry: { type: String, required: true },
  foundedIn: { type: Number },
});

companySchema.index({
  companyName: "text",
  country: "text",
  city: "text",
  industry: "text",
});

const companyDetails =
  mongoose.models.CompanyDetails ||
  mongoose.model("CompanyDetails", companySchema, "CompanyDetails");

export default companyDetails;
