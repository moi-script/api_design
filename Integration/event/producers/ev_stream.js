// Event Streaming --> events are stored as continous stream


// Consumers don’t subscribe in real-time necessarily
// They can replay events
// Events are stored (log-based)


const eventStream = [];

function produceEvent(event) {
    eventStream.push(event);
}

// consumer can replay
function processStream() {
    for (const event of eventStream) {
        console.log("Processing:", event);
    }
}

produceEvent({ type: "user_registered", name: "Moises" });
produceEvent({ type: "order_created", id: 1 });

processStream();

// events persist, not just trigger.