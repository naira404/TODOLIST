import React, { useState, useRef } from 'react';
import App from '../App.css';
function ToDoList() {
  const [todo, setToDo] = useState([]);
  const [showDescription, setShowDescription] = useState(false);
  const [priority, setPriority] = useState('low');
  const [filter, setFilter] = useState('all');
  const inputRef = useRef();
  const descriptionRef = useRef();

  const handleAddToDo = () => {
    const task = inputRef.current.value;
    const description = descriptionRef.current.value;

    if (task.trim()) {
      const newItem = { completed: false, task, description, priority };
      setToDo([...todo, newItem]);
      inputRef.current.value = '';
      descriptionRef.current.value = '';
      setShowDescription(false);
      setPriority('low');
    }
  };

  const handleItemDone = (index) => {
    const newToDo = [...todo];
    newToDo[index].completed = !newToDo[index].completed;
    setToDo(newToDo);
  };

  const handleItemDelete = (index) => {
    const newToDo = [...todo];
    newToDo.splice(index, 1);
    setToDo(newToDo);
  };

  const handleTaskInputChange = (e) => {
    if (e.target.value.trim()) {
      setShowDescription(true);
    } else {
      setShowDescription(false);
    }
  };

  const filteredToDo = todo.filter(({ priority }) => {
    if (filter === 'all') return true;
    if (filter === 'low') return priority === 'low';
    if (filter === 'medium') return priority === 'medium';
    if (filter === 'high') return priority === 'high';
    return true;
  });

  return (
    <div className='todo'>
      <h2>TO DO LIST</h2>
      <div className='filters'>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
      <div className='contain'>
        <ul>
          {filteredToDo.map(({ task, description, completed, priority }, index) => (
            <div key={index} className='item'>
              <li
                className={`task ${completed ? 'done' : ''} ${priority}`}
                onClick={() => handleItemDone(index)}
              >
                {task}
              </li>
              {description && <p className="description">{description}</p>}
              <p className={`priority ${priority}`}>Priority: {priority}</p>
              <span className='d' onClick={() => handleItemDelete(index)}>🗑️</span>
            </div>
          ))}
        </ul>
        <input
          ref={inputRef}
          placeholder='Write down your goal for today...'
          onChange={handleTaskInputChange}
        />
        {showDescription && (
          <>
            <textarea
              ref={descriptionRef}
              placeholder='Add a description...'
              className="description-input"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </>
        )}
        <button className="button-89" role="button" onClick={handleAddToDo}>ADD</button>
      </div>
    </div>
  );
}

export default ToDoList;
