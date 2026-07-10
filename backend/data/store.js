// In-memory "database" for CampusCare.
// Data resets every time the server restarts — that's expected for Project 2.
// This can be swapped for MongoDB/MySQL later without changing the route logic much.

let notices = [
    {
        id: 1,
        title: "Mid-Semester Exam Schedule Released",
        content: "Check the notice board for your exam dates and hall allotment.",
        date: "2026-07-01"
    },
    {
        id: 2,
        title: "Annual Tech Fest Registration Open",
        content: "Register your team before July 20 to participate in TechFest 2026.",
        date: "2026-07-05"
    },
    {
        id: 3,
        title: "Library Timings Extended",
        content: "Library will now stay open till 9 PM on weekdays during exam season.",
        date: "2026-07-07"
    }
];

let nextNoticeId = 4;

const faculty = [
    { id: 1, name: "Dr. Durga Puja", department: "Computer Science", designation: "Head of the Department" },
    { id: 2, name: "Dr. Vinay Agrawal", department: "Electronics", designation: "Head of the Department" },
    { id: 3, name: "Dr. Shivam Agrawal", department: "Mechanical", designation: "Head of the Department" },
    { id: 4, name: "Dr. Deepak Parashar", department: "Electrical", designation: "Head of the Department" }
];

let attendanceRecords = [
    { studentId: "S101", date: "2026-07-07", status: "present" },
    { studentId: "S101", date: "2026-07-06", status: "absent" },
    { studentId: "S102", date: "2026-07-07", status: "present" }
];

let contactMessages = [];
let nextContactId = 1;

module.exports = {
    notices,
    getNextNoticeId: () => nextNoticeId++,
    faculty,
    attendanceRecords,
    contactMessages,
    getNextContactId: () => nextContactId++
};
