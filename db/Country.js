import mongoose from "mongoose";
const { Schema } = mongoose;

const countrySchema = new Schema({
  country: { type: String, required: true, unique: true },
  context: {
    general: { type: String },
  },
  jobSeekingInfo: {
    overview: { type: String },
    population: { type: String },
    capital: { type: String },
    topCities: [{ type: String }],
    expatPopulation: { type: String },
    languageSpoken: { type: String },
    accessibility: {
      housingAndJobs: { type: String },
    },
    visaConditions: { type: String },
  },
});

const Country =
  mongoose.models.Country || mongoose.model("Country", countrySchema);

export default Country;
