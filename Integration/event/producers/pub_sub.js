// Publish Subscribe 

import EventEmitter from "events";

const eventBus = new EventEmitter();

// consumers
eventBus.on("user_registered", (user) => {
    console.log("Send email to", user.name);
});

eventBus.on("user_registered", (user) => {
    console.log("Log analytics for", user.name);
});

// producer
function registerUser(user) {
    console.log("User saved:", user.name);
    eventBus.emit("user_registered", user);
}

registerUser({ name: "Moises" });

// Consumers subscribe
// Event is pushed
// No history (usually)
// Fire-and-forget


