import express from "express";
import cookieParser from "cookie-parser";
import { sessionMiddleware } from "./config/session.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// 🔥 session middleware MUST come before routes
app.use(sessionMiddleware);

app.use("/auth", authRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});