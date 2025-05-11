const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
const path = require("path");
dotenv.config();

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const uri = `mongodb+srv://${username}:${password}@terranova.fomh40k.mongodb.net/terranova?retryWrites=true&w=majority&appName=TerraNova`;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dqkukzvbf",
  api_key: "684558322453942",
  api_secret: "X4GbN_iSngWR-HX_MDtVErzoyGQ",
});

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
  imageUrl: String,
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
    latitude: 23.7778,
    longitude: 90.4057,
    otherDetails:
      "Luxury apartment with panoramic city views and high-end finishes.",
    transactionType: "Rent",
    imagePath: "property_1.jpg",
  },
  {
    price: 65000,
    propertyType: "Apartment",
    propertySize: 500,
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    amenities: ["Balcony", "Parking", "Elevator", "Security"],
    location: "Banani",
    latitude: 23.7937,
    longitude: 90.4066,
    otherDetails: "Modern apartment in a prime location.",
    transactionType: "Rent",
    imagePath: "property_2.jpg",
  },
  {
    price: 30000,
    propertyType: "Apartment",
    propertySize: 1100,
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Elevator", "Security"],
    location: "Uttara",
    latitude: 23.8759,
    longitude: 90.3795,
    otherDetails: "Cozy apartment, ideal for small families or couples.",
    transactionType: "Rent",
    imagePath: "property_3.jpg",
  },
];

// Function to upload image to Cloudinary
async function uploadImageToCloudinary(imagePath) {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}

// Function to process each property with its image
async function processProperty(property, imageFileName) {
  const imagePath = path.join(
    __dirname,
    "..",
    "client",
    "public",
    "images",
    "propertyimg",
    imageFileName
  );
  try {
    const imageUrl = await uploadImageToCloudinary(imagePath);
    return { ...property, imageUrl };
  } catch (error) {
    console.error(
      `Error processing property with image ${imageFileName}:`,
      error
    );
    return property;
  }
}

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Process each property with its corresponding image
    const propertyPromises = propertyData.map((property, index) =>
      processProperty(property, `property_${index + 1}.jpg`)
    );

    const processedProperties = await Promise.all(propertyPromises);

    // Clear existing data and insert new properties
    await Property.deleteMany();
    const inserted = await Property.insertMany(processedProperties);
    console.log(`Inserted ${inserted.length} documents with images`);

    mongoose.disconnect();
  })
  .catch((err) => console.error("MongoDB error:", err));
