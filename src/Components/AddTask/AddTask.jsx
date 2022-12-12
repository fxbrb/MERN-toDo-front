import React, { useState } from "react";
import { newTodos } from "../../Api/Todos.jsx";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useAuthContext } from "../../Hooks/useAuthContext.jsx";
import "./AddTask.scss";

const NewTask = () => {
  const [task, setTask] = useState("");
  const { dispatch, incompleteTasks } = useAuthContext();

  async function onSubmit(e) {
    e.preventDefault();

    const newTask = await newTodos(task);
    console.log(newTask);
    setTask("");
    dispatch({
      type: "SET_INCOMPLETE_TASKS",
      payload: [newTask.data, ...incompleteTasks],
    });
  }
  return (
    <form className="new" onSubmit={onSubmit}>
      <div className="new__container">
        <input
          type="text"
          value={task}
          placeholder="Ajoutez une tâche"
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit" disabled={task.length === 0}>
          <span>Ajouter</span> <AiOutlinePlusCircle size={20} />
        </button>
      </div>
    </form>
  );
};

export default NewTask;
