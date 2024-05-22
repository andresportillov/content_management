const express = require('express');
const router = express.Router();
const { 
    createTopic, 
    getTopics, 
    updateTopic, 
    deleteTopic 
} = require('../controllers/topicController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Crear una nueva temática
router.post('/', auth, adminAuth, createTopic);

// Obtener todas las temáticas
router.get('/', auth, getTopics);

// Actualizar una temática
router.put('/:id', auth, adminAuth, updateTopic);

// Eliminar una temática
router.delete('/:id', auth, adminAuth, deleteTopic);

module.exports = router;
