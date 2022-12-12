import { useReducer } from "react";
import { createContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { AuthReducer } from "../Reducers/AuthReducer.jsx";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
    loading: true,
    completeTasks: [],
    incompleteTasks: [],
  });

  useEffect(() => {
    authenticatedUser();
  }, []);

  const authenticatedUser = async () => {
    try {
      const res = await axios.get("/api/auth/current");

      if (res.data) {
        const tasks = await axios.get("/api/todos/current");

        if (tasks.data) {
          dispatch({ type: "SET_USER", payload: res.data });
          dispatch({
            type: "SET_COMPLETE_TASKS",
            payload: tasks.data.complete,
          });
          dispatch({
            type: "SET_INCOMPLETE_TASKS",
            payload: tasks.data.incomplete,
          });
        }
      } else {
        dispatch({ type: "RESET_USER" });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "RESET_USER" });
    }
  };

  const logout = async () => {
    try {
      await axios.put("/api/auth/logout");
      dispatch({ type: "RESET_USER" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "RESET_USER" });
    }
  };

  // console.log("AuthContext state : ", state);

  return (
    <AuthContext.Provider
      value={{ ...state, dispatch, authenticatedUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
