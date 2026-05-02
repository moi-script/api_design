// Broker Topology --> No central brain just broadcasting 


eventBus.emit("order_created", order);

eventBus.on("order_created", billingService);
eventBus.on("order_created", shippingService);


// Decentralized
// Highly scalable
// Harder to control flow