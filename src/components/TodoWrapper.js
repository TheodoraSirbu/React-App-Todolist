import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import CustomSnackbar from "./CustomSnackbar";
import FormControlLabel from "@mui/material/FormControlLabel";
import MaterialUISwitch from "./LightDarkSwitch";
import "../styles/dark.css";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false, isChecked: false },
    ]);
    if(todo) {
      handleOpenSnackbar("Entry added", "success");
    } else {
      handleOpenSnackbar("Field must not be empty", "error");
    }
  };

  const deleteTodo = (id) => {
    const result = window.confirm("Are you sure you want to delete this book?");
    if (result) {
      handleOpenSnackbar("Entry deleted.", "success");
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      handleOpenSnackbar("Deletion canceled.", "error");
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    const result = window.confirm("Are you sure you want to edit this entry?");
    if (result) {
      handleOpenSnackbar("Entry edited.", "success");
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        )
      );
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
      handleOpenSnackbar("Edit cancelled.", "error");
    }
  };

  // dark & light
  const [theme, switchTheme] = useState("light");

  const toggleTheme = () => {
    switchTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  //Snackbar

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };
  
  // bulk operations

  const toggleChecked = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  }

  return (
    <div className="TodoWrapper" id={theme}>
      <FormControlLabel
          control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
          onChange={toggleTheme}
        />
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
            toggleChecked={toggleChecked}
          />
        )
      )}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
        setSeverity={severity}
      />
    </div>
  );
};
