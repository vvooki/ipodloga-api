const db = require("../database");

async function getStudentById(studentId) {
  const [student] = await db.query("SELECT * FROM students WHERE id = ?", [
    studentId,
  ]);
  return student[0];
}

async function getAllStudents() {
  const [students] = await db.query("SELECT * FROM students");
  return students;
}

async function addStudent(student) {
  const {
    email,
    firstName,
    lastName,
    indexNumber,
    isFullTime,
    studentId,
    isAdmin,
  } = student;
  const [result] = await db.query(
    "INSERT INTO students (email, firstName, lastName, indexNumber, isFullTime, studentId, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [email, firstName, lastName, indexNumber, isFullTime, studentId, isAdmin]
  );
  return result.insertId;
}

async function updateStudent(id, updatedStudent) {
  const {
    email,
    firstName,
    lastName,
    indexNumber,
    isFullTime,
    studentId,
    isAdmin,
  } = updatedStudent;
  await db.query(
    "UPDATE students SET email = ?, first_name = ?, last_name = ?, index_number = ?, is_full_time = ?, student_id = ?, is_admin = ? WHERE id = ?",
    [
      email,
      firstName,
      lastName,
      indexNumber,
      isFullTime,
      studentId,
      isAdmin,
      id,
    ]
  );
  return getStudentById(id);
}

async function deleteStudent(id) {
  await db.query("DELETE FROM students WHERE id = ?", [id]);
  return id;
}

module.exports = {
  getStudentById,
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};
