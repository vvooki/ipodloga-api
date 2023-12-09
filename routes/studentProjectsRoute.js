const express = require("express");
const router = express.Router();
const studentProjectsService = require("../services/studentProjectsService");

router.post("/add", async (req, res) => {
  try {
    const { studentId, projectId } = req.body;
    await studentProjectsService.addStudentToProject(studentId, projectId);
    res.status(200).send("Student added to project successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/remove", async (req, res) => {
  try {
    const { studentId, projectId } = req.body;
    await studentProjectsService.removeStudentFromProject(studentId, projectId);
    res.status(200).send("Student removed from project successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/projects/:studentId", async (req, res) => {
  try {
    const projects = await studentProjectsService.getProjectsForStudent(
      req.params.studentId
    );
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/students/:projectId", async (req, res) => {
  try {
    const students = await studentProjectsService.getStudentsForProject(
      req.params.projectId
    );
    res.status(200).json(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
