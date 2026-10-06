const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Notice = require("./models/Notice");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// Home page
app.get("/", (req, res) => {
  res.send("Welcome to Department Notice Board");
});

// Faculty page
app.get("/faculty", (req, res) => {
  res.json([
    "Dr. Kumar",
    "Dr. Priya",
    "Prof. Ravi",
    "Prof. Meena"
  ]);
});

// Get all notices
app.get("/api/notices", async (req, res) => {
  try {
    const notices = await Notice.find();

    res.json(notices);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch notices"
    });
  }
});

// Add a notice
app.post("/api/notices", async (req, res) => {
  try {
    const { title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        error: "Title and message are required"
      });
    }

    const notice = new Notice({
      title,
      message
    });

    const savedNotice = await notice.save();

    res.status(201).json(savedNotice);
  } catch (error) {
    res.status(500).json({
      error: "Failed to save notice"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});