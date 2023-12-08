const express = require('express');
const router = express.Router();
const { getNotes, getNote, createNote } = require('../services/notesService');

router.get('/', async (req, res) => {
  try {
    const notes = await getNotes();
    res.send(notes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const note = await getNote(id);
    if (note) {
      res.send(note);
    } else {
      res.status(404).send('Note not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, contents } = req.body;
    const note = await createNote(title, contents);
    res.status(201).send(note);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
