import mongoose from "mongoose";
const { Schema } = mongoose;

const jobInfoSchema = new Schema({
  company: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String, required: true },
  description: { type: String, required: true },
  responsibilities: { type: [String], required: true },
  qualifications: { type: [String], required: true },
});
jobInfoSchema.index({
  company: "text",
  department: "text",
  position: "text",
  location: "text",
  jobType: "text",
});

const JobInfo =
  mongoose.models.JobInfo ||
  mongoose.model("JobInfo", jobInfoSchema, "JobInfo");

export default JobInfo;
