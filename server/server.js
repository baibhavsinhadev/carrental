import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import cookieParser from "cookie-parser";

import limiter from "./middleware/limiter.js";

import connectDB from "./configs/mongoDB.js";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

/* Security Headers */
app.use(helmet());

/* Body Parser */
app.use(express.json({ limit: "10kb" }));

/* Prevent HTTP Parameter Pollution */
app.use(hpp());

/* Compression */
app.use(compression());

/* Cookie Parser */
app.use(cookieParser());

/* Rate Limiting */
app.use("/api", limiter);

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

// Database & External Configuration
await connectDB();

/* Hide Express Signature */
app.disable("x-powered-by");

/* Routes */
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is live"
    });
});

/* API Routes */
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/booking', bookingRouter);

/* 404 Handler */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

/* Global Error Handler */
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});