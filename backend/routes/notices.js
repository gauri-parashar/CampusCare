const express = require("express");
const router = express.Router();
const store = require("../data/store");

// GET /api/notices - fetch all notices
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        count: store.notices.length,
        data: store.notices
    });
});

// GET /api/notices/:id - fetch a single notice
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const notice = store.notices.find(n => n.id === id);

    if (!notice) {
        return res.status(404).json({
            success: false,
            message: `Notice with id ${id} not found`
        });
    }

    res.status(200).json({ success: true, data: notice });
});

// POST /api/notices - create a new notice
router.post("/", (req, res) => {
    const { title, content } = req.body;

    // Never trust the client — validate on the server
    if (!title || !content) {
        return res.status(400).json({
            success: false,
            message: "Both 'title' and 'content' are required"
        });
    }

    if (title.trim().length < 3) {
        return res.status(400).json({
            success: false,
            message: "Title must be at least 3 characters long"
        });
    }

    const newNotice = {
        id: store.getNextNoticeId(),
        title: title.trim(),
        content: content.trim(),
        date: new Date().toISOString().split("T")[0]
    };

    store.notices.push(newNotice);

    res.status(201).json({
        success: true,
        message: "Notice created successfully",
        data: newNotice
    });
});

// DELETE /api/notices/:id - delete a notice
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = store.notices.findIndex(n => n.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Notice with id ${id} not found`
        });
    }

    const deleted = store.notices.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Notice deleted successfully",
        data: deleted[0]
    });
});

module.exports = router;
