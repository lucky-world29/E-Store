require("dotenv").config();
const mongoose = require("mongoose");

const Category = require("../models/Category");

const categories = [
  {
    name: "Men",
    slug: "men",
    image: "/uploads/categories/men.jpg",
    description: "Men Fashion",
    isActive: true,
  },
  {
    name: "Women",
    slug: "women",
    image: "/uploads/categories/women.jpg",
    description: "Women Fashion",
    isActive: true,
  },
  {
    name: "Kids",
    slug: "kids",
    image: "/uploads/categories/kids.jpg",
    description: "Kids Collection",
    isActive: true,
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "/uploads/categories/accessories.jpg",
    description: "Fashion Accessories",
    isActive: true,
  },
];

async function seedCategories() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Remove old categories
    await Category.deleteMany();
    console.log("🗑️ Old Categories Deleted");

    // Insert new categories
    await Category.insertMany(categories);
    console.log("✅ Categories Seeded Successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedCategories();