import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();

export const TodoWrapperLocalStorage = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const savedTodos = JSON.parse(window.localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    const addTodo = todo => {
        const newTodo = { id: uuidv4(), task: todo, completed: false, isEditing: false };
        const newTodos = [...todos, newTodo];
        setTodos(newTodos);
        window.localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const toggleComplete = id => {
        const newTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
        window.localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const deleteTodo = id => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        window.localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const editTodo = id => {
        const newTodos = todos.map(todo =>
            todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        );
        setTodos(newTodos);
        window.localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const editTask = (task, id) => {
        const newTodos = todos.map(todo =>
            todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        );
        setTodos(newTodos);
        window.localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    return (
        <div className='TodoWrapper'>
            <h1>Get Things Done!</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map(todo =>
                todo.isEditing ? (
                    <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
                ) : (
                    <Todo
                        key={todo.id}
                        task={todo}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                    />
                )
            )}
        </div>
    );
};