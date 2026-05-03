

// Webhooks --> are used for communication between servers

// Websocket --> are use for back to back communication for req and res



// Use a pub/sub system when you have multiple consumers interested in the same message or more than one message producer.
// Also, use a pub/sub system when you want to asynchronously process messages. Webhooks are synchronous.


// Webhooks vs Websockets

// Webhooks provide one-way, event-driven communication over HTTP — a source sends a request to your
//  endpoint when something happens. WebSockets provide two-way, persistent communication over a dedicated connection.
//   Use webhooks for server-to-server event notifications; use WebSockets for real-time bidirectional communication 
//   like chat or live dashboards.



// Webhook examples docs

// producer.js
// import express from "express";
// import fetch from "node-fetch";

// const app = express();
// app.use(express.json());

// const WEBHOOK_URL = "http://localhost:4000/webhook";

// // simulate user registration
// app.post("/register", async (req, res) => {
//     const user = req.body;

//     console.log("User registered:", user.name);

//     // send webhook
//     await fetch(WEBHOOK_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             event: "user_registered",
//             data: user
//         })
//     });

//     res.send("User registered + webhook sent");
// });

// app.listen(3000, () => {
//     console.log("Producer running on port 3000");
// });





// polling-server.js
import express from "express";

const app = express();
app.use(express.json());

let events = [];

// simulate event creation
app.post("/register", (req, res) => {
    const user = req.body;

    const event = {
        type: "user_registered",
        data: user,
        timestamp: Date.now()
    };

    events.push(event);

    res.send("User registered");
});

// client polls this
app.get("/events", (req, res) => {
    res.json(events);
});

app.listen(3000, () => {
    console.log("Polling server running on port 3000");
});


// // polling-client.js
// import fetch from "node-fetch";

// async function poll() {
//     const res = await fetch("http://localhost:3000/events");
//     const data = await res.json();

//     console.log("Fetched events:", data);
// }

// // poll every 3 seconds
// setInterval(poll, 3000); // looking every 3 seconds


    