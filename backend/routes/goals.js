const express = require('express');
const router = express.Router();
const db = require('../db');
const authJwt = require('../middleware/authJwt');

router.use(authJwt);

// GET all goals
router.get('/', (req, res) => {
  db.all('SELECT * FROM goals WHERE user_id = ?', [req.userId], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// POST new goal
router.post('/', (req, res) => {
  const { goal_name, target_amount, saved } = req.body;
  db.run(
    'INSERT INTO goals (user_id, goal_name, target_amount, saved) VALUES (?, ?, ?, ?)',
    [req.userId, goal_name, target_amount, saved],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID, goal_name, target_amount, saved });
    }
  );
});

// DELETE goal
router.delete('/:id', (req, res) => {
  db.run(
    'DELETE FROM goals WHERE id = ? AND user_id = ?',
    [req.params.id, req.userId],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Goal deleted', changes: this.changes });
    }
  );
});

// PUT update goal
router.put('/:id', (req, res) => {
  const { goal_name, target_amount, saved } = req.body;
  db.run(
    'UPDATE goals SET goal_name = ?, target_amount = ?, saved = ? WHERE id = ? AND user_id = ?',
    [goal_name, target_amount, saved, req.params.id, req.userId],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Goal updated', changes: this.changes });
    }
  );
});

module.exports = router;