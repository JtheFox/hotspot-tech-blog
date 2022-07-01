const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 2,
        text: 'I might have to look into this for my next project.'
    },
    {
        user_id: 1,
        post_id: 3,
        text: 'I have a friend who lost big from the crypto crash, very sad.'
    },
    {
        user_id: 2,
        post_id: 4,
        text: 'I\'ve been waiting to get an upgrade for my gaming rig, this is great news!'
    },
    {
        user_id: 2,
        post_id: 5,
        text: 'Honestly I don\'t feel worried at all.'
    },
    {
        user_id: 3,
        post_id: 1,
        text: 'Wow this looks really cool, I\'ll have to check it out!'
    },
    {
        user_id: 3,
        post_id: 2,
        text: 'I did some research on it but I think I\'ll be sticking with React'
    },
    {
        user_id: 4,
        post_id: 5,
        text: 'I avoid putting sensitive information online when I can, data breaches are a very big concern for me.'
    },
    {
        user_id: 5,
        post_id: 4,
        text: 'I just bought a new GPU a few months ago, wish I had held out a little longer!'
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;