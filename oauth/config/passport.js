import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
},
(accessToken, refreshToken, profile, done) => {
    // 🔥 This is where you handle user
    // Save to DB or find existing

    const user = {
        id: profile.id,
        username: profile.username
    };

    return done(null, user);
}));

// store user in session
passport.serializeUser((user, done) => {
    done(null, user);
});

// retrieve user from session
passport.deserializeUser((user, done) => {
    done(null, user);
});