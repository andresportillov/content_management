const Topic = require("../models/Topic");
const Category = require("../models/Category");

// Crear una nueva temática
const createTopic = async (req, res) => {
  const { name } = req.body;

  try {
    let topic = new Topic({
      name,
    });

    await topic.save();
    res.json(topic);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Obtener todas las temáticas
const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Actualizar una temática
const updateTopic = async (req, res) => {
  const { name, categories } = req.body;

  try {
    let topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ msg: "Temática no encontrada" });
    }

    topic.name = name || topic.name;
    topic.categories = categories || topic.categories;

    await topic.save();
    res.json(topic);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Eliminar una temática
const deleteTopic = async (req, res) => {
  try {
    let topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ msg: "Temática no encontrada" });
    }

    await topic.remove();
    res.json({ msg: "Temática eliminada" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createTopic,
  getTopics,
  updateTopic,
  deleteTopic,
};
