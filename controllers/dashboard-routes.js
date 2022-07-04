const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for a user
router.get('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: { user_id: req.session.user_id },
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [{
                model: User,
                attributes: ['username']
            }],
            order: [['updatedAt', 'DESC']]
        });
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET create post page
router.get('/post', withAuth, async (req, res) => {
    const post = { title: '', content: '' }
    res.render('edit-post', { post, newPost: true });
});

// CREATE new post
router.post('/post', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        const post = dbPostData.get({ plain: true });
        if (dbPostData) res.status(201).json({ id: post.id });
        else res.status(500).json({ message: 'There was an error while creating the post' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET edit post page by id
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['title', 'content']
        });
        if (!dbPostData) {
            res.status(404).json({ message: 'Post not found with this id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', { post, newPost: false });
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE one post
router.put('/post/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            { where: { id: req.params.id } }
        );
        if (dbPostData) res.status(201).json({ id: req.params.id });
        else res.status(500).json({ message: 'There was an error while updating the post' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE one post
router.delete('/post/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.destroy({ where: { id: req.params.id } });
        if (dbPostData) res.status(200).json(dbPostData);
        else res.status(404).json({ message: 'No post found with this id' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;