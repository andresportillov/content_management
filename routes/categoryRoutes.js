const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Crear una nueva categoría
router.post('/', auth, adminAuth, categoryController.createCategory);

// Obtener todas las categorías
router.get('/', auth, categoryController.getCategories);

// Actualizar una categoría
router.put('/:id', auth, adminAuth, categoryController.updateCategory);

// Eliminar una categoría
router.delete('/:id', auth, adminAuth, categoryController.deleteCategory);

module.exports = router;
