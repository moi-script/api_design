// Simple Event Processing -> event  immediate action 

eventBus.on("user_registered", (user) => {
    sendWelcomeEmail(user);
});