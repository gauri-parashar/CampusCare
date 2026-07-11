const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model("Faculty", facultySchema);
