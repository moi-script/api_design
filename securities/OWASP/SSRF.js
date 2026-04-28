
// tricking my server into making http request that it is not supposed to 
// this can lead to data breach 
// access to internal network (private IP's)
// access to cloud metadata
// firewall bypass trust
// higher privileges than users

// all of this without alerting the server because it acts as valid process

//  “User controls URL → server makes request → internal systems exposed”

// Urls features 
// webhooks
// image upload via URL
// file import
// preview links
// SSO callbacks




// by creating a set of allowed domains

const ALLOWED_HOSTS = new Set([
  "images.example.com",
  "cdn.example.com",
]);

function isAllowedHost(urlStr) {
  const u = new URL(urlStr);
  return ALLOWED_HOSTS.has(u.hostname);
}



// AND checking a private IP' it should auto block

// import dns from "dns/promises";
// import net from "net";

function isPrivateIP(ip) {
  return (
    ip.startsWith("127.") ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("169.254.") ||
    (ip >= "172.16.0.0" && ip <= "172.31.255.255")
  );
}

async function resolveAndCheck(hostname) {
  const addrs = await dns.lookup(hostname, { all: true });
  return addrs.every(a => !isPrivateIP(a.address));
}



// Check specific allowed ports


const u = new URL(urlStr);

if (u.protocol !== "https:") throw new Error("Only HTTPS allowed");

const allowedPorts = new Set(["443"]);
if (u.port && !allowedPorts.has(u.port)) {
  throw new Error("Port not allowed");
}


// Disable directs

// await fetch(url, {
//   redirect: "manual"
// });



// Prevent returning raw response directly 

// ❌ risky
// res.send(await fetch(url).then(r => r.text()));



// Limit request size, time, and type
// Network-level protection (very strong)
// Separate “fetch service” (advanced pattern)


// All flow 
async function safeFetch(urlStr) {
  const u = new URL(urlStr);  // will create a url object means, {port, domain, scheme, etc..}

  if (u.protocol !== "https:") throw new Error("Invalid protocol"); // check the scheme from url object

  if (!ALLOWED_HOSTS.has(u.hostname)) { // check hostname
    throw new Error("Host not allowed");
  }

  // 3. DNS/IP check
  const ok = await resolveAndCheck(u.hostname);  // prevent private IP 
  if (!ok) throw new Error("Blocked internal IP");

  const res = await fetch(u.toString(), {
    redirect: "manual", // manual direction
    // add timeout via AbortController
  });

  // 5. Validate response
  const type = res.headers.get("content-type") || "";
  if (!type.startsWith("image/")) { // check the content type; to sanitize data value
    throw new Error("Invalid content type");
  }
  return res; // or processed data only
}


// if allow redirection 

// if (res.status >= 300 && res.status < 400) {
//   const location = res.headers.get("location");

//   const nextUrl = new URL(location, u); // resolve relative URLs

//   if (!isAllowed(nextUrl)) {
//     throw new Error("Redirect blocked");
//   }

//   // optionally follow manually
// }

// // 1. Validate original URL
// validateURL(u);

// // 2. Fetch without auto redirect
// const res = await fetch(u, { redirect: "manual" });

// // 3. Handle redirect safely
// if (isRedirect(res)) {
//   const next = getRedirectURL(res);

//   validateURL(next); // validate AGAIN

//   // optionally fetch again
// }














/// VULNERABLE TEST


import express from "express";

const app = express();
app.use(express.json());

// 🚨 VULNERABLE ENDPOINT
app.post("/fetch", async (req, res) => {
  try {
    const url = req.body.url;   // ❗ user controls this

    const response = await fetch(url); // ❗ server fetches it
    const data = await response.text();

    res.send(data); // ❗ sends raw response back
  } catch (err) {
    res.status(500).send("Error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


// attackers can control the url request, if they know the api structure it can easily return a raw reponse containing
// a sensitive data


// SAFE || PREVENTIONS 


import express from "express";
import dns from "dns/promises";

const app = express();
app.use(express.json());

const ALLOWED_HOSTS = ["example.com"];

function isPrivateIP(ip) {
  return (
    ip.startsWith("127.") ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("169.254.")
  );
}

app.post("/fetch", async (req, res) => {
  try {
    const url = new URL(req.body.url);

    //  Allowlist check
    if (!ALLOWED_HOSTS.includes(url.hostname)) {
      return res.status(400).send("Host not allowed");
    }

    //  DNS check
    const addresses = await dns.lookup(url.hostname, { all: true });
    for (const addr of addresses) {
      if (isPrivateIP(addr.address)) {
        return res.status(400).send("Blocked internal IP");
      }
    }

    const response = await fetch(url.toString(), {
      redirect: "manual"
    });

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return res.status(400).send("Invalid content type");
    }

    res.send(await response.text());

  } catch (err) {
    res.status(500).send("Error");
  }
});

app.listen(3000);