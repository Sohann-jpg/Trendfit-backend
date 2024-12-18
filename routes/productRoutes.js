const express = require("express");
const router = express.Router();
const upload = require("./upload");
const Product = require("../models/product");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Image upload route
router.post("/upload", upload.array("images", 120), (req, res) => {
    try {
      const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
      res.status(200).json({ message: "Images uploaded successfully", images: imagePaths });
    } catch (error) {
      console.error("Image Upload Error:", error.message);
      res.status(500).json({ error: "Failed to upload images. Please try again." });
    }
  });
router.get("/", getProducts);           // Get all products
router.post("/", createProduct);        // Create a new product
router.put("/:id", updateProduct);      // Update a product
router.delete("/:id", deleteProduct);   // Delete a product

router.get("/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error.message);
      res.status(500).json({ error: "Server error" });
    }
  });
 

module.exports = router;
