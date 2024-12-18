const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: { type: [String], required: true },
  colors: { type: [String], required: true },
  color_images: { type: Map, of: String },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
