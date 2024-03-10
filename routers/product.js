const express = require('express');
const router = express.Router();

const product = require('../controllers/product');

router.post('/createproduct', product.createProduct);
router.get('/getproducts', product.getProducts);
router.post('/updateproduct', product.updateProduct);
router.post('/deleteproduct', product.deleteProduct);


module.exports = router;