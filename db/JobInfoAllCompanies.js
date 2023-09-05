import mongoose from "mongoose";
const { Schema } = mongoose;

const jobInfoSchema = new Schema({
  company: { type: String, required: true },
  link: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  description: {
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
  responsibilities: {
    title: { type: String, required: true },
    text: { type: [String], required: true },
  },
  qualifications: {
    niceToHave: {
      title: { type: String },
      text: { type: [String] },
    },
    perksAndBenefits: {
      title: { type: String },
      text: { type: [String] },
    },
  },
});

jobInfoSchema.index({
  company: "text",
  department: "text",
  position: "text",
  location: "text",
  jobType: "text",
});

const JobInfoAllCompanies =
  mongoose.models.JobInfoAllCompanies ||
  mongoose.model("JobInfoAllCompanies", jobInfoSchema, "JobInfoAllCompanies");

export default JobInfoAllCompanies;
