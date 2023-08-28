import mongoose from "mongoose";
const { Schema } = mongoose;

const paritySchema = new Schema({
  2014: { type: Number },
  2015: { type: Number },
  2016: { type: Number },
  2017: { type: Number },
  2018: { type: Number },
  2019: { type: Number },
  2020: { type: Number },
  2021: { type: Number },
  CountryName: { type: String, required: true },
  CountryCode: { type: String, required: true },
});

const PayParity =
  mongoose.models.PayParity ||
  mongoose.model("PayParity", paritySchema, "PayParity");

export default PayParity;
