const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,   // stored as "YYYY-MM-DD" string for simplicity
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["present", "absent"]   // this is the CHECK constraint equivalent
    }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
