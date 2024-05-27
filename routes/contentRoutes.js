const express = require("express");
const router = express.Router();
const {
  createContent,
  getContents,
  updateContent,
  deleteContent,
  getCountContentsByCategory,
} = require("../controllers/contentController");
const auth = require("../middleware/auth");
const creatorAuth = require("../middleware/creatorAuth");
const multer = require("multer");

// Configura multer para manejar la carga de archivos de texto
// Configura Multer para manejar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Crear un nuevo contenido
router.post("/", upload.single("file"), auth, creatorAuth, createContent);

// Contador de contenido segun su categoria
router.get("/getCountContents", auth, creatorAuth, getCountContentsByCategory);

// Obtener todos los contenidos
router.get("/", auth, getContents);

// Actualizar un contenido
router.put("/:id", auth, creatorAuth, updateContent);

// Eliminar un contenido
router.delete("/:id", auth, creatorAuth, deleteContent);

module.exports = router;
