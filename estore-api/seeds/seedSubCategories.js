require("dotenv").config();
const mongoose = require("mongoose");

const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

async function seedSubCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const men = await Category.findOne({ slug: "men" });
    const women = await Category.findOne({ slug: "women" });
    const kids = await Category.findOne({ slug: "kids" });
    const accessories = await Category.findOne({ slug: "accessories" });

    if (!men || !women || !kids || !accessories) {
      console.log("❌ Please seed categories first.");
      process.exit();
    }

    const subCategories = [
      // =========================
      // Men
      // =========================
      {
        categoryId: men._id,
        name: "T-Shirts",
        slug: "t-shirts",
        image: "/uploads/subcategories/t-shirts.jpg",
        description: "Men's T-Shirts",
        isActive: true,
      },
      {
        categoryId: men._id,
        name: "Shirts",
        slug: "shirts",
        image: "/uploads/subcategories/shirts.jpg",
        description: "Men's Shirts",
        isActive: true,
      },
      {
        categoryId: men._id,
        name: "Jeans",
        slug: "jeans",
        image: "/uploads/subcategories/jeans.jpg",
        description: "Men's Jeans",
        isActive: true,
      },
      {
        categoryId: men._id,
        name: "Trousers",
        slug: "trousers",
        image: "/uploads/subcategories/trousers.jpg",
        description: "Men's Trousers",
        isActive: true,
      },
      {
        categoryId: men._id,
        name: "Jackets",
        slug: "jackets",
        image: "/uploads/subcategories/jackets.jpg",
        description: "Men's Jackets",
        isActive: true,
      },
      {
        categoryId: men._id,
        name: "Hoodies",
        slug: "hoodies",
        image: "/uploads/subcategories/hoodies.jpg",
        description: "Men's Hoodies",
        isActive: true,
      },
      {
        categoryId: men._id,
        name: "Shoes",
        slug: "shoes",
        image: "/uploads/subcategories/shoes.jpg",
        description: "Men's Shoes",
        isActive: true,
      },
      {
        categoryId: men._id,
        name: "Sandals",
        slug: "sandals",
        image: "/uploads/subcategories/sandals.jpg",
        description: "Men's Sandals",
        isActive: true,
      },
      {
        categoryId: men._id,
        name: "Watches",
        slug: "watches",
        image: "/uploads/subcategories/watches.jpg",
        description: "Men's Watches",
        isActive: true,
      },
      {
        categoryId: men._id,
        name: "Wallets",
        slug: "wallets",
        image: "/uploads/subcategories/wallets.jpg",
        description: "Men's Wallets",
        isActive: true,
      },
      {
        categoryId: men._id,
        name: "Belts",
        slug: "belts",
        image: "/uploads/subcategories/belts.jpg",
        description: "Men's Belts",
        isActive: true,
      },
      {
        categoryId: men._id,
        name: "Sunglasses",
        slug: "sunglasses",
        image: "/uploads/subcategories/sunglasses.jpg",
        description: "Men's Sunglasses",
        isActive: true,
      },

      // =========================
      // Women
      // =========================
      {
        categoryId: women._id,
        name: "Dresses",
        slug: "dresses",
        image: "/uploads/subcategories/dresses.jpg",
        description: "Women's Dresses",
        isActive: true,
      },
      {
        categoryId: women._id,
        name: "Tops",
        slug: "tops",
        image: "/uploads/subcategories/tops.jpg",
        description: "Women's Tops",
        isActive: true,
      },
      {
        categoryId: women._id,
        name: "T-Shirts",
        slug: "women-t-shirts",
        image: "/uploads/subcategories/women-tshirts.jpg",
        description: "Women's T-Shirts",
        isActive: true,
      },
      {
        categoryId: women._id,
        name: "Jeans",
        slug: "women-jeans",
        image: "/uploads/subcategories/women-jeans.jpg",
        description: "Women's Jeans",
        isActive: true,
      },
      {
        categoryId: women._id,
        name: "Kurtis",
        slug: "kurtis",
        image: "/uploads/subcategories/kurtis.jpg",
        description: "Women's Kurtis",
        isActive: true,
      },
      {
        categoryId: women._id,
        name: "Sarees",
        slug: "sarees",
        image: "/uploads/subcategories/sarees.jpg",
        description: "Women's Sarees",
        isActive: true,
      },
      {
        categoryId: women._id,
        name: "Handbags",
        slug: "handbags",
        image: "/uploads/subcategories/handbags.jpg",
        description: "Women's Handbags",
        isActive: true,
      },
      {
        categoryId: women._id,
        name: "Heels",
        slug: "heels",
        image: "/uploads/subcategories/heels.jpg",
        description: "Women's Heels",
        isActive: true,
      },
      {
        categoryId: women._id,
        name: "Flats",
        slug: "flats",
        image: "/uploads/subcategories/flats.jpg",
        description: "Women's Flats",
        isActive: true,
      },
      {
        categoryId: women._id,
        name: "Jewelry",
        slug: "jewelry",
        image: "/uploads/subcategories/jewelry.jpg",
        description: "Women's Jewelry",
        isActive: true,
      },
      {
        categoryId: women._id,
        name: "Watches",
        slug: "women-watches",
        image: "/uploads/subcategories/women-watches.jpg",
        description: "Women's Watches",
        isActive: true,
      },

      // =========================
      // Kids
      // =========================
      {
        categoryId: kids._id,
        name: "Boys Clothing",
        slug: "boys-clothing",
        image: "/uploads/subcategories/boys-clothing.jpg",
        description: "Boys Clothing",
        isActive: true,
      },
      {
        categoryId: kids._id,
        name: "Girls Clothing",
        slug: "girls-clothing",
        image: "/uploads/subcategories/girls-clothing.jpg",
        description: "Girls Clothing",
        isActive: true,
      },
      {
        categoryId: kids._id,
        name: "Toys",
        slug: "toys",
        image: "/uploads/subcategories/toys.jpg",
        description: "Kids Toys",
        isActive: true,
      },
      {
        categoryId: kids._id,
        name: "School Bags",
        slug: "school-bags",
        image: "/uploads/subcategories/school-bags.jpg",
        description: "Kids School Bags",
        isActive: true,
      },
      {
        categoryId: kids._id,
        name: "Shoes",
        slug: "kids-shoes",
        image: "/uploads/subcategories/kids-shoes.jpg",
        description: "Kids Shoes",
        isActive: true,
      },
      {
        categoryId: kids._id,
        name: "Accessories",
        slug: "kids-accessories",
        image: "/uploads/subcategories/kids-accessories.jpg",
        description: "Kids Accessories",
        isActive: true,
      },

      // =========================
      // Accessories
      // =========================
      {
        categoryId: accessories._id,
        name: "Watches",
        slug: "accessory-watches",
        image: "/uploads/subcategories/accessory-watches.jpg",
        description: "Fashion Watches",
        isActive: true,
      },
      {
        categoryId: accessories._id,
        name: "Wallets",
        slug: "accessory-wallets",
        image: "/uploads/subcategories/accessory-wallets.jpg",
        description: "Fashion Wallets",
        isActive: true,
      },
      {
        categoryId: accessories._id,
        name: "Belts",
        slug: "accessory-belts",
        image: "/uploads/subcategories/accessory-belts.jpg",
        description: "Fashion Belts",
        isActive: true,
      },
      {
        categoryId: accessories._id,
        name: "Sunglasses",
        slug: "accessory-sunglasses",
        image: "/uploads/subcategories/accessory-sunglasses.jpg",
        description: "Fashion Sunglasses",
        isActive: true,
      },
      {
        categoryId: accessories._id,
        name: "Caps",
        slug: "caps",
        image: "/uploads/subcategories/caps.jpg",
        description: "Fashion Caps",
        isActive: true,
      },
      {
        categoryId: accessories._id,
        name: "Bags",
        slug: "bags",
        image: "/uploads/subcategories/bags.jpg",
        description: "Fashion Bags",
        isActive: true,
      },
      {
        categoryId: accessories._id,
        name: "Perfumes",
        slug: "perfumes",
        image: "/uploads/subcategories/perfumes.jpg",
        description: "Perfumes",
        isActive: true,
      },
      {
        categoryId: accessories._id,
        name: "Mobile Accessories",
        slug: "mobile-accessories",
        image: "/uploads/subcategories/mobile-accessories.jpg",
        description: "Mobile Accessories",
        isActive: true,
      },
      {
        categoryId: accessories._id,
        name: "Laptop Accessories",
        slug: "laptop-accessories",
        image: "/uploads/subcategories/laptop-accessories.jpg",
        description: "Laptop Accessories",
        isActive: true,
      },
    ];

    await SubCategory.deleteMany();
    console.log("🗑️ Old SubCategories Deleted");

    await SubCategory.insertMany(subCategories);
    console.log("✅ SubCategories Seeded Successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedSubCategories();