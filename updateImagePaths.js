const mongoose = require("mongoose");
const Product = require("./models/product"); // Path to your Product model

// MongoDB connection string
const mongoURI = "mongodb+srv://rd479402:LCHXguOaYkmmUDoy@trendfit.el2ct.mongodb.net/trendfit?retryWrites=true&w=majority&appName=trendfit";

// Function to rebuild color_images
async function rebuildColorImages() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");

    const products = await Product.find({});
    console.log(`Found ${products.length} products to process.`);

    for (const product of products) {
      if (Array.isArray(product.colors) && product.colors.length > 0) {
        let newColorImages = {};

        // Generate image paths based on color names
        product.colors.forEach((color) => {
          // Normalize color names for filenames
          const normalizedColor = color.toLowerCase().replace(/[^a-z0-9]/g, "-");
          newColorImages[color] = `/uploads/${product.name.replace(/\s+/g, "-").toLowerCase()}-${normalizedColor}.jpg`;
        });

        product.color_images = newColorImages; // Update the color_images field
        await product.save();
        console.log(`Updated product: ${product.name}`);
      }
    }

    console.log("Finished rebuilding color_images.");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error rebuilding color_images:", error);
    mongoose.disconnect();
  }
}

rebuildColorImages();
