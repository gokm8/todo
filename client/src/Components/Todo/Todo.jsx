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
                <ListItem
                    key={index}
                    secondaryAction={
                        <IconButton edge="end" aria-label="comments">
                            <CloseIcon />
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
                                checked={checked.includes(index)}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ "aria-labelledby": labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={t.task} />
                    </ListItemButton>
                </ListItem>
            );
        });
    };

    // add a new todo
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

                const data = await response.json(); // get the new task from the server

                // update the task-list with the new task (inclusive id and isComplete)lete
                setTask([...task, data]);

                // restore input field after insert
                setNewTask("");
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    };

    const deleteTask = async () => {};

    return (
        <Box
            component="section"
            sx={{
                p: 2,
                m: 2,
                mt: 8,
                border: "1px solid grey",
                bgcolor: "#d4cfcf",
            }}>
            {/* H1 title */}
            <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: "bold" }}
                gutterBottom>
                // TODO
            </Typography>

            {/* H2 subtitle */}
            <Typography
                variant="h6"
                component="h2"
                sx={{ fontWeight: "bold" }}
                gutterBottom>
                Tasks:
            </Typography>

            {/* TODO list */}
            <Box className="todo__list">
                <List>{listTasks()}</List>
            </Box>

            {/* add new task */}
            <Box className="todo__add-task">
                <Stack direction="row" spacing={2}>
                    {/* textfield to enter task */}
                    <TextField
                        id="filled-basic"
                        label="Add a new task"
                        variant="filled"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />

                    {/* button for ADD task */}
                    <Button
                        variant="contained"
                        endIcon={<AddIcon />}
                        onClick={addTask}>
                        ADD
                    </Button>

                    {/* button for DELETE task */}
                    <Button
                        variant="contained"
                        endIcon={<DeleteIcon />}
                        onClick={deleteTask}>
                        DELETE
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default Todo;
