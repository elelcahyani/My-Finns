require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/goals', require('./routes/goals'));
const profileRoutes = require('./routes/profile'); // ✅ Tambahkan baris ini

// ✅ Tambahkan route profil
app.use('/api/profile', profileRoutes); // Semua route di profile.js akan menjadi /api/profile/me


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});