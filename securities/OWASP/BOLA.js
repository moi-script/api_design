// -- Broken Object Level detection 


// Broken Object Level Authorization (BOLA)

// Attackers can exploit API endpoints that are vulnerable to broken object-level authorization by manipulating the ID of 
// an object that is sent within the request. Object IDs can be anything from sequential integers, UUIDs, or generic strings. 
// Regardless of the data type, they are easy to identify in the request target 
// (path or query string parameters), request headers, or even as part of the request payload.



// This issue is extremely common in API-based applications because the server component usually does not fully track the 
// client’s state, and instead, relies more on parameters like object IDs, that are sent from the client to decide which
//  objects to access.The server response is usually enough to understand whether the request was successful.


// Unauthorized access to other users’ objects can result in data disclosure to unauthorized parties,
//  data loss, or data manipulation. Under certain circumstances,
//  unauthorized access to objects can also lead to full account takeover.



app.get('/api/users/:id/profile', async (req, res) => {
    const loggedInUserId = req.user.id; // from JWT/session

    if (req.params.id !== loggedInUserId) {
        return res.status(403).json({ error: "Forbidden" });
    }

    const user = await db.getUserById(loggedInUserId);
    res.json(user);
});

// no RBAC
//  Authorization logic
// No validation / normalization
// No data filtering
// No consistent error handling


function canAccessUser(req, targetUserId) {
    const user = req.user;

    if (user.role === 'admin') return true;
    if (user.id === targetUserId) return true;

    return false;
}


const targetId = parseInt(req.params.id, 10);
if (isNaN(targetId)) {
    return res.status(400).json({ error: "Invalid ID" });
}


function sanitizeUser(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email
        // exclude sensitive fields
    };
}

app.get('/api/users/:id/profile', async (req, res) => {
    const targetId = Number(req.params.id);

    if (!canAccessUser(req, targetId)) {
        return res.status(403).json({ error: "Forbidden" });
    }

    const user = await db.getUserById(targetId);
    res.json(sanitizeUser(user));
});





