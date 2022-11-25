const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.use('/contacts', require('./api/contacts'));
router.use('/auth', require('./api/auth'));

router.get('/', authController.isAuthenticated, (req, res) => {
    res.send('wenas');
});

module.exports = router;

