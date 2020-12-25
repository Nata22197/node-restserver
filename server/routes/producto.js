const express = require('express');
const ProductController = require('../controllers/producto');
const { verifyToken } = require('../middlewares/authentication');
const { verifyRole } = require('../middlewares/verifyRole');
const router = express.Router();

// ===============
// MOSTRAR TODAS LOS PRODUCTOS
// ===============
router.get('/productos', verifyToken, ProductController.getProducts);

// ===============
// MOSTRAR UNA PRODUCTO POR ID
// ===============
router.get('/producto/:id', verifyToken, ProductController.getProductById);

// ===============
// CREAR un PRODUCTO
// ===============
router.post('/producto', verifyToken, ProductController.saveProduct);

// ===============
// ACTUALIZAR un PRODUCTO
// ===============
router.put('/producto/:id', verifyToken, ProductController.updateProduct);

// ===============
// ELIMINAR un PRODUCTO
// ===============
router.delete('/producto/:id', verifyToken, ProductController.deleteProduct);

// ===============
// BUSCAR PRODUCTO
// ===============
router.get('/productos/buscar/:termino', verifyToken, ProductController.searchProduct);

module.exports = router;