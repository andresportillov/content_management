const Content = require("../models/Content");
const User = require("../models/User");

// Crear un nuevo contenido
const createContent = async (req, res) => {
  const { title, type, url, category, topic } = req.body;
  const user = await User.findOne({ _id: req.user.id });

  try {
    let content = new Content({
      title,
      type,
      url,
      category,
      topic,
      createdBy: user.username,
    });

    // Verifica si hay un archivo de texto adjunto
    if (req.file && req.file.buffer) {
      // Guarda los datos del archivo de texto en el campo textContent como un Buffer
      content.textContent = req.file.buffer.toString("base64");
    }

    await content.save();

    // Convierte el buffer a Base64 antes de enviar la respuesta
    const contentResponse = content.toObject();
    if (contentResponse.textContent) {
      contentResponse.textContent = content.textContent.toString("base64");
    }

    res.json(contentResponse);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Obtener todos los contenidos
const getContents = async (req, res) => {
  try {
    const { search = "" } = req.query;
    const query = {};

    if (Boolean(search) && search.trim() !== "") {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { topic: { $regex: search, $options: "i" } },
      ];
    }
    const contents = await Content.find(query);
    res.json(contents);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getCountContentsByCategory = async (req, res) => {
  try {
    const results = await Content.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: 1 },
        },
      },
    ]);

    res.json(results);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Actualizar un contenido
const updateContent = async (req, res) => {
  const { title, type, url, text, category, topic } = req.body;

  try {
    let content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ msg: "Contenido no encontrado" });
    }

    content.title = title || content.title;
    content.type = type || content.type;
    content.url = url || content.url;
    content.text = text || content.text;
    content.category = category || content.category;
    content.topic = topic || content.topic;

    await content.save();
    res.json(content);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Eliminar un contenido
const deleteContent = async (req, res) => {
  try {
    let content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ msg: "Contenido no encontrado" });
    }

    await content.remove();
    res.json({ msg: "Contenido eliminado" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createContent,
  getContents,
  updateContent,
  deleteContent,
  getCountContentsByCategory,
};
