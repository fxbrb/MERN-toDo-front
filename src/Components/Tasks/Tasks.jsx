import React, { useRef } from "react";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import { CiSaveDown1 } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import "./Tasks.scss";
import {
  removeTodos,
  setTodoAsComplete,
  setTodoAsIncomplete,
  updateTask,
} from "../../Api/Todos.jsx";
import { useAuthContext } from "../../Hooks/useAuthContext.jsx";

const Tasks = ({ singleTask }) => {
  const [title, setTitle] = useState(singleTask.task);
  const [editing, setEditing] = useState(false);
  const input = useRef();
  const { dispatch, completeTasks, incompleteTasks } = useAuthContext();
  // console.log(singleTask);
  const onEdit = (e) => {
    e.preventDefault();
    setEditing(true);
    input.current.focus();
  };

  const stopEdit = () => {
    setEditing(false);
    setTitle(singleTask.task);
  };

  const editTask = async (e) => {
    e.preventDefault();

    const editedTask = await updateTask(singleTask._id, title);
    setEditing(false);

    if (singleTask.is_complete) {
      const newCompleteTask = completeTasks.map((completeTask) =>
        completeTask._id !== editedTask._id ? completeTask : editedTask
      );

      dispatch({ type: "SET_COMPLETE_TASKS", payload: newCompleteTask });
    } else {
      const newIncompleteTask = incompleteTasks.map((incompleteTask) =>
        incompleteTask._id !== editedTask._id ? incompleteTask : editedTask
      );
      dispatch({ type: "SET_INCOMPLETE_TASKS", payload: newIncompleteTask });
    }

    toast.success(
      `Votre tache ${singleTask.task} a été mis a jour en ${editedTask.task}`
    );
  };

  const onDelete = async (e) => {
    e.preventDefault();

    if (window.confirm(`Etes vous sur de supprimer ${singleTask.task} ?`)) {
      const removedTask = await removeTodos(singleTask._id);
      // console.log(remove);

      if (singleTask.is_complete) {
        dispatch({
          type: "SET_COMPLETE_TASKS",
          payload: completeTasks.filter((t) => t._id !== removedTask._id),
        });
      } else {
        dispatch({
          type: "SET_INCOMPLETE_TASKS",
          payload: incompleteTasks.filter((t) => t._id !== removedTask._id),
        });
      }
    }

    toast.success(`${singleTask.task} a été supprimer avec succes.`);
  };

  const setCompleteTask = async (e) => {
    e.preventDefault();

    const incomplete = await setTodoAsComplete(singleTask._id);

    dispatch({
      type: "SET_INCOMPLETE_TASKS",
      payload: incompleteTasks.filter(
        (incompleteTask) => incompleteTask._id !== incomplete._id
      ),
    });
    dispatch({
      type: "SET_COMPLETE_TASKS",
      payload: [incomplete, ...completeTasks],
    });
    // window.location.reload();
    toast.success(`${singleTask.task} a été déplacer dans Tâches faites`);
  };

  const setIncompleteTask = async (e) => {
    e.preventDefault();

    const complete = await setTodoAsIncomplete(singleTask._id);
    dispatch({
      type: "SET_COMPLETE_TASKS",
      payload: completeTasks.filter(
        (completeTask) => completeTask._id !== complete._id
      ),
    });

    const newIncompleteTask = [complete, ...incompleteTasks];

    dispatch({
      type: "SET_INCOMPLETE_TASKS",
      payload: newIncompleteTask.sort(
        (a, b) => new Date(b.createdAt - new Date(a.createdAt))
      ),
    });

    toast.success(`${singleTask.task} a été déplacer dans Tâches non faites`);
  };
  return (
    <div className={`task ${singleTask.is_complete ? "task__complete" : ""}`}>
      <input
        type="checkbox"
        checked={singleTask.is_complete}
        onChange={!singleTask.is_complete ? setCompleteTask : setIncompleteTask}
      />
      <input
        type="text"
        ref={input}
        value={title}
        readOnly={!editing}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="task__actions">
        {editing ? (
          <>
            <MdOutlineCancel size={20} onClick={stopEdit} />
            <CiSaveDown1 onClick={editTask} size={20} />
          </>
        ) : (
          <>
            {!singleTask.is_complete && <FiEdit onClick={onEdit} size={20} />}
            <HiOutlineTrash size={20} onClick={onDelete} />
          </>
        )}
      </div>
    </div>
  );
};

export default Tasks;
