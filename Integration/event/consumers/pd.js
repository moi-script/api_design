// Payload Design -> it had large or single payload data


// triggers many data -> faster processing, NO DB query
eventBus.emit("user_registered", {
    id: 1,
    name: "Moises",
    email: "m@example.com"
});



eventBus.emit("user_registered", {
    userId: 1
});

eventBus.on("user_registered", async ({ userId }) => {
    const user = await db.getUser(userId); // if using DB it hurts DB performance 
});




