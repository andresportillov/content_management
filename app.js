const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/topics', require('./routes/topicRoutes'));
app.use('/api/contents', require('./routes/contentRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
