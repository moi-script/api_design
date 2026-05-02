// eventBus.on("user_registered", sendWelcomeEmail);
// eventBus.on("user_registered", createProfile);

function sendWelcomeEmail() {
    console.log("Send Welcome Email");
}


function createProfile() {
    console.log("createProfile");
}


function logAnalytics() {
    console.log("logAnalytics");
}


function eventTriggers (fns) {
    for(let i =0; i<fns.length; i++) {
        fns[i]();
    }
}

eventBus.on("user_registered", eventTriggers([sendWelcomeEmail, createProfile, logAnalytics])); // not EDA anymore it has central control




