// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from .env or fallback to 5000

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// MongoDB Connection
mongoose.connect(
  process.env.MONGO_URI, // Use connection string from .env
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema + Model
const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  product: String,
  quantity: Number,
  totalPrice: Number,
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// ✅ API route for orders
app.post("/api/orders", async (req, res) => {
  try {
    const { name, phone, address, product, quantity } = req.body;

    const pricePerUnit = 10; // fixed price per item
    const totalPrice = quantity * pricePerUnit;

    const newOrder = new Order({
      name,
      phone,
      address,
      product,
      quantity,
      totalPrice,
    });

    await newOrder.save();

    res.json({
      message: "Order placed successfully",
      totalPrice: totalPrice,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
