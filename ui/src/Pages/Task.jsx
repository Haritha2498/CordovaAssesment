import React, { useState, useEffect } from "react";
import Card from "../Component/Card";
import { Link } from "react-router-dom";

const Task = () => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTask(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, []);

  return (
    <div>
      <Link to="/addtask" className="ml-20 float-right">
        Add Task
      </Link>
      <Link to="/filter" className="ml-20 float-right">
        Filtered Task
      </Link>

      <h2 className="text-3xl text-center font-semibold mb-6">Tasks</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : task.length === 0 ? (
        <p className="text-center text-gray-500">
          No tasks found. Please add some tasks!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10">
          {task.map((eachtask) => (
            <Card key={eachtask.id} taskproperty={eachtask} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Task;
