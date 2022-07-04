const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new comment
router.post('/', withAuth, async (req, res) => {
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

module.exports = router;