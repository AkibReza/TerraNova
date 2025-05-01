const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

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

module.exports = router;
