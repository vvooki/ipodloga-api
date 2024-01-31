const express = require('express');
const router = express.Router();
const { verifyToken } = require('./verifyToken');
const {
  getFiles,
  createFile,
  getFile,
  deleteFile,
  getFilesForProject,
} = require('../services/projectFilesService');

router.get('/', verifyToken, async (req, res) => {
  try {
    const files = await getFiles();
    res.send(files);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const files = await getFilesForProject(req.params.id);
    res.send(files);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    console.log(req.body.projectId, req.body.file_url);
    const id = await createFile(req.body.projectId, req.body.file_url);
    const file = await getFile(id);
    res.status(201).send(file);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await deleteFile(req.params.id);
    res.status(200).send(req.params.id);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
