// Event Stream  Processing --> “Transform a continuous stream (pipeline style)”

// input -> transform -> output

const stream = [
    { type: "order", amount: 100 },
    { type: "order", amount: 200 }
];

// pipeline
const processed = stream
    .filter(e => e.type === "order") 
    .map(e => ({
        ...e,
        tax: e.amount * 0.1
    }));

console.log(processed);