const express = require('express');
const router = express.Router();
const db = require('../db');
const authJwt = require('../middleware/authJwt');

router.use(authJwt);

// GET all transactions for user
router.get('/', (req, res) => {
  db.all('SELECT * FROM transactions WHERE user_id = ?', [req.userId], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// POST new transaction
router.post('/', (req, res) => {
  const { type, amount, date, detail, category } = req.body;
  db.run(
    'INSERT INTO transactions (user_id, type, amount, date, detail, category) VALUES (?, ?, ?, ?, ?, ?)',
    [req.userId, type, amount, date, detail, category],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID, type, amount, date, detail, category });
    }
  );
});

// DELETE a transaction
router.delete('/:id', (req, res) => {
  db.run(
    'DELETE FROM transactions WHERE id = ? AND user_id = ?',
    [req.params.id, req.userId],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Transaction deleted', changes: this.changes });
    }
  );
});

// PUT update transaction
router.put('/:id', (req, res) => {
  const { type, amount, date, detail, category } = req.body;
  db.run(
    'UPDATE transactions SET type = ?, amount = ?, date = ?, detail = ?, category = ? WHERE id = ? AND user_id = ?',
    [type, amount, date, detail, category, req.params.id, req.userId],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Transaction updated', changes: this.changes });
    }
  );
});

module.exports = router;