require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const noticesRouter = require("./routes/notices");
const contactRouter = require("./routes/contact");
const facultyRouter = require("./routes/faculty");
const attendanceRouter = require("./routes/attendance");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

// Root route - quick health check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CampusCare API is running (connected to MongoDB)",
        endpoints: [
            "GET    /api/notices",
            "GET    /api/notices/:id",
            "POST   /api/notices",
            "DELETE /api/notices/:id",
            "GET    /api/faculty",
            "GET    /api/faculty/:id",
            "GET    /api/attendance/:studentId",
            "POST   /api/attendance",
            "GET    /api/contact",
            "POST   /api/contact"
        ]
    });
});

// Mount routers
app.use("/api/notices", noticesRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/contact", contactRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong on the server"
    });
});

// Connect to the database FIRST, then start listening for requests.
// This way the server never accepts traffic before the DB is ready.
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ CampusCare backend running at http://localhost:${PORT}`);
    });
});
