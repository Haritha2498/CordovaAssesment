import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';





const Addtask = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");


    const navigate = useNavigate();

    const submitForm = (e) => {
      e.preventDefault();
      const newtask = {
        title,
        description,
        priority,
        status,
      };
      const res = addtaskSubmit(newtask);
     

      navigate("/");
   
    };

    const addtaskSubmit = async (newtask) => {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newtask),
      });
      console.log("msg", res);
      return res;
    };

  return (
    <div>
      <section className="bg-white mb-20">
        <div className="container m-auto max-w-2xl py-2">
          <Link to="/" className="ml-20 float-right">
            Home
          </Link>
          <div className=" px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Add Task
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Task title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Task description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. 1"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In-progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="priority"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Priority
                </label>

                <select
                  id="priority"
                  name="priority"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 my-10  text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Addtask