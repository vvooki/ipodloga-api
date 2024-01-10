const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');
const { verifyTokenAndAdmin, verifyToken } = require('./verifyToken');

router.get('/:id', async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const newTask = await taskService.addTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedTaskId = await taskService.deleteTask(req.params.id);
    res.status(200).send(`Task with ID ${deletedTaskId} deleted`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
