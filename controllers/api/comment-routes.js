const router = require('express').Router();
const { Comment } = require('../../models');

// GET all comments
router.get('/', async (req, res) => {
    try {
        const dbCommentData = await Comment.findAll({});
        if (dbCommentData) res.status(200).json(dbCommentData);
        else res.status(404).json({ message: 'No comments found' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE new comment
router.post('/', async (req, res) => {
    try {
        const dbCommentData = await Comment.create({
            text: req.body.text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });
        if (dbCommentData) res.status(201).json(dbCommentData);
        else res.status(500).json({ message: 'There was an error while creating the comment' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE comment by id
router.delete('/:id', async (req, res) => {
    try {
        const dbCommentData = await Comment.destroy({ where: { id: req.params.id } });
        if (dbCommentData) res.status(200).json(dbCommentData);
        else res.status(404).json({ message: 'No comment found with this id' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;