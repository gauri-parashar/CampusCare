const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

router.get("/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        const records = await Attendance.find({ studentId });

        if (records.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No attendance records found for student ${studentId}`
            });
        }

        const presentCount = records.filter(r => r.status === "present").length;
        const percentage = ((presentCount / records.length) * 100).toFixed(1);

        res.status(200).json({
            success: true,
            studentId,
            totalClasses: records.length,
            present: presentCount,
            attendancePercentage: Number(percentage),
            data: records
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error while fetching attendance" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { studentId, date, status } = req.body;
        if (!studentId || !date || !status) {
            return res.status(400).json({
                success: false,
                message: "'studentId', 'date' and 'status' are all required"
            });
        }
        const record = await Attendance.create({ studentId, date, status });
        res.status(201).json({
            success: true,
            message: "Attendance marked successfully",
            data: record
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;