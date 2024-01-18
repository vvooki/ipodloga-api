const pool = require('../database');

async function getAllProjects(page, pageSize) {
  const offset = (page - 1) * pageSize;
  const [projects] = await pool.query(
    'SELECT * FROM projects LIMIT ? OFFSET ?',
    [pageSize, offset],
  );
  return projects;
}

async function getProject(id) {
  const [project] = await pool.query('SELECT * FROM projects WHERE id = ?', [
    id,
  ]);
  return project[0];
}

async function addProject(project) {
  const {
    name,
    description,
    status,
    creationDateTime,
    completionDateTime,
    conversation,
  } = project;
  const [result] = await pool.query(
    'INSERT INTO projects (name, description, status, creationDateTime, completionDateTime, conversation) VALUES (?, ?, ?, ?, ?, ?)',
    [
      name,
      description,
      status,
      creationDateTime,
      completionDateTime,
      conversation,
    ],
  );
  return result.insertId;
}

async function updateProject(id, updatedProject) {
  const {
    name,
    description,
    status,
    creationDateTime,
    completionDateTime,
    conversation,
  } = updatedProject;
  const [result] = await pool.query(
    'UPDATE projects SET name = ?, description = ?, status = ?, creationDateTime = ?, completionDateTime = ?, conversation = ? WHERE id = ?',
    [
      name,
      description,
      status,
      creationDateTime,
      completionDateTime,
      conversation,
      id,
    ],
  );

  return id;
}

async function deleteProject(id) {
  await pool.query('DELETE FROM projects WHERE id = ?', [id]);
}

module.exports = {
  getAllProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
};
