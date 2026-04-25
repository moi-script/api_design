async function placeOrder() {
    // 1. Generate a unique key for THIS specific order attempt
    const idempotencyKey = "order-xyz-789"; 

    const makeRequest = async () => {
        return fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Idempotency-Key': idempotencyKey
            },
            body: JSON.stringify({ item: "Gaming Laptop" })
        });
    };

    // Simulate 3 immediate attempts (e.g., user clicking fast or a network retry loop)
    console.log("Attempting to place order 3 times...");
    
    const results = await Promise.all([
        makeRequest(),
        makeRequest(),
        makeRequest() // relying from the key which means it will get the cache from the redis
    ]);

    for (let res of results) {
        const data = await res.json();
        console.log(`Status: ${res.status} | Order ID: ${data.id}`);
    }
}

placeOrder();