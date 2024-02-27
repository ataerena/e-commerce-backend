const express = require('express');
const router = express.Router();

const users = require('../controllers/users');

router.post('/createuser', users.createUser);
router.post('/loginuser', users.loginUser);


module.exports = router;