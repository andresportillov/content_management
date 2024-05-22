const express = require('express');
const router = express.Router();
const { 
    createContent,
    getContents,
    updateContent,
    deleteContent
} = require('../controllers/contentController');
const auth = require('../middleware/auth');
const creatorAuth = require('../middleware/creatorAuth');

// Crear un nuevo contenido
router.post('/', auth, creatorAuth, createContent);

// Obtener todos los contenidos
router.get('/', auth, getContents);

// Actualizar un contenido
router.put('/:id', auth, creatorAuth, updateContent);

// Eliminar un contenido
router.delete('/:id', auth, creatorAuth, deleteContent);

module.exports = router;
