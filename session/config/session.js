import session from "express-session";

export const sessionMiddleware = session({
    name: "sid", // cookie name
    secret: "super-secret-key", // use env in real apps
    resave: false,
    saveUninitialized: false,

    cookie: {
        httpOnly: true, // JS cannot access it (XSS protection)
        secure: false,  // true in HTTPS
        maxAge: 1000 * 60 * 60 // 1 hour
    }
});


