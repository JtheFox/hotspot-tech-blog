const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET all posts
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                },
            ]
        });
        if (dbPostData) res.status(200).json(dbPostData);
        else res.status(404).json({ message: 'No posts found' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET post by id
router.get('/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                },
            ]
        });
        if (dbPostData) res.status(200).json(dbPostData);
        else res.status(404).json({ message: 'No  found with this id' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE new post
router.post('/', async (req, res) => {
    try {
        const dbPostData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        if (dbPostData) res.status(201).json(dbPostData);
        else res.status(500).json({ message: 'There was an error while creating the post' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;