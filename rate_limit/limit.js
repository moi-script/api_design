

const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// Create the rate limit rule
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: 'draft-7', // combined RateLimit header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: 429,
    message: "Too many requests. Please try again after 15 minutes."
  }
});

// Apply to all requests
app.use(apiLimiter);

// OR apply only to specific routes (e.g., your login or data fetch)
// app.use('/api/', apiLimiter);

app.get('/api/items', (req, res) => {
  res.send({ data: "Your paginated data here" });
});

app.listen(3000, () => console.log('Server running on port 3000'));



// npm install express-rate-limit rate-limit-redis redis


// const { RedisStore } = require('rate-limit-redis');
// const { createClient } = require('redis');

// // 1. Create a Redis client
// const client = createClient({ 
//   url: 'redis://localhost:6379' // Change to your Redis URL
// });

// client.connect().catch(console.error);

// // 2. Configure the Limiter to use Redis
// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   limit: 20, // 20 requests per minute
//   store: new RedisStore({
//     sendCommand: (...args) => client.sendCommand(args),
//   }),
// });

// app.use(limiter);