const express = require('express');
const router = express.Router();
const taskStudentsService = require('../services/taskStudentsService');
const { verifyToken } = require('./verifyToken');

router.post('/assign-to-student', verifyToken, async (req, res) => {
  try {
    const { taskId, studentId } = req.body;
    await taskStudentsService.assignTaskToStudent(taskId, studentId);
    res.status(200).send('Task assigned to student successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/unassign-from-student', verifyToken, async (req, res) => {
  try {
    const { taskId, studentId } = req.body;
    await taskStudentsService.unassignTaskFromStudent(taskId, studentId);
    res.status(200).send('Task unassigned from student successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/tasks-for-student/:studentId', verifyToken, async (req, res) => {
  try {
    const tasks = await taskStudentsService.getTasksForStudent(
      req.params.studentId,
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
