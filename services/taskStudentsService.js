const pool = require('../database');

async function assignTaskToStudent(taskId, studentId) {
  await pool.query('UPDATE tasks SET student_id = ? WHERE task_id = ?', [
    studentId,
    taskId,
  ]);
}

async function unassignTaskFromStudent(taskId, studentId) {
  await pool.query('UPDATE tasks SET student_id = 0 WHERE task_id = ?', [
    studentId,
    taskId,
  ]);
}

async function getTasksForStudent(studentId) {
  const [tasks] = await pool.query('SELECT * FROM tasks WHERE student_id = ?', [
    studentId,
  ]);
  return tasks;
}

module.exports = {
  assignTaskToStudent,
  unassignTaskFromStudent,
  getTasksForStudent,
};
