require("dotenv").config();
const mongoose = require("mongoose");

const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Product = require("../models/Product");

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Categories
    const men = await Category.findOne({ slug: "men" });
    const women = await Category.findOne({ slug: "women" });
    const kids = await Category.findOne({ slug: "kids" });
    const accessories = await Category.findOne({ slug: "accessories" });

    // Men SubCategories
    const tshirts = await SubCategory.findOne({ slug: "t-shirts" });
    const shirts = await SubCategory.findOne({ slug: "shirts" });
    const jeans = await SubCategory.findOne({ slug: "jeans" });
    const trousers = await SubCategory.findOne({ slug: "trousers" });
    const jackets = await SubCategory.findOne({ slug: "jackets" });
    const hoodies = await SubCategory.findOne({ slug: "hoodies" });
    const shoes = await SubCategory.findOne({ slug: "shoes" });
    const watches = await SubCategory.findOne({ slug: "watches" });

    // Women SubCategories
    const dresses = await SubCategory.findOne({ slug: "dresses" });
    const tops = await SubCategory.findOne({ slug: "tops" });
    const womenJeans = await SubCategory.findOne({ slug: "women-jeans" });
    const kurtis = await SubCategory.findOne({ slug: "kurtis" });
    const sarees = await SubCategory.findOne({ slug: "sarees" });
    const handbags = await SubCategory.findOne({ slug: "handbags" });
    const heels = await SubCategory.findOne({ slug: "heels" });
    const jewelry = await SubCategory.findOne({ slug: "jewelry" });

    // Kids
    const boys = await SubCategory.findOne({ slug: "boys-clothing" });
    const girls = await SubCategory.findOne({ slug: "girls-clothing" });
    const toys = await SubCategory.findOne({ slug: "toys" });
    const schoolBags = await SubCategory.findOne({ slug: "school-bags" });
    const kidShoes = await SubCategory.findOne({ slug: "kids-shoes" });

    // Accessories
    const belts = await SubCategory.findOne({ slug: "accessory-belts" });
    const sunglasses = await SubCategory.findOne({ slug: "accessory-sunglasses" });
    const perfumes = await SubCategory.findOne({ slug: "perfumes" });
    const mobileAccessories = await SubCategory.findOne({ slug: "mobile-accessories" });
    const laptopAccessories = await SubCategory.findOne({ slug: "laptop-accessories" });

    await Product.deleteMany();
    console.log("🗑️ Old Products Deleted");

    const products = [
        // =========================
// MEN
// =========================
{
  title: "Nike Sports T-Shirt",
  slug: "nike-sports-t-shirt",
  categoryId: men._id,
  subcategoryId: tshirts._id,
  brand: "Nike",
  description: "Premium cotton sports t-shirt.",
  price: 1499,
  discount: 10,
  stock: 25,
  sku: "MEN-TS-001",
  images: [
    "/uploads/products/nike-tshirt-1.jpg",
    "/uploads/products/nike-tshirt-2.jpg",
  ],
  rating: 0,
  numReviews: 0,
  isFeatured: true,
  isActive: true,
},
{
  title: "Adidas Casual Shirt",
  slug: "adidas-casual-shirt",
  categoryId: men._id,
  subcategoryId: shirts._id,
  brand: "Adidas",
  description: "Slim fit casual shirt.",
  price: 1999,
  discount: 15,
  stock: 20,
  sku: "MEN-SH-001",
  images: [
    "/uploads/products/adidas-shirt-1.jpg",
    "/uploads/products/adidas-shirt-2.jpg",
  ],
  rating: 0,
  numReviews: 0,
  isFeatured: true,
  isActive: true,
},
{
  title: "Levi's Blue Jeans",
  slug: "levis-blue-jeans",
  categoryId: men._id,
  subcategoryId: jeans._id,
  brand: "Levi's",
  description: "Comfort fit blue jeans.",
  price: 2499,
  discount: 20,
  stock: 18,
  sku: "MEN-JN-001",
  images: [
    "/uploads/products/levis-jeans-1.jpg",
    "/uploads/products/levis-jeans-2.jpg",
  ],
  rating: 0,
  numReviews: 0,
  isFeatured: true,
  isActive: true,
},
{
  title: "Allen Solly Trousers",
  slug: "allen-solly-trousers",
  categoryId: men._id,
  subcategoryId: trousers._id,
  brand: "Allen Solly",
  description: "Formal office trousers.",
  price: 1799,
  discount: 5,
  stock: 30,
  sku: "MEN-TR-001",
  images: [
    "/uploads/products/trousers-1.jpg",
    "/uploads/products/trousers-2.jpg",
  ],
  rating: 0,
  numReviews: 0,
  isFeatured: false,
  isActive: true,
},
{
  title: "Roadster Jacket",
  slug: "roadster-jacket",
  categoryId: men._id,
  subcategoryId: jackets._id,
  brand: "Roadster",
  description: "Winter denim jacket.",
  price: 2999,
  discount: 25,
  stock: 15,
  sku: "MEN-JK-001",
  images: [
    "/uploads/products/jacket-1.jpg",
    "/uploads/products/jacket-2.jpg",
  ],
  rating: 0,
  numReviews: 0,
  isFeatured: true,
  isActive: true,
},
{
  title: "Puma Hoodie",
  slug: "puma-hoodie",
  categoryId: men._id,
  subcategoryId: hoodies._id,
  brand: "Puma",
  description: "Warm fleece hoodie.",
  price: 2299,
  discount: 10,
  stock: 22,
  sku: "MEN-HD-001",
  images: [
    "/uploads/products/hoodie-1.jpg",
    "/uploads/products/hoodie-2.jpg",
  ],
  rating: 0,
  numReviews: 0,
  isFeatured: false,
  isActive: true,
},
{
  title: "Woodland Shoes",
  slug: "woodland-shoes",
  categoryId: men._id,
  subcategoryId: shoes._id,
  brand: "Woodland",
  description: "Outdoor leather shoes.",
  price: 3499,
  discount: 18,
  stock: 16,
  sku: "MEN-SHOE-001",
  images: [
    "/uploads/products/woodland-shoes-1.jpg",
    "/uploads/products/woodland-shoes-2.jpg",
  ],
  rating: 0,
  numReviews: 0,
  isFeatured: true,
  isActive: true,
},
{
  title: "Titan Analog Watch",
  slug: "titan-analog-watch",
  categoryId: men._id,
  subcategoryId: watches._id,
  brand: "Titan",
  description: "Premium analog wrist watch.",
  price: 4999,
  discount: 12,
  stock: 12,
  sku: "MEN-WT-001",
  images: [
    "/uploads/products/titan-watch-1.jpg",
    "/uploads/products/titan-watch-2.jpg",
  ],
  rating: 0,
  numReviews: 0,
  isFeatured: true,
  isActive: true,
},

// =========================
// WOMEN
// =========================
{
  title: "Floral Summer Dress",
  slug: "floral-summer-dress",
  categoryId: women._id,
  subcategoryId: dresses._id,
  brand: "Zara",
  description: "Elegant floral summer dress.",
  price: 2599,
  discount: 20,
  stock: 20,
  sku: "WM-DR-001",
  images: [
    "/uploads/products/dress-1.jpg",
    "/uploads/products/dress-2.jpg",
  ],
  rating: 0,
  numReviews: 0,
  isFeatured: true,
  isActive: true,
},
{
  title: "H&M Casual Top",
  slug: "hm-casual-top",
  categoryId: women._id,
  subcategoryId: tops._id,
  brand: "H&M",
  description: "Soft cotton casual top.",
  price: 1199,
  discount: 8,
  stock: 30,
  sku: "WM-TOP-001",
  images: [
    "/uploads/products/top-1.jpg",
    "/uploads/products/top-2.jpg",
  ],
  rating: 0,
  numReviews: 0,
  isFeatured: false,
  isActive: true,
},
{
  title: "Levi's Women Jeans",
  slug: "levis-women-jeans",
  categoryId: women._id,
  subcategoryId: womenJeans._id,
  brand: "Levi's",
  description: "Slim fit denim jeans.",
  price: 2399,
  discount: 15,
  stock: 18,
  sku: "WM-JN-001",
  images: [
    "/uploads/products/women-jeans-1.jpg",
    "/uploads/products/women-jeans-2.jpg",
  ],
  rating: 0,
  numReviews: 0,
  isFeatured: true,
  isActive: true,
},
{
  title: "Biba Cotton Kurti",
  slug: "biba-cotton-kurti",
  categoryId: women._id,
  subcategoryId: kurtis._id,
  brand: "Biba",
  description: "Traditional cotton kurti.",
  price: 1699,
  discount: 10,
  stock: 24,
  sku: "WM-KR-001",
  images: [
    "/uploads/products/kurti-1.jpg",
    "/uploads/products/kurti-2.jpg",
  ],
  rating: 0,
  numReviews: 0,
  isFeatured: false,
  isActive: true,
},
{
  title: "Silk Saree",
  slug: "silk-saree",
  categoryId: women._id,
  subcategoryId: sarees._id,
  brand: "Manyavar",
  description: "Premium silk saree.",
  price: 4999,
  discount: 18,
  stock: 10,
  sku: "WM-SR-001",
  images: [
    "/uploads/products/saree-1.jpg",
    "/uploads/products/saree-2.jpg",
  ],
  rating: 0,
  numReviews: 0,
  isFeatured: true,
  isActive: true,
},
{
  title: "Lavie Handbag",
  slug: "lavie-handbag",
  categoryId: women._id,
  subcategoryId: handbags._id,
  brand: "Lavie",
  description: "Designer handbag.",
  price: 2199,
  discount: 15,
  stock: 18,
  sku: "WM-HB-001",
  images: [
    "/uploads/products/handbag-1.jpg",
    "/uploads/products/handbag-2.jpg",
  ],
  rating: 0,
  numReviews: 0,
  isFeatured: true,
  isActive: true,
},
{
  title: "Metro High Heels",
  slug: "metro-high-heels",
  categoryId: women._id,
  subcategoryId: heels._id,
  brand: "Metro",
  description: "Stylish high heels.",
  price: 2799,
  discount: 12,
  stock: 16,
  sku: "WM-HL-001",
  images: [
    "/uploads/products/heels-1.jpg",
    "/uploads/products/heels-2.jpg",
  ],
  rating: 0,
  numReviews: 0,
  isFeatured: false,
  isActive: true,
},
{
  title: "Gold Plated Jewelry Set",
  slug: "gold-plated-jewelry-set",
  categoryId: women._id,
  subcategoryId: jewelry._id,
  brand: "Tanishq",
  description: "Beautiful jewelry set.",
  price: 5999,
  discount: 20,
  stock: 8,
  sku: "WM-JW-001",
  images: [
    "/uploads/products/jewelry-1.jpg",
    "/uploads/products/jewelry-2.jpg",
  ],
  rating: 0,
  numReviews: 0,
  isFeatured: true,
  isActive: true,
},
      // =========================
      // KIDS
      // =========================
      {
        title: "Boys Printed T-Shirt",
        slug: "boys-printed-t-shirt",
        categoryId: kids._id,
        subcategoryId: boys._id,
        brand: "U.S. Polo",
        description: "Comfortable cotton t-shirt for boys.",
        price: 699,
        discount: 10,
        stock: 40,
        sku: "KD-BY-001",
        images: [
          "/uploads/products/boys-tshirt-1.jpg",
          "/uploads/products/boys-tshirt-2.jpg",
        ],
        rating: 0,
        numReviews: 0,
        isFeatured: true,
        isActive: true,
      },
      {
        title: "Girls Floral Dress",
        slug: "girls-floral-dress",
        categoryId: kids._id,
        subcategoryId: girls._id,
        brand: "Max",
        description: "Beautiful floral dress for girls.",
        price: 999,
        discount: 12,
        stock: 35,
        sku: "KD-GR-001",
        images: [
          "/uploads/products/girls-dress-1.jpg",
          "/uploads/products/girls-dress-2.jpg",
        ],
        rating: 0,
        numReviews: 0,
        isFeatured: true,
        isActive: true,
      },
      {
        title: "Remote Control Racing Car",
        slug: "remote-control-racing-car",
        categoryId: kids._id,
        subcategoryId: toys._id,
        brand: "Hot Wheels",
        description: "Rechargeable RC racing car.",
        price: 1599,
        discount: 15,
        stock: 25,
        sku: "KD-TY-001",
        images: [
          "/uploads/products/rc-car-1.jpg",
          "/uploads/products/rc-car-2.jpg",
        ],
        rating: 0,
        numReviews: 0,
        isFeatured: true,
        isActive: true,
      },
      {
        title: "Skybags School Bag",
        slug: "skybags-school-bag",
        categoryId: kids._id,
        subcategoryId: schoolBags._id,
        brand: "Skybags",
        description: "Durable waterproof school bag.",
        price: 1499,
        discount: 20,
        stock: 30,
        sku: "KD-BAG-001",
        images: [
          "/uploads/products/school-bag-1.jpg",
          "/uploads/products/school-bag-2.jpg",
        ],
        rating: 0,
        numReviews: 0,
        isFeatured: false,
        isActive: true,
      },
      {
        title: "Kids Running Shoes",
        slug: "kids-running-shoes",
        categoryId: kids._id,
        subcategoryId: kidShoes._id,
        brand: "Puma",
        description: "Lightweight sports shoes for kids.",
        price: 1899,
        discount: 18,
        stock: 28,
        sku: "KD-SHOE-001",
        images: [
          "/uploads/products/kids-shoes-1.jpg",
          "/uploads/products/kids-shoes-2.jpg",
        ],
        rating: 0,
        numReviews: 0,
        isFeatured: true,
        isActive: true,
      },
      {
        title: "Teddy Bear",
        slug: "soft-teddy-bear",
        categoryId: kids._id,
        subcategoryId: toys._id,
        brand: "Funskool",
        description: "Soft plush teddy bear.",
        price: 799,
        discount: 5,
        stock: 50,
        sku: "KD-TY-002",
        images: [
          "/uploads/products/teddy-1.jpg",
          "/uploads/products/teddy-2.jpg",
        ],
        rating: 0,
        numReviews: 0,
        isFeatured: false,
        isActive: true,
      },
      {
        title: "Kids Water Bottle",
        slug: "kids-water-bottle",
        categoryId: kids._id,
        subcategoryId: schoolBags._id,
        brand: "Milton",
        description: "Leakproof BPA-free water bottle.",
        price: 399,
        discount: 0,
        stock: 60,
        sku: "KD-WB-001",
        images: [
          "/uploads/products/water-bottle-1.jpg",
          "/uploads/products/water-bottle-2.jpg",
        ],
        rating: 0,
        numReviews: 0,
        isFeatured: false,
        isActive: true,
      },
      {
        title: "Kids Baseball Cap",
        slug: "kids-baseball-cap",
        categoryId: kids._id,
        subcategoryId: boys._id,
        brand: "Puma",
        description: "Adjustable cotton cap.",
        price: 499,
        discount: 10,
        stock: 45,
        sku: "KD-CAP-001",
        images: [
          "/uploads/products/kids-cap-1.jpg",
          "/uploads/products/kids-cap-2.jpg",
        ],
        rating: 0,
        numReviews: 0,
        isFeatured: false,
        isActive: true,
      },

      // =========================
      // ACCESSORIES
      // =========================
      {
        title: "Casio Digital Watch",
        slug: "casio-digital-watch",
        categoryId: accessories._id,
        subcategoryId: watches._id,
        brand: "Casio",
        description: "Classic digital wrist watch.",
        price: 2499,
        discount: 10,
        stock: 20,
        sku: "ACC-WT-001",
        images: [
          "/uploads/products/casio-watch-1.jpg",
          "/uploads/products/casio-watch-2.jpg",
        ],
        rating: 0,
        numReviews: 0,
        isFeatured: true,
        isActive: true,
      },
      {
        title: "Leather Belt",
        slug: "genuine-leather-belt",
        categoryId: accessories._id,
        subcategoryId: belts._id,
        brand: "Woodland",
        description: "Premium genuine leather belt.",
        price: 899,
        discount: 15,
        stock: 35,
        sku: "ACC-BLT-001",
        images: [
          "/uploads/products/belt-1.jpg",
          "/uploads/products/belt-2.jpg",
        ],
        rating: 0,
        numReviews: 0,
        isFeatured: false,
        isActive: true,
      },
      {
        title: "Ray-Ban Sunglasses",
        slug: "rayban-sunglasses",
        categoryId: accessories._id,
        subcategoryId: sunglasses._id,
        brand: "Ray-Ban",
        description: "UV protected sunglasses.",
        price: 4999,
        discount: 20,
        stock: 18,
        sku: "ACC-SUN-001",
        images: [
          "/uploads/products/sunglasses-1.jpg",
          "/uploads/products/sunglasses-2.jpg",
        ],
        rating: 0,
        numReviews: 0,
        isFeatured: true,
        isActive: true,
      },
      {
        title: "Wild Stone Perfume",
        slug: "wild-stone-perfume",
        categoryId: accessories._id,
        subcategoryId: perfumes._id,
        brand: "Wild Stone",
        description: "Long lasting perfume.",
        price: 799,
        discount: 10,
        stock: 40,
        sku: "ACC-PER-001",
        images: [
          "/uploads/products/perfume-1.jpg",
          "/uploads/products/perfume-2.jpg",
        ],
        rating: 0,
        numReviews: 0,
        isFeatured: false,
        isActive: true,
      },
      {
        title: "Fast Charging USB Cable",
        slug: "fast-charging-usb-cable",
        categoryId: accessories._id,
        subcategoryId: mobileAccessories._id,
        brand: "boAt",
        description: "Type-C fast charging cable.",
        price: 399,
        discount: 5,
        stock: 100,
        sku: "ACC-MOB-001",
        images: [
          "/uploads/products/usb-cable-1.jpg",
          "/uploads/products/usb-cable-2.jpg",
        ],
        rating: 0,
        numReviews: 0,
        isFeatured: false,
        isActive: true,
      },
      {
        title: "Wireless Earbuds",
        slug: "wireless-earbuds",
        categoryId: accessories._id,
        subcategoryId: mobileAccessories._id,
        brand: "boAt",
        description: "Bluetooth wireless earbuds.",
        price: 2999,
        discount: 18,
        stock: 30,
        sku: "ACC-EAR-001",
        images: [
          "/uploads/products/earbuds-1.jpg",
          "/uploads/products/earbuds-2.jpg",
        ],
        rating: 0,
        numReviews: 0,
        isFeatured: true,
        isActive: true,
      },
      {
        title: "Laptop Backpack",
        slug: "laptop-backpack",
        categoryId: accessories._id,
        subcategoryId: laptopAccessories._id,
        brand: "American Tourister",
        description: "Water resistant laptop backpack.",
        price: 2499,
        discount: 15,
        stock: 25,
        sku: "ACC-LAP-001",
        images: [
          "/uploads/products/laptop-bag-1.jpg",
          "/uploads/products/laptop-bag-2.jpg",
        ],
        rating: 0,
        numReviews: 0,
        isFeatured: true,
        isActive: true,
      },
      {
        title: "Wireless Mouse",
        slug: "wireless-mouse",
        categoryId: accessories._id,
        subcategoryId: laptopAccessories._id,
        brand: "Logitech",
        description: "Ergonomic wireless mouse.",
        price: 1299,
        discount: 12,
        stock: 45,
        sku: "ACC-MOUSE-001",
        images: [
          "/uploads/products/mouse-1.jpg",
          "/uploads/products/mouse-2.jpg",
        ],
        rating: 0,
        numReviews: 0,
        isFeatured: false,
        isActive: true,
      },    ];

    await Product.insertMany(products);

    console.log("✅ Products Seeded Successfully");
    console.log("--------------------------------");
    console.log(`📦 Total Products : ${products.length}`);
    console.log("--------------------------------");

    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedProducts();