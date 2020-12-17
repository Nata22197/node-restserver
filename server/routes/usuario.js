const express = require('express');
const UsuarioController = require('../controllers/usuario');

const router = express.Router();

// Rutas utiles
router.get('/usuario', UsuarioController.getUsers);
router.post('/usuario', UsuarioController.saveUser);
router.put('/usuario/:id', UsuarioController.updateUser);
router.delete('/usuario/:id', UsuarioController.deleteUser);
  
module.exports = router;