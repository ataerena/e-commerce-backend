const express = require('express');
const router = express.Router();

const hello = require('../controllers/hello');

router.get('/helloworld', hello.HelloWorld);

module.exports = router;