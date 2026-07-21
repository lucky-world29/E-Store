require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    await User.deleteMany();
    console.log("🗑️ Old Users Deleted");

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const users = [
      {
        firstName: "Admin",
        lastName: "User",
        email: "admin@estore.com",
        password: hashedPassword,
        phone: "9876543210",
        profileImage: "",
        role: "admin",
        isVerified: true,
        isBlocked: false,
      },
    ];

    await User.insertMany(users);

    console.log("✅ Users Seeded Successfully");
    console.log("--------------------------------");
    console.log("Admin Login");
    console.log("Email    : admin@estore.com");
    console.log("Password : admin123");
    console.log("Hashed Password:", hashedPassword);
    console.log("--------------------------------");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedUsers();