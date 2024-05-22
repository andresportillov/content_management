const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

// Registro de usuario
router.post('/register', register);

// Autenticación de usuario
router.post('/login', login);

// Obtener usuario autenticado
router.get('/', auth, getUser);

module.exports = router;
