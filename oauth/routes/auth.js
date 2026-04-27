import express from "express";
import passport from "passport";

const router = express.Router();

// STEP 1: redirect to GitHub
router.get("/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

// STEP 2: callback
router.get("/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/"
    }),
    (req, res) => {
        // successful login
        res.redirect("/profile");
    }
);

// protected route
router.get("/profile", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send("Unauthorized");
    }

    res.json(req.user);
});

// logout
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

export default router;


