const pool = require('../database');

async function getFiles() {
  const [rows] = await pool.query('SELECT * FROM project_file');
  return rows;
}

async function getFile(id) {
  const [rows] = await pool.query('SELECT * FROM project_file WHERE id = ?', [
    id,
  ]);
  return rows[0];
}

async function getFilesForProject(projectId) {
  const [rows] = await pool.query(
    'SELECT * FROM project_file WHERE id_project = ?',
    [projectId],
  );
  return rows;
}

async function createFile(id_project, file_url) {
  const [result] = await pool.query(
    'INSERT INTO project_file (project_id, file_url) VALUES (?, ?)',
    [id_project, file_url],
  );
  //   const id = result.insertId;
  //   return getFile(id);
}

async function deleteFile(id) {
  await pool.query('DELETE FROM project_file WHERE id = ?', [id]);
  return id;
}

module.exports = {
  getFiles,
  getFile,
  getFilesForProject,
  createFile,
  deleteFile,
};
