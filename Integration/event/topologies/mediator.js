
// Mediator Topology --> Orchestration 
// One central controller decides everyting 
eventBus.on("order_created", async (order) => {
    await processPayment(order);
    await arrangeShipping(order);

});


