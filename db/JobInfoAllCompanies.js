import mongoose from "mongoose";
const { Schema } = mongoose;

const jobInfoSchema = new Schema({
  Company: { type: String, required: true },
  Link: { type: String, required: true },
  Position: { type: String, required: true },
  Department: { type: String, required: true },
  Location: { type: String, required: true },
  Description: {
    Title: { type: String, required: true },
    Text: { type: String, required: true },
  },
  Responsibilities: {
    Title: { type: String, required: true },
    Text: { type: [String], required: true },
  },
  Qualifications: {
    Title: { type: String, required: true },
    Text: { type: [String], required: true },
  },
  NiceToHave: {
    Title: { type: String },
    Text: { type: [String] },
  },
  PerksAndBenefits: {
    Title: { type: String },
    Text: { type: [String] },
  },
});

jobInfoSchema.index({
  Company: "text",
  Department: "text",
  Position: "text",
  Location: "text",
  JobType: "text",
});

const JobInfoAllCompanies =
  mongoose.models.JobInfoAllCompanies ||
  mongoose.model("JobInfoAllCompanies", jobInfoSchema, "JobInfoAllCompanies");

export default JobInfoAllCompanies;
