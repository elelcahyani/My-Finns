const express = require('express');
const router = express.Router();
const db = require('../db');
const authJwt = require('../middleware/authJwt');

router.use(authJwt);

// GET data profil pengguna
router.get('/me', (req, res) => {
  const userId = req.userId;

  db.get('SELECT id, email FROM users WHERE id = ?', [userId], (err, user) => {
    if (err || !user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.json(user);
  });
});

module.exports = router;