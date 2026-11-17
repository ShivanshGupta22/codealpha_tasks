
const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({

    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: [true, "Event ID is required"]
    },

    participantName: {
        type: String,
        required: [true, "Participant name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address"
        ]
    },

    registeredAt: {
        type: Date,
        default: Date.now
    }

});

// Prevent duplicate registration for the same event
registrationSchema.index(
    { eventId: 1, email: 1 },
    { unique: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
