const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = process.env;

// Register
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.run(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hashedPassword],
    function (err) {
      if (err) return res.status(500).json({ message: 'Registration failed' });

      const token = jwt.sign({ id: this.lastID }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ token });
    }
  );
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user) return res.status(404).json({ message: 'User not found' });

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  });
});

module.exports = router;