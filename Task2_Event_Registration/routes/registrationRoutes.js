
const express = require("express");
const router = express.Router();

const {
    registerParticipant,
    getEventRegistrations
} = require("../controllers/registrationController");

// Register a participant
router.post("/:eventId", registerParticipant);

// Get all registrations for an event
router.get("/:eventId", getEventRegistrations);

module.exports = router;
