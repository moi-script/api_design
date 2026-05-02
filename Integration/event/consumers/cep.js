// Complex Event Processing (CEP) --> “Detect patterns across events over time”


// Usefull for retries 
const failedLogins = [];

eventBus.on("login_failed", (event) => {
    failedLogins.push(Date.now());

    const recent = failedLogins.filter(
        t => Date.now() - t < 10000
    );

    if (recent.length >= 5) {
        console.log("⚠️ Possible attack detected");
    }
});