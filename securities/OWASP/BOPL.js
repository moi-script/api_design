
// we filter a certain property to update
// must prevent mass update

app.put('/api/posts/:id', async (req, res) => {
    const post = await db.getPostById(req.params.id);

    if (post.ownerId !== req.user.id) {
        return res.sendStatus(403);
    }

    const { title, content } = req.body;

    await db.updatePost(req.params.id, {
        title, // here
        content // here
    });

    res.sendStatus(200);
});



// create user Data Transfer Object
function mapUserToDTO(user) {
    return {
        id: user.id,
        email: user.email
    };
}

// props validation (Zod package)
const updateSchema = z.object({
  username: z.string().min(3)
});

