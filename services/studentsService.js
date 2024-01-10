const db = require('../database');

async function getStudentById(studentId) {
  const [student] = await db.query('SELECT * FROM students WHERE id = ?', [
    studentId,
  ]);
  return student[0];
}

async function getAllStudents() {
  const [students] = await db.query('SELECT * FROM students');
  return students;
}

async function checkIfEmailAlreadyExists(email) {
  const [result] = await db.query('SELECT * FROM students WHERE email = ?', [
    email,
  ]);
  return result;
}

async function getStudentByEmail(email) {
  const [student] = await db.query('SELECT * FROM students WHERE email = ?', [
    email,
  ]);
  return student[0];
}

async function addStudent(student) {
  const {
    email,
    firstName,
    lastName,
    indexNumber,
    isFullTime,
    isAdmin,
    password,
  } = student;
  const [result] = await db.query(
    'INSERT INTO students (email, firstName, lastName, indexNumber, isFullTime, isAdmin, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [email, firstName, lastName, indexNumber, isFullTime, isAdmin, password],
  );
  return result.insertId;
}

async function updateStudent(id, updatedStudent) {
  const { email, firstName, lastName, indexNumber, isFullTime, isAdmin } =
    updatedStudent;
  await db.query(
    'UPDATE students SET email = ?, firstName = ?, lastName = ?, indexNumber = ?, isFullTime = ?, isAdmin = ? WHERE id = ?',
    [email, firstName, lastName, indexNumber, isFullTime, isAdmin, id],
  );
  return getStudentById(id);
}

async function deleteStudent(id) {
  await db.query('DELETE FROM students WHERE id = ?', [id]);
  return id;
}

module.exports = {
  getStudentById,
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  checkIfEmailAlreadyExists,
  getStudentByEmail,
};
