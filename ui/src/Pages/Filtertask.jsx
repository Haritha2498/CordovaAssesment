import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Filtertask = () => {
  const [tasks, setTasks] = useState([]);
  const [groupedTasks, setGroupedTasks] = useState({
    pending: [],
    inprogress: [],
    completed: [],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        console.log(data);

        const grouped = {
          pending: data.filter((task) => task.status == "pending"),
          inprogress: data.filter((task) => task.status == "in-progress"),
          completed: data.filter((task) => task.status == "completed"),
        };

        setTasks(data);
        setGroupedTasks(grouped);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <Link to="/" className="ml-20 float-right">
        Home
      </Link>
      <h2 className="text-3xl text-center font-semibold mb-6">Filter Task</h2>

      {/* Display tasks grouped by status */}
      <div className="task-group">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Pending Tasks</h3>
          {groupedTasks.pending.length > 0 ? (
            <ul>
              {groupedTasks.pending.map((task) => (
                <li key={task.id} className="mb-1">
                  {task.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>No pending tasks.</p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">In Progress Tasks</h3>
          {groupedTasks.inprogress.length > 0 ? (
            <ul>
              {groupedTasks.inprogress.map((task) => (
                <li key={task.id} className="mb-1">
                  {task.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>No in-progress tasks.</p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Completed Tasks</h3>
          {groupedTasks.completed.length > 0 ? (
            <ul>
              {groupedTasks.completed.map((task) => (
                <li key={task.id} className="mb-1">
                  {task.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>No completed tasks.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filtertask;
