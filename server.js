const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
require("dotenv").config();
const path = require("path");

// Initialize Express App
const app = express(); 

const corsOptions = {
  origin: "https://trendfit.netlify.app", // Netlify frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

// Middleware
app.use(cors(corsOptions)); // No error now
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Product Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
