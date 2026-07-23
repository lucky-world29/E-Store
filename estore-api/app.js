const express = require("express");
const cors = require("cors");
const path = require("path");

const Product = require("./models/Product");
const Category = require("./models/Category");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log(path.join(__dirname, "uploads"));
app.use("/uploads", (req, res, next) => {
    console.log("UPLOAD REQUEST:", req.url);
    next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🚀 eStore API is Running...");
});

app.get("/productCategories", async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch categories",
    });
  }
});

app.get("/getProducts", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
});

module.exports = app;