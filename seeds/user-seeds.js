const { User } = require('../models');

const userData = [
    {
        username: 'John_Doe',
        email: 'johndoe55@email.com',
        password: 'Password!'
    },
    {
        username: 'Jane_Doe',
        email: 'janedoe44@email.com',
        password: 'pAssword?'
    },
    {
        username: 'Steph_Sutton',
        email: 'stephsutt@email.com',
        password: 'paSsword.'
    },
    {
        username: 'Shirley_Cope',
        email: 'shircope006@email.com',
        password: 'pasSword,'
    },
    {
        username: 'Rodger_Vincent',
        email: 'rvincent1969@email.com',
        password: 'passWord;'
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;