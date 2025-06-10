const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");
const chatRoutes = require("./routes/chat");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/course", courseRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});
// Starting server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
