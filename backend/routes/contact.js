const express = require("express");
const router = express.Router();
const store = require("../data/store");

// Basic email format check (not bulletproof, but fine for a college project)
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// POST /api/contact - handle contact form submission
router.post("/", (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields (name, email, subject, message) are required"
        });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address"
        });
    }

    const newMessage = {
        id: store.getNextContactId(),
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        receivedAt: new Date().toISOString()
    };

    store.contactMessages.push(newMessage);

    res.status(201).json({
        success: true,
        message: "Your message has been received. We'll get back to you soon!",
        data: newMessage
    });
});

// GET /api/contact - view all submitted messages (e.g. for an admin view)
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        count: store.contactMessages.length,
        data: store.contactMessages
    });
});

module.exports = router;
