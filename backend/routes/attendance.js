const express = require("express");
const router = express.Router();
const store = require("../data/store");

// GET /api/attendance/:studentId - fetch attendance for one student
router.get("/:studentId", (req, res) => {
    const { studentId } = req.params;
    const records = store.attendanceRecords.filter(r => r.studentId === studentId);

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
});

// POST /api/attendance - mark attendance for a student
router.post("/", (req, res) => {
    const { studentId, date, status } = req.body;

    if (!studentId || !date || !status) {
        return res.status(400).json({
            success: false,
            message: "'studentId', 'date' and 'status' are all required"
        });
    }

    if (!["present", "absent"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "'status' must be either 'present' or 'absent'"
        });
    }

    const record = { studentId, date, status };
    store.attendanceRecords.push(record);

    res.status(201).json({
        success: true,
        message: "Attendance marked successfully",
        data: record
    });
});

module.exports = router;
