
// Import required packages
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Create Express application
const app = express();

// Middleware to read JSON data
app.use(express.json());
const eventRoutes = require("./routes/eventRoutes");
app.use("/api/events", eventRoutes);

const registrationRoutes = require("./routes/registrationRoutes");
app.use("/api/registrations", registrationRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Event Registration System Backend is Running!");
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });
