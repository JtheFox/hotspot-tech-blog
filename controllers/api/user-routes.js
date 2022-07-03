const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
    try {
        const dbUserData = await User.findAll({
            attributes: {
                exclude: [
                    'email',
                    'password'
                ]
            },
            include: [
                {
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'created_at'
                    ]
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'text',
                        'created_at'
                    ],
                    include: {
                        model: Post,
                        attributes: [
                            'title'
                        ]
                    }
                }
            ]
        });
        if (dbUserData) res.status(200).json(dbUserData);
        else res.status(404).json({ message: 'No users found' });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// GET user by id
router.get('/:id', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            attributes: {
                exclude: [
                    'email',
                    'password'
                ]
            },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'created_at'
                    ]
                },
                {
                    model: Comment,
                    attributes: [
                        'id', 
                        'text', 
                        'created_at'
                    ],
                    include: {
                        model: Post,
                        attributes: [
                            'title'
                        ]
                    }
                }
            ]
        });
        if (dbUserData) res.status(200).json(dbUserData);
        else res.status(404).json({ message: 'No user found with this id' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE new user
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login
router.get('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res.status(400).json({ message: 'Invalid email or password.' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid email or password.' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            console.log(
                'User Logged In',
                req.session.cookie
            );
            res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// Logout
router.post('/', async (req, res) => {
    if (req.session.loggedIn) req.session.destroy(() => res.status(204).end());
    else res.status(404).end();
});

module.exports = router;