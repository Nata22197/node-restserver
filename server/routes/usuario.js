const express = require('express');
const UsuarioController = require('../controllers/usuario');
const { verifyToken } = require('../middlewares/authentication');
const { verifyRole } = require('../middlewares/verifyRole');
const router = express.Router();

// Rutas utiles
router.get('/usuario', verifyToken, UsuarioController.getUsers);
router.post('/usuario', [verifyToken, verifyRole], UsuarioController.saveUser);
router.put('/usuario/:id', [verifyToken, verifyRole], UsuarioController.updateUser);
router.delete('/usuario/:id', [verifyToken, verifyRole], UsuarioController.deleteUser);
  
module.exports = router;