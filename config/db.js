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
        "https://i.pinimg.com/originals/a0/c6/62/a0c662a3b9a0b20e98a4abeb62b29d86.jpg",
    },
    {
      name: "image",
      coverImage: "https://cdn-icons-png.flaticon.com/512/16/16410.png",
    },
    {
      name: "text",
      coverImag: "https://cdn-icons-png.flaticon.com/512/1/1478.png",
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
