import React from 'react';
import TodoItem from './TodoItem';

function TodoList({todos, onDelete, onToggle, onUpdate}) {
    console.log('Danh sach:', todos)
    return (
        <div className="todo-list">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
}


export default TodoList;
