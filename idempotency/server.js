const express = require('express');
const app = express();
app.use(express.json());

// In production, use Redis with a TTL (Time To Live)
const idempotencyStore = new Map();


const idempotencyMiddleware = (req, res, next) => {
  

    const key = req.headers['idempotency-key']; // exxisted header ? 

    // 1. Skip if no key is provided (though in critical APIs, you should require it)
    if (!key) return next();

    // 2. Check if we have processed this key before
    if (idempotencyStore.has(key)) { // check the key
        console.log(`[Idempotency] Match found for key: ${key}. Returning cached response.`);
        const cachedResponse = idempotencyStore.get(key); // cache key
        return res.status(cachedResponse.status).json(cachedResponse.body);
    }

    // 3. If not, "hijack" res.json to store the result before sending it
    const originalJson = res.json;
    res.json = function (body) {
        idempotencyStore.set(key, {
            status: res.statusCode,
            body: body
        });
        return originalJson.call(this, body); // append to the previous json value
    };

    next(); // next middleware calll
};

// Apply to a "POST" route (e.g., creating an order)
app.post('/api/orders', idempotencyMiddleware, (req, res) => {
    console.log("Processing a brand new order...");

    // Simulate database work
    const newOrder = {
        id: Math.floor(Math.random() * 1000),
        item: req.body.item,
        status: "Confirmed",
        timestamp: new Date()
    };

    res.status(201).json(newOrder);
});




app.listen(3000, () => console.log('Server running with Idempotency support on port 3000'));