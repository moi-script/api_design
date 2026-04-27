import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";

import "./config/passport.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send(`<a href="/auth/github">Login with GitHub</a>`);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});