const express = require('express');
const router = express.Router();
const studentsService = require('../services/studentsService');
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require('./verifyToken');

router.get('/', verifyToken, async (req, res) => {
  try {
    const students = await studentsService.getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const student = await studentsService.getStudentById(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const newStudent = req.body;
    const addedStudent = await studentsService.addStudent(newStudent);
    res.status(201).json(addedStudent);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedStudent = req.body;
    const studentId = req.params.id;
    const student = await studentsService.updateStudent(
      studentId,
      updatedStudent,
    );
    if (student) {
      res.json(student);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const studentId = req.params.id;
    await studentsService.deleteStudent(studentId);
    res.status(200).send({ message: `Student with id ${studentId} deleted` });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
