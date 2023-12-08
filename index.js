const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const notesRoute = require('./routes/notesRoute');

dotenv.config();
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/notes', notesRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log('Backend server running on port 5000');
});
