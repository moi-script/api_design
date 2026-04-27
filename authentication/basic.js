// Basic Auth;

// app.get('/admin', (req, res) => {
//     const auth = req.headers.authorization;
//     if (auth === 'Basic ' + Buffer.from('user:pass').toString('base64')) {
//         res.send("Welcome, Admin.");
//     } else {
//         res.set('WWW-Authenticate', 'Basic');
//         res.status(401).send("Authentication required.");
//     }
// });

// console.log(Buffer.from('user:pass').toString('base64'))

// Session Based

// const session = require('express-session');
// app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));

// app.post('/login', (req, res) => {
//     req.session.user = { id: 1, name: 'Alice' }; // Saved on server
//     res.send("Logged in!");
// });




// JWT 

const jwt = require('jsonwebtoken'); // jwt package

const token = jwt.sign({ userId: 123 }, 'secret_key', { expiresIn: '1h' });

// Middleware to verify
const auth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret_key');
    req.userId = decoded.userId;
    next();
};






// import express from "express";
// import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

// fake DB
const USER = {
    id: 1,
    username: "admin",
    password: "1234"
};

