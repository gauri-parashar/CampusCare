const mongoose = require("mongoose");

// This is the "blueprint" for every notice document stored in MongoDB.
const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],   // NOT NULL equivalent
        trim: true,
        minlength: [3, "Title must be at least 3 characters long"]
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true
    },
    date: {
        type: Date,
        default: Date.now   // automatically fills today's date if not given
    }
});

// mongoose automatically creates a "notices" collection for this model
module.exports = mongoose.model("Notice", noticeSchema);
