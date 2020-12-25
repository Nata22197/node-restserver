const express = require('express');
const CategoryController = require('../controllers/categoria');
const { verifyToken } = require('../middlewares/authentication');
const { verifyRole } = require('../middlewares/verifyRole');
const router = express.Router();

// ===============
// MOSTRAR TODAS LAS CATEGORIAS
// ===============
router.get('/categorias', verifyToken, CategoryController.getCategories);

// ===============
// MOSTRAR UNA CATEGORIA POR ID
// ===============
router.get('/categoria/:id', verifyToken, CategoryController.getCategoryById);

// ===============
// CREAR una categoria
// ===============
router.post('/categoria', verifyToken, CategoryController.saveCategory);

// ===============
// ACTUALIZAR una categoria
// ===============
router.put('/categoria/:id', verifyToken, CategoryController.updateCategory);

// ===============
// ELIMINAR una categoria
// ===============
router.delete('/categoria/:id', [verifyToken, verifyRole], CategoryController.deleteCategory);

module.exports = router;