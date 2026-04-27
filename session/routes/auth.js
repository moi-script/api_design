import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

// fake DB
const USER = {
    id: 1,
    username: "admin",
    password: "1234"
};

// LOGIN
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username !== USER.username || password !== USER.password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔥 create session
    req.session.user = {
        id: USER.id,
        username: USER.username
    };

    res.json({ message: "Logged in" });
});

// PROTECTED ROUTE
router.get("/profile", isAuthenticated, (req, res) => {
    res.json({
        message: "Protected data",
        user: req.session.user
    });
});




// LOGOUT
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }

        res.clearCookie("sid");
        res.json({ message: "Logged out" });
    });
});

export default router;