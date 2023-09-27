import React, { useState } from 'react';
import '../src/index.css';
import Navbar from '../src/Components/Navbar';
import TodoForm from '../src/Components/TodoForm.js';
import TodoItem from '../src/Components/TodoItems';

function App() {
  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskIdCounter, setTaskIdCounter] = useState(1);

  const addTask = (text) => {
    const newTask = {
      id: taskIdCounter,
      text: text,
      completed: false,
    };

    setUncompletedTasks([newTask, ...uncompletedTasks]);
    setTaskIdCounter(taskIdCounter + 1);
  };

  const completeTask = (taskId) => {
    // Find the task to complete in uncompleted tasks
    const taskToComplete = uncompletedTasks.find((task) => task.id === taskId);

    if (taskToComplete) {
      // Remove the task from uncompleted tasks
      const updatedUncompletedTasks = uncompletedTasks.filter(
        (task) => task.id !== taskId
      );

      // Update the task as completed
      taskToComplete.completed = true;

      // Add the completed task to the bottom of completed tasks
      setCompletedTasks([...completedTasks, taskToComplete]);
      setUncompletedTasks(updatedUncompletedTasks);
    }
  };

  const resetList = () => {
    setCompletedTasks([]);
    setUncompletedTasks([]);
  };

  return (
    <div>
      <Navbar resetList={resetList} />
      <TodoForm addTask={addTask} />
      <div className="card_item">
        {uncompletedTasks.map((task) => (
          <TodoItem key={task.id} task={task} completeTask={completeTask} />
        ))}
      </div>

      <div className="card_item">
        {completedTasks.map((task) => (
          <TodoItem key={task.id} task={task} completeTask={completeTask} />
        ))}
      </div>
    </div>
  );
}

export default App;
