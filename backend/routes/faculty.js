const express = require("express");
const router = express.Router();
const store = require("../data/store");

// GET /api/faculty - fetch faculty directory
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        count: store.faculty.length,
        data: store.faculty
    });
});

// GET /api/faculty/:id - fetch a single faculty member
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const member = store.faculty.find(f => f.id === id);

    if (!member) {
        return res.status(404).json({
            success: false,
            message: `Faculty with id ${id} not found`
        });
    }

    res.status(200).json({ success: true, data: member });
});

module.exports = router;
