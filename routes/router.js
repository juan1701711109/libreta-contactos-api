const express = require('express');
const router = express.Router();

router.use('/contacts', require('./api/contacts'));

router.get('/', (req, res) => {
    res.send('wenas');
})

router.get('/login', (req, res) => {
    res.send('login');
})

router.get('/register', (req, res) => {
    res.send('register');
})

module.exports = router;

