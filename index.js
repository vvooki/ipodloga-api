const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const notesRoute = require("./routes/notesRoute");
const projectsRoute = require("./routes/projectsRoute");

dotenv.config();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/notes", notesRoute);
app.use("/api/projects", projectsRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
