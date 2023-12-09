const pool = require("../database");

async function assignTaskToStudent(taskId, studentId) {
  await pool.query(
    "INSERT INTO task_students (task_id, student_id) VALUES (?, ?)",
    [taskId, studentId]
  );
}

async function unassignTaskFromStudent(taskId, studentId) {
  await pool.query(
    "DELETE FROM task_students WHERE task_id = ? AND student_id = ?",
    [taskId, studentId]
  );
}

async function getTasksForStudent(studentId) {
  const [tasks] = await pool.query(
    "SELECT t.* FROM tasks t JOIN task_students ts ON t.id = ts.task_id WHERE ts.student_id = ?",
    [studentId]
  );
  return tasks;
}

module.exports = {
  assignTaskToStudent,
  unassignTaskFromStudent,
  getTasksForStudent,
};
