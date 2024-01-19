const pool = require('../database');

async function addTaskToProject(taskId, projectId) {
  await pool.query(
    'INSERT INTO task_projects (task_id, project_id) VALUES (?, ?)',
    [taskId, projectId],
  );
}

async function removeTaskFromProject(taskId, projectId) {
  await pool.query(
    'DELETE FROM task_projects WHERE task_id = ? AND project_id = ?',
    [taskId, projectId],
  );
}

async function getTasksForProject(projectId) {
  const [tasks] = await pool.query(
    'SELECT * FROM tasks tasks WHERE project_id = ?',
    [projectId],
  );
  return tasks;
}

module.exports = {
  addTaskToProject,
  removeTaskFromProject,
  getTasksForProject,
};
