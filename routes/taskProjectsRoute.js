const express = require("express");
const router = express.Router();
const taskProjectsService = require("../services/taskProjectsService");

router.post("/add-to-project", async (req, res) => {
  try {
    const { taskId, projectId } = req.body;
    await taskProjectsService.addTaskToProject(taskId, projectId);
    res.status(200).send("Task added to project successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/remove-from-project", async (req, res) => {
  try {
    const { taskId, projectId } = req.body;
    await taskProjectsService.removeTaskFromProject(taskId, projectId);
    res.status(200).send("Task removed from project successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/tasks-for-project/:projectId", async (req, res) => {
  try {
    const tasks = await taskProjectsService.getTasksForProject(
      req.params.projectId
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
