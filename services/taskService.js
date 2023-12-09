const pool = require("../database");

async function getTaskById(taskId) {
  const [task] = await pool.query("SELECT * FROM tasks WHERE id = ?", [taskId]);
  return task[0];
}

async function getAllTasks() {
  const [tasks] = await pool.query("SELECT * FROM tasks");
  return tasks;
}

async function addTask(task) {
  const {
    sequence,
    name,
    description,
    task_type,
    task_priority,
    task_status,
    deadline,
  } = task;
  const [result] = await pool.query(
    "INSERT INTO tasks (sequence, name, description, task_type, task_priority, task_status, deadline) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      sequence,
      name,
      description,
      task_type,
      task_priority,
      task_status,
      deadline,
    ]
  );
  return getTaskById(result.insertId);
}

async function updateTask(id, updatedTask) {
  const {
    sequence,
    name,
    description,
    task_type,
    task_priority,
    task_status,
    deadline,
  } = updatedTask;
  await pool.query(
    "UPDATE tasks SET sequence = ?, name = ?, description = ?, task_type = ?, task_priority = ?, task_status = ?, deadline = ? WHERE id = ?",
    [
      sequence,
      name,
      description,
      task_type,
      task_priority,
      task_status,
      deadline,
      id,
    ]
  );
  return getTaskById(id);
}

async function deleteTask(id) {
  await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
  return id;
}

module.exports = {
  getTaskById,
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
};
