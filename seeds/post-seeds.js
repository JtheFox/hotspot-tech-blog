const { Post } = require('../models');

const postData = [
    {
        title: 'A "Fresh" New Web Framework',
        content: 'Fresh is a next generation web framework, built for speed, reliability, and simplicity. This framework was created by the developer of NodeJS as a progressive take on server side rendering.',
        user_id: 1
    },
    {
        title: 'The "Nuxt" Big Thing?',
        content: 'Nuxt is a framework for creating Vue applications. Vue is considered a React alternative, but is it better?',
        user_id: 2
    },
    {
        title: 'Crypto Bubble Bursts',
        content: 'Recent events have caused a massive instability and crash in the crypto market. This has obviously directly affected those invested in crypto, but how does it impact other areas of tech?',
        user_id: 3
    },
    {
        title: 'GPU Prices Finally Stabilizing',
        content: 'Due to the crypto crash, GPU prices have begun to normalize after a long period of shortages and high prices. Now is a good time to get that upgrade for your rig.',
        user_id: 4
    },
    {
        title: 'The Security Threat: Should You Be Worried?',
        content: 'Hackers are always evolving their methodology and imporoving their proficiency in breaching secure data, especially belonging to large corporations. Do you feel worried about your data being breached?',
        user_id: 5
    }    
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;