const express = require('express');
const router = express.Router();
const { 
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Crear una nueva categoría
router.post('/', auth, adminAuth, createCategory);

// Obtener todas las categorías
router.get('/', auth, getCategories);

// Actualizar una categoría
router.put('/:id', auth, adminAuth, updateCategory);

// Eliminar una categoría
router.delete('/:id', auth, adminAuth, deleteCategory);

module.exports = router;
