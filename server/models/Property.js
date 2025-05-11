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
  latitude: Number,
  longitude: Number,
});

// Add an index for geospatial queries
propertySchema.index({ latitude: 1, longitude: 1 });

module.exports = mongoose.model("Property", propertySchema);
