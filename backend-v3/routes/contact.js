const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/Contact");

router.post("/", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, email, subject, message) are required"
            });
        }
        const newMessage = await ContactMessage.create({ name, email, subject, message });
        res.status(201).json({
            success: true,
            message: "Your message has been received. We'll get back to you soon!",
            data: newMessage
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ receivedAt: -1 });
        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error while fetching messages" });
    }
});

module.exports = router;