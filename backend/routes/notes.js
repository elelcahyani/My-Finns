const express = require('express');
const router = express.Router();
const db = require('../db');
const authJwt = require('../middleware/authJwt');

router.use(authJwt);

// GET all notes
router.get('/', (req, res) => {
  db.all('SELECT * FROM notes WHERE user_id = ?', [req.userId], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// POST new note
router.post('/', (req, res) => {
  const { title, content, mood } = req.body;
  db.run(
    'INSERT INTO notes (user_id, title, content, mood) VALUES (?, ?, ?, ?)',
    [req.userId, title, content, mood],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID, title, content, mood });
    }
  );
});

// DELETE note
router.delete('/:id', (req, res) => {
  db.run(
    'DELETE FROM notes WHERE id = ? AND user_id = ?',
    [req.params.id, req.userId],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Note deleted', changes: this.changes });
    }
  );
});

// PUT update note
router.put('/:id', (req, res) => {
  const { title, content, mood } = req.body;
  db.run(
    'UPDATE notes SET title = ?, content = ?, mood = ? WHERE id = ? AND user_id = ?',
    [title, content, mood, req.params.id, req.userId],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Note updated', changes: this.changes });
    }
  );
});

module.exports = router;