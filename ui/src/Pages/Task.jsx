import React from 'react'
import { useState,useEffect } from 'react';
import Card from '../Component/Card';
import { Link } from "react-router-dom";


const Task = () => {


    const [task, setTask] = useState([]); 
    useEffect(() => {
      const fetchTask = async () => {
        try {
          const res = await fetch("/api/tasks");
          const data = await res.json();
          setTask(data);
        } catch (error) {
          console.log("error", error);
        } 
      };
      fetchTask();
    }, []);
  return (
    <div>
      <Link to="/addtask" className="ml-20 float-right">
        Add Task
      </Link>

      <h2 className="text-3xl text-center font-semibold mb-6"> Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10">
        {task.map((eachtask) => (
          <Card key={eachtask.id} taskproperty={eachtask} />
        ))}
      </div>
    </div>
  );
}

export default Task