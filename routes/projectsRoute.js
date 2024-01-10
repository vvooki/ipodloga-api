const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
} = require('../services/projectsService');
const { verifyToken, verifyTokenAndAdmin } = require('./verifyToken');

router.get('/', verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const projects = await getAllProjects(page, pageSize);
    res.send(projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const project = await getProject(id);
    if (project) {
      res.send(project);
    } else {
      res.status(404).send('Project not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const id = await addProject(req.body);
    const project = await getProject(id);
    res.status(201).send(project);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    await updateProject(req.params.id, req.body);
    res.status(200).send({ message: 'Project updated' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await deleteProject(req.params.id);
    res.status(200).send({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
