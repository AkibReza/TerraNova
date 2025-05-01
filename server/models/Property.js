const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  price: Number,
  propertyType: String,
  propertySize: Number,
  numberOfBedrooms: Number,
  numberOfBathrooms: Number,
  amenities: [String],
  location: String,
  otherDetails: String,
  transactionType: String,
});

module.exports = mongoose.model("Property", propertySchema);
