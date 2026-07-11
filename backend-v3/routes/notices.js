const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");

// GET /api/notices - fetch all notices from the database
router.get("/", async (req, res) => {
    try {
        const notices = await Notice.find().sort({ date: -1 });
        res.status(200).json({
            success: true,
            count: notices.length,
            data: notices
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error while fetching notices" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        if (!notice) {
            return res.status(404).json({ success: false, message: "Notice not found" });
        }
        res.status(200).json({ success: true, data: notice });
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid notice id" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Both 'title' and 'content' are required"
            });
        }
        const newNotice = await Notice.create({ title, content });
        res.status(201).json({
            success: true,
            message: "Notice created successfully",
            data: newNotice
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Notice.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Notice not found" });
        }
        res.status(200).json({
            success: true,
            message: "Notice deleted successfully",
            data: deleted
        });
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid notice id" });
    }
});

module.exports = router;