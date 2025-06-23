import React, {useState} from 'react';

function TodoItem({todo, onDelete, onToggle, onUpdate}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.title);

    const handleSave = () => {
        if (!editText.trim()) return;
        onUpdate(todo.id, {title: editText});
        setIsEditing(false);
    };

    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />

            {isEditing ? (
                <input
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    className="todo-input"
                />
            ) : (
                <div className={`todo-content ${todo.completed ? 'completed' : ''}`}>
                    {todo.title}
                </div>
            )}

            {isEditing ? (
                <button className="edit-btn" onClick={handleSave}>OK</button>
            ) : (
                <button className="edit-btn fa-solid fa-pen-to-square" onClick={() => setIsEditing(true)}></button>
                // <button className="edit-btn " onClick={() => setIsEditing(true)}>edit</button>
            )}

            <button className="del-btn fa-solid fa-trash" onClick={() => onDelete(todo.id)}></button>
            {/*<button className="del-btn" onClick={() => onDelete(todo.id)}>delete</button>*/}
        </div>
    );
}

export default TodoItem;
