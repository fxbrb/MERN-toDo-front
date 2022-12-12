import axios from "axios";

export async function newTodos(task) {
  try {
    const data = await axios.post("/api/todos/new", { task });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateTask(id, task) {
  try {
    const { data } = await axios.put(`/api/todos/${id}`, { task });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function setTodoAsComplete(id) {
  try {
    const { data } = await axios.put(`/api/todos/${id}/complete`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function setTodoAsIncomplete(id) {
  try {
    const { data } = await axios.put(`/api/todos/${id}/incomplete`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function removeTodos(id) {
  try {
    const { data } = await axios.delete(`/api/todos/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
