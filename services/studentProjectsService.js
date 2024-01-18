const pool = require('../database');

async function addStudentToProject(studentId, projectId) {
  await pool.query(
    'INSERT INTO student_projects (student_id, project_id) VALUES (?, ?)',
    [studentId, projectId],
  );
}

async function removeStudentFromProject(studentId, projectId) {
  await pool.query(
    'DELETE FROM student_projects WHERE student_id = ? AND project_id = ?',
    [studentId, projectId],
  );
}

async function getProjectsForStudent(studentId, page, pageSize) {
  const offset = (page - 1) * pageSize;
  const [projects] = await pool.query(
    'SELECT p.* FROM projects p JOIN student_projects sp ON p.id = sp.project_id WHERE sp.student_id = ? LIMIT ? OFFSET ?',
    [studentId, pageSize, offset],
  );
  return projects;
}

async function getStudentsForProject(projectId) {
  const [students] = await pool.query(
    'SELECT s.* FROM students s JOIN student_projects sp ON s.id = sp.student_id WHERE sp.project_id = ?',
    [projectId],
  );
  return students;
}

module.exports = {
  addStudentToProject,
  removeStudentFromProject,
  getProjectsForStudent,
  getStudentsForProject,
};
