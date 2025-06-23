// components/TodoApp.jsx
import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useTodos from './useTodos';
import './TodoApp.css';

function TodoApp() {
    const {
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
        inputRef
    } = useTodos();

    return (
        <div className="container">
            <h1>Get Things Done!</h1>
            <form className="todo-form" onSubmit={e => e.preventDefault()}>
                <TodoForm onAdd={addTodo} inputRef={inputRef}/>
                <TodoList
                    todos={todos}
                    onUpdate={updateTodo}
                    onDelete={deleteTodo}
                    onToggle={toggleComplete}
                />
            </form>
        </div>
    );
}

export default TodoApp;
