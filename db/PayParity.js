import mongoose from "mongoose";
const { Schema } = mongoose;

const paritySchema = new Schema({
  CountryName: { type: String, required: true },
  CountryCode: { type: String, required: true },
  2014: { type: Number, required: true },
  2015: { type: Number, required: true },
  2016: { type: Number, required: true },
  2017: { type: Number, required: true },
  2018: { type: Number, required: true },
  2019: { type: Number, required: true },
  2020: { type: Number, required: true },
  2021: { type: Number, required: true },
});

const PayParity =
  mongoose.models.PayParity || mongoose.model("PayParity", paritySchema);

export default PayParity;
