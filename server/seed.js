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
  {
    price: 400000000,
    propertyType: "Mansion",
    propertySize: 1900,
    numberOfBedrooms: 3,
    numberOfBathrooms: 3,
    amenities: ["Parking", "Elevator", "Security"],
    location: "Baridhara DHOS",
    latitude: 23.8759,
    longitude: 90.3795,
    otherDetails: "Cozy mansion, ideal for large families .",
    transactionType: "Sale",
    imagePath: "property_4.jpg",
  },
   {
    price: 50000000,
    propertyType: "Apartment",
    propertySize: 1400,
    numberOfBedrooms: 3,
    numberOfBathrooms: 3,
    amenities: ["Parking", "Elevator", "Security"],
    location: "Niketan",
    latitude: 29.8759,
    longitude: 90.3795,
    otherDetails: " Modern apartment in a prime location.",
    transactionType: "Sale",
    imagePath: "property_5.jpg",
  },
   {
    price: 50000,
    propertyType: "Apartment",
    propertySize: 1300,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Elevator", "Security"],
    location: "Niketan",
    latitude: 29.8759,
    longitude: 90.3795,
    otherDetails: " Modern apartment in a prime location for small family.",
    transactionType: "Rent",
    imagePath: "property_6.jpg",
  },
   {
    price: 30000,
    propertyType: "Apartment",
    propertySize: 1400,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Elevator", "Security","Gym"],
    location: "Khilgaon",
    latitude: 27.8759,
    longitude: 92.3795,
    otherDetails: " Modern apartment in a prime location.",
    transactionType: "Rent",
    imagePath: "property_8.jpg",
  },
  {
    price: 40000,
    propertyType: "Apartment",
    propertySize: 1600,
    numberOfBedrooms: 4,
    numberOfBathrooms: 3,
    amenities: ["Parking", "Elevator", "Security","Gym"],
    location: "Khilgaon",
    latitude: 27.8759,
    longitude: 92.3795,
    otherDetails: "Beautiful view from belcony and modern apartment.",
    transactionType: "Rent",
    imagePath: "property_8.jpg",
  },
  {
    price: 35000,
    propertyType: "Apartment",
    propertySize: 1200,
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Security", "Playground"],
    location: "Dhanmondi",
    latitude: 23.7465,
    longitude: 90.3760,
    otherDetails: "Spacious apartment in a quiet neighborhood.",
    transactionType: "Rent",
    imagePath: "property_9.jpg",
  },
  {
    price: 45000000,
    propertyType: "Apartment",
    propertySize: 1800,
    numberOfBedrooms: 3,
    numberOfBathrooms: 3,
    amenities: ["Parking", "Elevator", "Security", "Gym"],
    location: "Gulshan",
    latitude: 23.7806,
    longitude: 90.4192,
    otherDetails: "Luxury apartment with premium amenities.",
    transactionType: "Sale",
    imagePath: "property_10.jpg",
  },
  {
    price: 28000,
    propertyType: "Apartment",
    propertySize: 950,
    numberOfBedrooms: 2,
    numberOfBathrooms: 1,
    amenities: ["Parking", "Security"],
    location: "Mirpur",
    latitude: 23.8223,
    longitude: 90.3654,
    otherDetails: "Affordable apartment with basic facilities.",
    transactionType: "Rent",
    imagePath: "property_11.jpg",
  },
  {
    price: 55000,
    propertyType: "Duplex",
    propertySize: 2200,
    numberOfBedrooms: 4,
    numberOfBathrooms: 3,
    amenities: ["Garden", "Parking", "Security", "Swimming Pool"],
    location: "Baridhara",
    latitude: 23.8075,
    longitude: 90.4258,
    otherDetails: "Spacious duplex with private garden area.",
    transactionType: "Rent",
    imagePath: "property_12.jpg",
  },
  {
    price: 75000000,
    propertyType: "Apartment",
    propertySize: 1600,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Elevator", "Security", "Community Hall"],
    location: "Bashundhara",
    latitude: 23.8133,
    longitude: 90.4225,
    otherDetails: "Modern apartment in a planned community.",
    transactionType: "Sale",
    imagePath: "property_13.jpg",
  },
  {
    price: 32000,
    propertyType: "Apartment",
    propertySize: 1100,
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Security"],
    location: "Motijheel",
    latitude: 23.7333,
    longitude: 90.4175,
    otherDetails: "Convenient location near business district.",
    transactionType: "Rent",
    imagePath: "property_14.jpg",
  },
  {
    price: 48000,
    propertyType: "Apartment",
    propertySize: 1350,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Elevator", "Security"],
    location: "Wari",
    latitude: 23.7104,
    longitude: 90.4074,
    otherDetails: "Well-maintained apartment in historic area.",
    transactionType: "Rent",
    imagePath: "property_15.jpg",
  },
  {
    price: 60000000,
    propertyType: "Penthouse",
    propertySize: 2500,
    numberOfBedrooms: 3,
    numberOfBathrooms: 3,
    amenities: ["Swimming Pool", "Gym", "Parking", "24/7 Security"],
    location: "Gulshan",
    latitude: 23.7855,
    longitude: 90.4123,
    otherDetails: "Luxury penthouse with panoramic city views.",
    transactionType: "Sale",
    imagePath: "property_16.jpg",
  },
  {
    price: 38000,
    propertyType: "Apartment",
    propertySize: 1250,
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Security", "Playground"],
    location: "Dhanmondi",
    latitude: 23.7402,
    longitude: 90.3718,
    otherDetails: "Renovated apartment with modern finishes.",
    transactionType: "Rent",
    imagePath: "property_17.jpg",
  },
  {
    price: 42000000,
    propertyType: "Apartment",
    propertySize: 1450,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Elevator", "Security"],
    location: "Mirpur",
    latitude: 23.8150,
    longitude: 90.3550,
    otherDetails: "Corner unit with extra windows and natural light.",
    transactionType: "Sale",
    imagePath: "property_18.jpg",
  },
  {
    price: 52000,
    propertyType: "Apartment",
    propertySize: 1500,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Security", "Gym", "Swimming Pool"],
    location: "Banani",
    latitude: 23.7940,
    longitude: 90.4025,
    otherDetails: "Top-floor apartment with terrace access.",
    transactionType: "Rent",
    imagePath: "property_19.jpg",
  },
  {
    price: 68000000,
    propertyType: "Villa",
    propertySize: 3200,
    numberOfBedrooms: 5,
    numberOfBathrooms: 4,
    amenities: ["Garden", "Parking", "Security", "Servant Quarter"],
    location: "Baridhara",
    latitude: 23.8100,
    longitude: 90.4300,
    otherDetails: "Spacious villa with private driveway.",
    transactionType: "Sale",
    imagePath: "property_20.jpg",
  },
  {
    price: 29000,
    propertyType: "Apartment",
    propertySize: 1000,
    numberOfBedrooms: 2,
    numberOfBathrooms: 1,
    amenities: ["Parking", "Security"],
    location: "Shyamoli",
    latitude: 23.7600,
    longitude: 90.3700,
    otherDetails: "Affordable apartment in developing area.",
    transactionType: "Rent",
    imagePath: "property_21.jpg",
  },
  {
    price: 35000000,
    propertyType: "Apartment",
    propertySize: 1300,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Elevator", "Security"],
    location: "Uttara",
    latitude: 23.8700,
    longitude: 90.3850,
    otherDetails: "Corner unit with city views.",
    transactionType: "Sale",
    imagePath: "property_22.jpg",
  },
  {
    price: 45000,
    propertyType: "Apartment",
    propertySize: 1400,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Security", "Community Hall"],
    location: "Badda",
    latitude: 23.7800,
    longitude: 90.4300,
    otherDetails: "Family-friendly apartment complex.",
    transactionType: "Rent",
    imagePath: "property_23.jpg",
  },
  {
    price: 55000,
    propertyType: "Duplex",
    propertySize: 2100,
    numberOfBedrooms: 3,
    numberOfBathrooms: 3,
    amenities: ["Garden", "Parking", "Security"],
    location: "Gulshan",
    latitude: 23.7900,
    longitude: 90.4150,
    otherDetails: "Modern duplex with private terrace.",
    transactionType: "Rent",
    imagePath: "property_24.jpg",
  },
  {
    price: 38000000,
    propertyType: "Apartment",
    propertySize: 1500,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Elevator", "Security", "Gym"],
    location: "Bashundhara",
    latitude: 23.8150,
    longitude: 90.4250,
    otherDetails: "Well-designed apartment with premium finishes.",
    transactionType: "Sale",
    imagePath: "property_25.jpg",
  },
  {
    price: 32000,
    propertyType: "Apartment",
    propertySize: 1100,
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Security"],
    location: "Farmgate",
    latitude: 23.7550,
    longitude: 90.3850,
    otherDetails: "Convenient central location.",
    transactionType: "Rent",
    imagePath: "property_26.jpg",
  },
  {
    price: 48000,
    propertyType: "Apartment",
    propertySize: 1450,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Elevator", "Security"],
    location: "Mohammadpur",
    latitude: 23.7650,
    longitude: 90.3650,
    otherDetails: "Spacious layout with large bedrooms.",
    transactionType: "Rent",
    imagePath: "property_27.jpg",
  },
  {
    price: 75000,
    propertyType: "Penthouse",
    propertySize: 2400,
    numberOfBedrooms: 3,
    numberOfBathrooms: 3,
    amenities: ["Terrace", "Parking", "Security", "Gym"],
    location: "Banani",
    latitude: 23.7950,
    longitude: 90.4000,
    otherDetails: "Luxury penthouse with rooftop access.",
    transactionType: "Rent",
    imagePath: "property_28.jpg",
  },
  {
    price: 42000000,
    propertyType: "Townhouse",
    propertySize: 1800,
    numberOfBedrooms: 4,
    numberOfBathrooms: 3,
    amenities: ["Garden", "Parking", "Security"],
    location: "Dhanmondi",
    latitude: 23.7450,
    longitude: 90.3750,
    otherDetails: "Charming townhouse in prime location.",
    transactionType: "Sale",
    imagePath: "property_29.jpg",
  },
  {
    price: 33000,
    propertyType: "Apartment",
    propertySize: 1150,
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    amenities: ["Parking", "Security"],
    location: "Shantinagar",
    latitude: 23.7350,
    longitude: 90.4150,
    otherDetails: "Recently renovated apartment.",
    transactionType: "Rent",
    imagePath: "property_30.jpg",
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
