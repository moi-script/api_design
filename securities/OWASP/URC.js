
// Unrestricted Resource Consumption --> To Protect Our 

// CPU
// Memory
// Network bandwidth
// Storage
// External APIs (SMS, email, payments, etc.)



// Rate limiting

import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100 // 100 requests per minute
});

app.use(limiter);




// Payload limits

app.use(express.json({ limit: '1mb' }));

// File upload limits

fileSize: 5 * 1024 * 1024 // 5MB



// Pagination Limit

const limit = Math.min(req.query.limit || 10, 50);


// Timeout limit 

// --> DB timeout
// --> API timeout
// --> Worker tiemout

// Every API should have 

// 1. Input validation

// “What data is allowed?”

// 2. Size limits

// “How big can it be?”

// 3. Rate limits

// “How often can it happen?”

// 4. Cost limits

// “How expensive can it get?”

// 5. Business rules

// “Is this action even allowed?”


