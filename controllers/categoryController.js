const Category = require('../models/Category');

// Crear una nueva categoría
const createCategory = async (req, res) => {
  const { name, description, coverImage, allowedContentTypes } = req.body;

  try {
    let category = new Category({
      name,
      description,
      coverImage,
      allowedContentTypes,
    });

    await category.save();
    res.json(category);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Obtener todas las categorías
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Actualizar una categoría
const updateCategory = async (req, res) => {
  const { name, description, coverImage, allowedContentTypes } = req.body;

  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: 'Categoría no encontrada' });
    }

    category.name = name || category.name;
    category.description = description || category.description;
    category.coverImage = coverImage || category.coverImage;
    category.allowedContentTypes = allowedContentTypes || category.allowedContentTypes;

    await category.save();
    res.json(category);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Eliminar una categoría
const deleteCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: 'Categoría no encontrada' });
    }

    await category.remove();
    res.json({ msg: 'Categoría eliminada' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
}