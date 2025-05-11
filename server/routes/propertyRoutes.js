const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

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
router.post("/", async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
