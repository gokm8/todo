import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import "./Todo.css";

function Todo() {
    const API_URL = "http://localhost:3000/api/tasks";

    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [checked, setChecked] = React.useState([]);

    // fetch todos from API
    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((task) => setTask(task));
    }, []);

    // handle checkbox toggle
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    // list tasks in <li>{task}</li>
    const listTasks = () => {
        return task.map((t, index) => {
            const labelId = `checkbox-list-label-${index}`;
            return (
                // CloseIcon to delete a task
                <ListItem
                    key={index}
                    secondaryAction={
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => deleteTask(t.id)}>
                            <CloseIcon sx={{ color: "#ffffff" }} />
                        </IconButton>
                    }
                    disablePadding>
                    <ListItemButton
                        role={undefined}
                        onClick={handleToggle(index)}
                        dense>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={t.isComplete}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ "aria-labelledby": labelId }}
                                onClick={() => updateTask(t.id)}
                                sx={{
                                    color: t.isComplete ? "#00ff00" : "#ffffff", // green when complete, otherwise white
                                    "&.Mui-checked": {
                                        color: "#00ff00", // color when complete
                                    },
                                }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            id={labelId}
                            primary={t.task}
                            className={t.isComplete ? "completed" : ""}
                            sx={{ color: "white.dark" }}
                            primaryTypographyProps={{
                                sx: {
                                    color: "white",
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    fontFamily:
                                        '"Roboto", "Helvetica", "Arial", sans-serif',
                                },
                            }}
                        />
                    </ListItemButton>
                </ListItem>
            );
        });
    };

    // add a new task
    const addTask = async () => {
        if (newTask.trim() !== "") {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/addTask",
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

                // logging the added task
                const data = await response.json();
                console.log("Task added: ", data);

                // update the task-list with the new task (inclusive id and isComplete)
                setTask([...task, data]);

                // restore input field after insert
                setNewTask("");
            } catch (error) {
                console.error("Error adding task: ", error);
            }
        }
    };

    const updateTask = async (id) => {
        const taskToUpdate = task.find((t) => t.id === id); // find the task to update

        try {
            const response = await fetch(
                `http://localhost:3000/api/updateTask/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        isComplete: !taskToUpdate.isComplete, // flip the isComplete value
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            const updatedTask = await response.json();
            console.log("Task updated to: ", updatedTask);

            // update the task state with the new updated task
            setTask(task.map((t) => (t.id === id ? updatedTask.data : t))); // update the state with the updated task
        } catch (error) {
            console.log("Error updating task: ", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            // DELETE request to the server with the specific task ID
            const response = await fetch(
                `http://localhost:3000/api/deleteTask/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Task deleted: ", data);

            // update the task list by filtering out the deleted task
            setTask(task.filter((task) => task.id !== id)); // remove the task with the matching ID
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <Box
            component="section"
            sx={{
                p: 2,
                mt: 8,
                border: "2px solid grey ",
                borderColor: "#27272a",
                borderRadius: "10px",
            }}>
            {/* H1 title */}
            <Typography
                variant="h1"
                component="h1"
                sx={{
                    fontWeight: "bold",
                    color: "white.light",
                    textAlign: "center",
                }}
                gutterBottom>
                // TODO's
            </Typography>
            <hr />

            {/* H2 subtitle */}
            {/* <Typography
                variant="h2"
                component="h2"
                sx={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                    color: "white.main",
                }}
                gutterBottom>
                Tasks
            </Typography> */}

            {/* TODO list */}
            <Box className="todo__list">
                <List>{listTasks()}</List>
            </Box>

            {/* add new task */}
            <Box className="todo__add-task" sx={{ mt: "1rem" }}>
                <Stack direction="row" spacing={2}>
                    {/* textfield to enter task */}
                    <TextField
                        id="filled-basic"
                        label="Add a new task"
                        variant="filled"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        sx={{ backgroundColor: "white.dark", width: "85%" }}
                        inputProps={{ maxLength: 70 }} // limit on characters
                    />
                    {/* button for ADD task */}
                    <Button
                        variant="contained"
                        endIcon={<AddIcon />}
                        onClick={addTask}
                        sx={{
                            color: "black",
                            backgroundColor: "white.dark",
                        }}>
                        ADD
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default Todo;
