const sqlite3 = require('sqlite3').verbose();

// Membuka/konek ke database SQLite (file: db.sqlite)
let db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) {
    console.error("Error membuka database", err.message);
  } else {
    console.log("✅ Terhubung ke database SQLite");

    // Membuat tabel users
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    )`, (err) => {
      if (err) console.error("Gagal buat tabel users", err);
    });

    // Membuat tabel transactions
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      type TEXT,
      amount REAL,
      date TEXT,
      detail TEXT,
      category TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`, (err) => {
      if (err) console.error("Gagal buat tabel transactions", err);
    });

    // Membuat tabel notes
    db.run(`CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT,
      content TEXT,
      mood TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`, (err) => {
      if (err) console.error("Gagal buat tabel notes", err);
    });

    // Membuat tabel goals
    db.run(`CREATE TABLE IF NOT EXISTS goals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      goal_name TEXT,
      target_amount REAL,
      saved REAL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`, (err) => {
      if (err) console.error("Gagal buat tabel goals", err);
    });
  }
});

module.exports = db;