const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dqkukzvbf",
  api_key: "684558322453942",
  api_secret: "X4GbN_iSngWR-HX_MDtVErzoyGQ",
});

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// GET route to fetch all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST route to add a property
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let propertyData = req.body;

    // Parse amenities if it's a string
    if (typeof propertyData.amenities === "string") {
      propertyData.amenities = JSON.parse(propertyData.amenities);
    }

    // Upload image to Cloudinary if present
    if (req.file) {
      const buffer = req.file.buffer;
      const base64Image = buffer.toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "terranova_properties",
      });

      propertyData.imageUrl = result.secure_url;
    }

    // Convert numeric strings to numbers
    [
      "price",
      "propertySize",
      "numberOfBedrooms",
      "numberOfBathrooms",
      "latitude",
      "longitude",
    ].forEach((field) => {
      if (propertyData[field]) {
        propertyData[field] = Number(propertyData[field]);
      }
    });

    const newProperty = new Property(propertyData);
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    console.error("Error adding property:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST route to add a property with new structure
router.post("/properties", upload.single("image"), async (req, res) => {
  try {
    // Parse the stringified property data
    const propertyData = JSON.parse(req.body.propertyData);

    // Handle image upload if present
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      propertyData.imageUrl = result.secure_url;
    }

    // Create and save the new property
    const property = new Property(propertyData);
    await property.save();

    res.status(201).json(property);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch all unique locations with coordinates
router.get("/locations", async (req, res) => {
  try {
    const locations = await Property.aggregate([
      {
        $match: {
          latitude: { $exists: true },
          longitude: { $exists: true },
          location: { $exists: true },
        },
      },
      {
        $group: {
          _id: "$location",
          latitude: { $first: "$latitude" },
          longitude: { $first: "$longitude" },
        },
      },
      {
        $project: {
          location: "$_id",
          latitude: 1,
          longitude: 1,
          _id: 0,
        },
      },
    ]);

    console.log("Locations found:", locations); // Debug log

    if (!locations || locations.length === 0) {
      return res.json([]); // Return empty array if no locations
    }

    res.json(locations);
  } catch (err) {
    console.error("Error in /locations endpoint:", err); // Debug log
    res.status(500).json({
      error: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

module.exports = router;
