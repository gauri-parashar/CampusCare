// Run this ONCE with `node data/seed.js` to populate your empty database
// with some starter data, so your frontend has something to show immediately.

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Notice = require("../models/Notice");
const Faculty = require("../models/Faculty");
const Attendance = require("../models/Attendance");

async function seed() {
    await connectDB();

    // Clear existing data first so re-running this doesn't create duplicates
    await Notice.deleteMany({});
    await Faculty.deleteMany({});
    await Attendance.deleteMany({});

    await Notice.insertMany([
        {
            title: "Mid-Semester Exam Schedule Released",
            content: "Check the notice board for your exam dates and hall allotment."
        },
        {
            title: "Annual Tech Fest Registration Open",
            content: "Register your team before July 20 to participate in TechFest 2026."
        },
        {
            title: "Library Timings Extended",
            content: "Library will now stay open till 9 PM on weekdays during exam season."
        }
    ]);

    await Faculty.insertMany([
        { name: "Dr. Durga Puja", department: "Computer Science", designation: "Head of the Department" },
        { name: "Dr. Vinay Agrawal", department: "Electronics", designation: "Head of the Department" },
        { name: "Dr. Shivam Agrawal", department: "Mechanical", designation: "Head of the Department" },
        { name: "Dr. Deepak Parashar", department: "Electrical", designation: "Head of the Department" }
    ]);

    await Attendance.insertMany([
        { studentId: "S101", date: "2026-07-07", status: "present" },
        { studentId: "S101", date: "2026-07-06", status: "absent" },
        { studentId: "S102", date: "2026-07-07", status: "present" }
    ]);

    console.log("🌱 Database seeded successfully!");
    await mongoose.connection.close();
    process.exit(0);
}

seed().catch(err => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
