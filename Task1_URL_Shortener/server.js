require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Url = require("./models/Url");
const crypto = require("crypto");

const app = express();

app.use(express.json());

const PORT = 3000;

// Home route
app.get("/", (req, res) => {
    res.send("URL Shortener Backend is Running!");
});

// Test POST API

app.post("/api/shorten", async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                message: "Please provide a URL"
            });
        }

        const parsedUrl = new URL(originalUrl);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            return res.status(400).json({
                message: "Only HTTP and HTTPS URLs are allowed"
            });
        }

        let shortCode;
        let existingUrl;

        do {
            shortCode = crypto.randomBytes(3).toString("hex");
            existingUrl = await Url.findOne({ shortCode });
        } while (existingUrl);

        const newUrl = new Url({
            originalUrl: originalUrl,
            shortCode: shortCode
        });

        await newUrl.save();

        res.status(201).json({
            message: "Short URL created successfully",
            originalUrl: newUrl.originalUrl,
            shortCode: newUrl.shortCode,
            shortUrl: `http://localhost:${PORT}/${shortCode}`
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid URL or could not create short URL"
        });
    }
});


app.get("/:shortCode", async (req, res) => {
    try {
        const shortCode = req.params.shortCode;

        const url = await Url.findOne({
            shortCode: shortCode
        });

        if (!url) {
            return res.status(404).json({
                message: "Short URL not found"
            });
        }

        res.redirect(url.originalUrl);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

// Connect to MongoDB
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log("MongoDB connection failed:", error.message);
    }
};

startServer();