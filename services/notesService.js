const pool = require('../database');

async function getNotes() {
  const [rows] = await pool.query('SELECT * FROM notes');
  return rows;
}

async function getNote(id) {
  const [rows] = await pool.query('SELECT * FROM notes WHERE id = ?', [id]);
  return rows[0];
}

async function createNote(title, contents) {
  const [result] = await pool.query(
    'INSERT INTO notes (title, contents) VALUES (?, ?)',
    [title, contents],
  );
  const id = result.insertId;
  return getNote(id);
}

module.exports = { getNotes, getNote, createNote };
