const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// array of objects
const tasks = [{ id: 1, task: "Your first task", isComplete: false }];

// GET: fetch all tasks
app.get("/api/tasks", (req, res) => {
    // console.log(tasks);
    // also a way to log the added task
    // i use following for better logging:
    console.log(`Tasks: ${JSON.stringify(tasks)}`); // log tasks as JSON string
    res.json(tasks);
});

// POST: add a new task
app.post("/api/addTask", (req, res) => {
    // logging the incomming task
    // console.log(req.body); // also a way to log the added task
    // i use following for better logging:
    console.log(`A new task is added: ${JSON.stringify(req.body)}`);

    const newTask = {
        id: tasks.length + 1,
        task: req.body.task,
        isComplete: false,
    };
    tasks.push(newTask);
    res.json(newTask);
});

// PUT: update a task (marks as complete/incomplete)
app.put("/api/updateTask/:id", (req, res) => {
    console.log(`ID to update: ${req.params.id}`);

    // converting the string id from the request into a base-10 integer (decimal)
    const id = parseInt(req.params.id, 10);

    // searches the tasks array for a task with the matching id from the request
    const updateTask = tasks.find((el) => el.id === id);

    if (!updateTask) {
        return res.status(400).json({
            status: "fail",
            message: "No task object with ID " + id + " is found to delete",
        });
    }

    // toggle the isComplete value (flip from false to true, or true to false)
    updateTask.isComplete = !updateTask.isComplete;

    // log the updated task for debugging
    console.log(`Task updated: ${JSON.stringify(updateTask)}`);

    // return the updated task
    res.status(200).json({
        status: "success",
        data: updateTask,
    });
});

// DELETE: remove a task
app.delete("/api/deleteTask/:id", (req, res) => {
    // logging ID to be deleted
    console.log(`ID to delete: ${req.params.id}`);

    // converting the string id from the request into a base-10 integer (decimal)
    const id = parseInt(req.params.id, 10);

    // searches the tasks array for a task with the matching id from the request
    const deleteTask = tasks.find((el) => el.id === id);

    // handles the case where no task with the provided id is found
    if (!deleteTask) {
        // status code 400: bad request
        return res.status(400).json({
            status: "fail",
            message: "No task object with ID " + id + " is found to delete",
        });
    }

    // get the index of the task to be deleted
    const index = tasks.indexOf(deleteTask);

    // removes the task from the array, deleting exactly one element
    tasks.splice(index, 1);

    // status code 200: OK
    res.status(200).json({ status: "success" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});
