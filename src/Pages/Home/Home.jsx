import React from "react";
import AddTask from "../../Components/AddTask/AddTask.jsx";
import Tasks from "../../Components/Tasks/Tasks.jsx";
import { useAuthContext } from "../../Hooks/useAuthContext.jsx";
import "./Home.scss";

const Home = () => {
  const { completeTasks, incompleteTasks } = useAuthContext();
  return (
    <div className="Home">
      <div className="Home__container">
        <AddTask />
        <div className="Home__todos">
          <div className="todos">
            <div className="todos__title">
              <h2>
                Tâches non faites <span>{incompleteTasks.length}</span>
              </h2>
            </div>
            {incompleteTasks.map((singleTask) => (
              <Tasks key={singleTask._id} singleTask={singleTask} />
            ))}
          </div>

          {completeTasks.length > 0 && (
            <div className="todos">
              <div className="todos__title">
                <h2>
                  Tâches faites <span>{completeTasks.length}</span>
                </h2>
              </div>
              {completeTasks.map((singleTask, k) => (
                <Tasks key={k} singleTask={singleTask} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
