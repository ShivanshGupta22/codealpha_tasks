
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const mongoose = require("mongoose");

// Register a participant for an event
const registerParticipant = async (req, res) => {
    try {
        const { participantName, email } = req.body;
        const { eventId } = req.params;

        // Check whether event ID is valid
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                message: "Invalid event ID"
            });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const existingRegistration = await Registration.findOne({
            eventId,
            email
        });

        if (existingRegistration) {
            return res.status(400).json({
                message: "You are already registered for this event"
            });
        }

        const totalRegistrations = await Registration.countDocuments({
            eventId
        });

        if (totalRegistrations >= event.capacity) {
            return res.status(400).json({
                message: "Event is full. Registration closed"
            });
        }

        const newRegistration = new Registration({
            eventId,
            participantName,
            email
        });

        const savedRegistration = await newRegistration.save();

        res.status(201).json({
            message: "Participant registered successfully",
            registration: savedRegistration
        });

    } catch (error) {

        // Handle duplicate registration
        if (error.code === 11000) {
            return res.status(400).json({
                message: "You are already registered for this event"
            });
        }

        res.status(400).json({
            message: error.message
        });
    }
};

// Get all registrations for an event
const getEventRegistrations = async (req, res) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const registrations = await Registration.find({
            eventId
        });

        res.status(200).json({
            message: "Registrations fetched successfully",
            totalRegistrations: registrations.length,
            registrations
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid event ID"
        });
    }
};

module.exports = {
    registerParticipant,
    getEventRegistrations
};
