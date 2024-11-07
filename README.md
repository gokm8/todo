# TODO List Application 📝

A simple TODO list app built with **Node.js** (server) and **React** (client), designed to help manage tasks efficiently.

## Features

- Add, update, and delete tasks.
- Mark tasks as complete or incomplete.
- Responsive design using Material-UI.

## Installation

### 1. Clone the repository
``` bash
git clone https://github.com/gom8/todo.git
cd todo
```

### 2. Install dependencies
Server-side (Node.js):
``` bash
cd server
npm install
```

Client-side (React):
``` bash
cd client
npm install
```

### 3. Run the application
Server (Express):
``` bash
cd server
npm start
```

Client (React):
``` bash
cd client
npm start
```

The app should now be running at `http://localhost:3000`.

## API Endpoints

- **GET** `/api/tasks`: Fetch all tasks.
- **POST** `/api/addTask`: Add a new task.
- **PUT** `/api/updateTask/:id`: Update a task's completion status.
- **DELETE** `/api/deleteTask/:id`: Remove a task.

## Contribution

Contributions are welcome! Please open an issue or submit a pull request.