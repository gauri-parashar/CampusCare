const express = require("express");
const cors = require("cors");

const noticesRouter = require("./routes/notices");
const contactRouter = require("./routes/contact");
const facultyRouter = require("./routes/faculty");
const attendanceRouter = require("./routes/attendance");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());            // allows your frontend (different origin) to call this API
app.use(express.json());   // parses incoming JSON request bodies

// Simple request logger - helpful during your demo/viva
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

// Root route - quick health check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CampusCare API is running",
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

// 404 handler - for any route that doesn't exist
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Global error handler - catches unexpected server-side errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong on the server"
    });
});

app.listen(PORT, () => {
    console.log(`✅ CampusCare backend running at http://localhost:${PORT}`);
});
