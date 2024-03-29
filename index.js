const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

const notesRoute = require('./routes/notesRoute');
const projectsRoute = require('./routes/projectsRoute');
const studentRoute = require('./routes/studentsRoute');
const studentProjectsRoute = require('./routes/studentProjectsRoute');
const tasksRoute = require('./routes/taskRoute');
const filesRoute = require('./routes/projectFilesRoute');
const taskProjectsRoute = require('./routes/taskProjectsRoute');
const taskStudentsRoute = require('./routes/taskStudentsRoute');
const authRoute = require('./routes/authRoute');
const emailRoute = require('./routes/emailRoute');

dotenv.config();
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/notes', notesRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/student-projects', studentProjectsRoute);
app.use('/api/students', studentRoute);
app.use('/api/tasks', tasksRoute);
app.use('/api/auth', authRoute);
app.use('/api/email', emailRoute);
app.use('/api/files', filesRoute);
app.use('/api/task-projects', taskProjectsRoute);
app.use('/api/task-students', taskStudentsRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
