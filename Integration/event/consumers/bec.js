// Basic Event Correlation --> Combine Multiple events outcome to state using an identifier
import EventEmitter from 'events';

const eventBus = new EventEmitter();
const state = {};

eventBus.on("user_registered", (user) => {
    state[user.id] = { registered: true };
});

eventBus.on("email_verified", (user) => {
    state[user.id].verified = true;
});

eventBus.on("subscription_created", (user) => {
    if (state[user.id]?.verified) {
        console.log("User fully onboarded:", user.id);
    }
});


