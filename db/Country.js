import mongoose from "mongoose";
const { Schema } = mongoose;

const countrySchema = new mongoose.Schema({
  country: { type: String, required: true },
  context: { general: { type: String, required: true } },
  jobSeekingInfo: {
    overview: { type: String, required: true },
    population: { type: String, required: true },
    capital: { type: String, required: true },
    topCities: { type: [String], required: true },
    expatPopulation: { type: String, required: true },
    languageSpoken: { type: String, required: true },
    accessibility: { housingAndJobs: { type: String, required: true } },
    visaConditions: { type: String, required: true },
  },
  image: { type: String, required: true },
});

const Country =
  mongoose.models.Country || mongoose.model("Country", countrySchema);

export default Country;
