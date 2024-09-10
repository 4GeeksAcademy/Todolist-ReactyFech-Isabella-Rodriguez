import React, { useState, useEffect } from "react";

const Home = () => {
  const [input, setInput] = useState("");
  const [task, setTask] = useState([]);

  function saveTodos() {
    fetch("https://playground.4geeks.com/todo/users/isabella")
      .then((response) => response.json())
      .then((data) => setTask(data.todos));
  }

  function addTodos(inputValue) {
    fetch("https://playground.4geeks.com/todo/todos/isabella", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: inputValue,
        is_done: false,
      }),
    })
      .then((response) => response.json())
      .then(() => saveTodos());
  }

  function deleteTodos(selectId) {
    fetch("https://playground.4geeks.com/todo/todos/" + selectId, {
      method: "DELETE",
      redirect: "follow",
    })
      .then(() => saveTodos())
      .catch((error) => console.error(error));
  }

  // Nueva función para eliminar todas las tareas
  function deleteAllTodos() {
    task.forEach((t) => {
      fetch("https://playground.4geeks.com/todo/todos/" + t.id, {
        method: "DELETE",
        redirect: "follow",
      })
        .then(() => saveTodos())
        .catch((error) => console.error(error));
    });
  }

  useEffect(() => {
    saveTodos();
  }, []);

  return (
    <div className="todo-container">
      <h1>Todos</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              addTodos(input);
              setInput("");
            }
          }}
        />
      </div>
      <ul className="task-list">
        {task.map((t, index) => (
          <li key={index} className="task-item">
            <span>{t.label}</span>
            <i
              className="fa fa-times remove-task"
              aria-hidden="true"
              onClick={() => deleteTodos(t.id)}
            ></i>
          </li>
        ))}
        {task.length === 0 && <li className="no-tasks">No tasks, add a task</li>}
      </ul>

      {/* Botón para eliminar todas las tareas */}
      <div className="delete-all-button">
        <button onClick={deleteAllTodos} className="btn btn-danger">
          Eliminar todas las tareas
        </button>
      </div>
      <div className="tasks-left">
        {task.length === 1
          ? `${task.length} task left`
          : `${task.length} tasks left`}
      </div>
    </div>
  );
};

export default Home;
