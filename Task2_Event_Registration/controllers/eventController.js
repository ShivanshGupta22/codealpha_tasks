
const Event = require("../models/Event");

// Create a new event
const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, capacity } = req.body;

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            capacity
        });

        const savedEvent = await newEvent.save();

        res.status(201).json({
            message: "Event created successfully",
            event: savedEvent
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();

        res.status(200).json({
            message: "Events fetched successfully",
            events
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get a single event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event fetched successfully",
            event
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid event ID"
        });
    }
};

// Update an event
const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);

        if (!deletedEvent) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event deleted successfully",
            event: deletedEvent
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid event ID"
        });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};
