import mongoose from "mongoose";
const { Schema } = mongoose;

import Company from "./Company";

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
  CompanyInfo: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
});

jobInfoSchema.index({
  Company: "text",
  Department: "text",
  Position: "text",
  Location: "text",
  JobType: "text",
});

const Job = mongoose.models.Job || mongoose.model("Job", jobInfoSchema);

export default Job;
