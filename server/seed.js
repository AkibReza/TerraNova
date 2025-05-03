const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const uri = `mongodb+srv://${username}:${password}@terranova.fomh40k.mongodb.net/terranova?retryWrites=true&w=majority&appName=TerraNova`;

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

const Property = mongoose.model("Property", propertySchema);

const propertyData = [
  {
    price: 20000,
    propertyType: "Apartment",
    propertySize: 1650,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Swimming Pool", "Gymnasium", "Security", "Parking"],
    location: "Mohakhali",
    otherDetails:
      "Luxury apartment with panoramic city views and high-end finishes.",
    transactionType: "Rent",
  },
  {
    price: 65000,
    propertyType: "Apartment",
    propertySize: 500,
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    amenities: ["Balcony", "Parking", "Elevator", "Security"],
    location: "Banani",
    otherDetails: "Modern apartment in a prime location.",
    transactionType: "Rent",
  },
  {
    price: 30000,
    propertyType: "Apartment",
    propertySize: 1100,
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Elevator", "Security"],
    location: "Uttara",
    otherDetails: "Cozy apartment, ideal for small families or couples.",
    transactionType: "Rent",
  },
];

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");
    await Property.deleteMany();
    const inserted = await Property.insertMany(propertyData);
    console.log(`Inserted ${inserted.length} documents`);
    mongoose.disconnect();
  })
  .catch((err) => console.error("MongoDB error:", err));
