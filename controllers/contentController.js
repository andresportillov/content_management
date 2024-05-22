const Content = require('../models/Content');

// Crear un nuevo contenido
exports.createContent = async (req, res) => {
  const { title, type, url, text, category, topic } = req.body;

  try {
    let content = new Content({
      title,
      type,
      url,
      text,
      category,
      topic,
      createdBy: req.user.id,
    });

    await content.save();
    res.json(content);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Obtener todos los contenidos
exports.getContents = async (req, res) => {
  try {
    const contents = await Content.find().populate('category').populate('topic').populate('createdBy', 'username');
    res.json(contents);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Actualizar un contenido
exports.updateContent = async (req, res) => {
  const { title, type, url, text, category, topic } = req.body;

  try {
    let content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ msg: 'Contenido no encontrado' });
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
    res.status(500).send('Server Error');
  }
};

// Eliminar un contenido
exports.deleteContent = async (req, res) => {
  try {
    let content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ msg: 'Contenido no encontrado' });
    }

    await content.remove();
    res.json({ msg: 'Contenido eliminado' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
