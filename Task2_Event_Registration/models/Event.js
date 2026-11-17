
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Event title is required"],
        trim: true,
        minlength: [3, "Title must be at least 3 characters long"]
    },

    description: {
        type: String,
        required: [true, "Event description is required"],
        trim: true
    },

    date: {
        type: Date,
        required: [true, "Event date is required"],
        validate: {
            validator: function(value) {
                return value > new Date();
            },
            message: "Event date must be in the future"
        }
    },

    location: {
        type: String,
        required: [true, "Event location is required"],
        trim: true
    },

    capacity: {
        type: Number,
        required: [true, "Event capacity is required"],
        min: [1, "Capacity must be at least 1"],
        validate: {
            validator: Number.isInteger,
            message: "Capacity must be a whole number"
        }
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Event", eventSchema);
