const router = require('express').Router();
const { User, Post } = require('../models');

// GET all posts for a user
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: { user_id: req.session.user_id },
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [{
                model: User,
                attributes: ['username']
            }]
        });
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET create post page
router.get('/post/create', async (req, res) => {
    
});

// UPDATE post by id
router.put('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            { where: { id: req.params.id } }
        );
        if (dbPostData) res.status(201).json(dbPostData);
        else res.status(500).json({ message: 'There was an error while updating the post' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE post by id
router.delete('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.destroy({ where: { id: req.params.id } });
        if (dbPostData) res.status(200).json(dbPostData);
        else res.status(404).json({ message: 'No post found with this id' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;