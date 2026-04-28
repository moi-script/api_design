
// DEMO

// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     email TEXT UNIQUE NOT NULL,
//     username TEXT UNIQUE,
//     password_hash TEXT NOT NULL,
//     role TEXT DEFAULT 'user',
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// id → internal identifier (never trust client with it)
// password_hash → NEVER store raw password


// npm install bcrypt
// import bcrypt from 'bcrypt';
// const hash = await bcrypt.hash(password, 12);
// const isValid = await bcrypt.compare(password, user.password_hash);





// Login Authentication 

import jwt from 'jsonwebtoken';

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await db.getUserByEmail(email);

    // generic response (OWASP)
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );

    res.json({ accessToken });
});


// where it becomes trusted
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.userId,
            role: decoded.role
        };

        next();
    } catch {
        return res.sendStatus(403);
    }
}

app.get('/api/me/profile', authMiddleware, async (req, res) => {
    const user = await db.getUserById(req.user.id);

    res.json({
        id: user.id,
        email: user.email,
        username: user.username
    });
});


// BOLA fix
app.get('/api/posts/:id', authMiddleware, async (req, res) => {
    const post = await db.getPostById(req.params.id);

    if (!post) return res.sendStatus(404);

    if (post.owner_id !== req.user.id) {
        return res.sendStatus(403);
    }

    res.json(post);
});

// Suggested Query from SQL
// const post = await db.query(
//     'SELECT * FROM posts WHERE id = $1 AND owner_id = $2',
//     [req.params.id, req.user.id]
// );

// if (!post.rows.length) {
//     return res.sendStatus(404);
// }








// RBAC


function requireRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.sendStatus(403);
        }
        next();
    };
}


app.delete('/api/users/:id', authMiddleware, requireRole('admin'), async (req, res) => {
    await db.deleteUser(req.params.id);
    res.sendStatus(204);
});


// --> Best  Cookie + Session + JWT + other methods 



