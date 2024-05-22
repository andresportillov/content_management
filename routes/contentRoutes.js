const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const auth = require('../middleware/auth');
const creatorAuth = require('../middleware/creatorAuth');

// Crear un nuevo contenido
router.post('/', auth, creatorAuth, contentController.createContent);

// Obtener todos los contenidos
router.get('/', auth, contentController.getContents);

// Actualizar un contenido
router.put('/:id', auth, creatorAuth, contentController.updateContent);

// Eliminar un contenido
router.delete('/:id', auth, creatorAuth, contentController.deleteContent);

module.exports = router;
