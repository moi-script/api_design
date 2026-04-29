// Unsafe Consumption of API's


// By Trusting Blindly the external API (Consuming wihout data validation and using directly)
// We can inherit it vulnerabilities


// Ways of Unsafety

// No HTTPS unencrypted channel
fetch("http://external-api.com/data")
// attacker can intercept / modify response
// inject malicious data


// NO validation external data
const data = await fetchExternalAPI();
db.insert(data.name);

// if it returns soemthing like this 
// { "name": "'; DROP TABLE users; --" } --> Injection attacks


// Blindly following redirects
// 308 Redirect → http://attacker.com
// You send sensitive data to attacker



// No timeouts / limits
// await fetch(externalAPI)
// can leads -> slow reponse, huge response, infinite hang -> can cause server exhaustion, denial of service


// No resource limits
// { "data": "10GB string..." }
// memory crash / overload




// TO prevents 

// Treat all external data as untrusted

// Google API
// Stripe
// Internal Microservice
// etc always validate it


// Always validate schema
if (typeof data.name !== "string") throw Error();
if (data.name.length > 100) throw Error();

// Suggestions 
// use schema validation (Zod, Joi, etc.)


// Never blindly follow redirects
fetch(url, { redirect: "manual" });



// Add timeouts
const controller = new AbortController();
setTimeout(() => controller.abort(), 3000);


// Allowlist external API's 

// const ALLOWED = ["api.stripe.com", "maps.googleapis.com"];



// Sanitize before DB usage

// never do the 
db.query(`INSERT ${data.name}`);

