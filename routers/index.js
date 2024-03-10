const express = require('express');
const router = express.Router();


const users = require('./users');
const product = require('./product');


router.use('/users', users);
router.use('/product', product);



module.exports = router;