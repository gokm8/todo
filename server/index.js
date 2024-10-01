const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// array of objects
const tasks = [];

// GET: fetch all tasks
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

// POST: add a new task
app.post("/api/tasks", (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        task: req.body.task,
        isComplete: false,
    };
    tasks.push(newTask);
    res.json(newTask);
});

// PUT: update a task (marks as complete/incomplete)

// DELETE: remove a task

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});
