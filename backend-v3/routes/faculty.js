const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");

router.get("/", async (req, res) => {
    try {
        const faculty = await Faculty.find();
        res.status(200).json({
            success: true,
            count: faculty.length,
            data: faculty
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error while fetching faculty" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const member = await Faculty.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ success: false, message: "Faculty member not found" });
        }
        res.status(200).json({ success: true, data: member });
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid faculty id" });
    }
});

module.exports = router;