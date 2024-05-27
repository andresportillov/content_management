const mongoose = require("mongoose");
const Topic = require("../models/Topic");
const Category = require("../models/Category");

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.LOCAL_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        initializeTopicCollection();
        initializeCategoryCollection();
        console.log("MongoDB connected");
      });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

async function initializeTopicCollection() {
  const items = [
    { name: "matematicas" },
    { name: "ciencias" },
    { name: "deportes" },
  ];

  try {
    // Verificar si los datos ya existen para evitar duplicados
    const count = await Topic.countDocuments();
    if (count === 0) {
      await Topic.insertMany(items);
      console.log("Datos iniciales insertados en la colección Topic");
    } else {
      console.log("Los datos iniciales ya existen en la colección Topic");
    }
  } catch (err) {
    console.error("Error al insertar datos iniciales:", err);
  }
}

async function initializeCategoryCollection() {
  const items = [
    {
      name: "video",
      coverImage:
        "https://www.iconpacks.net/icons/1/free-video-icon-818-thumb.png",
    },
    {
      name: "image",
      coverImage: "https://cdn-icons-png.flaticon.com/512/16/16410.png",
    },
    {
      name: "text",
      coverImage: "https://cdn-icons-png.flaticon.com/512/2911/2911230.png",
    },
  ];

  try {
    // Verificar si los datos ya existen para evitar duplicados
    const count = await Category.countDocuments();
    if (count === 0) {
      await Category.insertMany(items);
      console.log("Datos iniciales insertados en la colección Category");
    } else {
      console.log("Los datos iniciales ya existen en la colección Category");
    }
  } catch (err) {
    console.error("Error al insertar datos iniciales:", err);
  }
}

module.exports = connectDB;
