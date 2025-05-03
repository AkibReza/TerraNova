const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Build Mongo URI with encoded credentials
const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const uri = `mongodb+srv://${username}:${password}@terranova.fomh40k.mongodb.net/terranova?retryWrites=true&w=majority&appName=TerraNova`;

// Connect to DB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Route setup
app.use("/api/properties", require("./routes/propertyRoutes"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
