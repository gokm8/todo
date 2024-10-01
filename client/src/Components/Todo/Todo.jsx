import React, { useState, useEffect } from "react";

function Todo() {
    const API_URL = "http://localhost:3000/api/tasks";

    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");

    // fetch todos from API
    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((task) => setTask(task));
    }, []);

    // list tasks in <li>{task}</li>
    const listTasks = () => {
        return task.map((t, index) => <li key={index}>{t.task}</li>);
    };

    // add a new todo
    const addTask = async () => {
        if (newTask.trim() !== "") {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/tasks",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ task: newTask }), // only post task as input
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json(); // Modtager den oprettede opgave fra serveren

                // update the task-list with the new task (inclusive id and isComplete)lete
                setTask([...task, data]);

                // restore input field after insert
                setNewTask("");
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    };

    return (
        <div>
            <h1>// TODO</h1>
            <h2>Tasks:</h2>
            <div className="todo__list">
                <ul>{listTasks()}</ul>
            </div>
            <input
                type="text"
                placeholder="Add a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Add task</button>
        </div>
    );
}

export default Todo;
