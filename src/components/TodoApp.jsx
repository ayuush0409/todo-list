import { useState } from 'react';
import './TodoApp.css';


var taskId = 1;


const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: taskId++, text: newTask }]);
      setNewTask('');
    }
  };



  const deleteTask = (id) => {
    taskId = 1; 
    setTasks(
      tasks
        .filter((task) => task.id !== id) 
        .map((task) => ({ ...task, id: taskId++ }))  
    );
  };
  

  const editTask = (task) => {
    setEditingTask({ id: task.id, text: task.text });
  };

  const saveTask = () => {
    if (editingTask.text.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, text: editingTask.text } : task
        )
      );
      setEditingTask(null);
    }
  };

  return (
    <div className="todo-container">
      <h1>TODO LIST</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add item..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>ADD</button>
      </div>
      <div className="todo-list">
        {tasks.map((task) => (
          <div key={task.id} className="todo-item">
            {editingTask?.id === task.id ? (
              <>
                <input
                  type="text"
                  value={editingTask.text}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, text: e.target.value })
                  }
                  className="edit-input"
                />
                <button onClick={saveTask}>Save</button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </>
            ) : (
              <>
              <span>{task.id}</span>
                <span>{task.text}</span>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <button onClick={() => editTask(task)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
