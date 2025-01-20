import React from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import { Link } from "react-router-dom";


const Card = ({ taskproperty }) => {


const navigate = useNavigate;
const deletetask = async () => {
    const title = taskproperty.title;
    console.log("delete",+title);
  const confirm = window.confirm("Sure want to delete");
  if (!confirm) return;
  console.log("delete");
  const res = await fetch(`/api/tasks/${taskproperty.title}`, {
    method: "DELETE",
  });
  navigate("/");
};
  return (
    <>
      <div className=" bg-gray-100  rounded-md shadow-2xl flex flex-col items-center justify-center mx-5 my-5 py-10">
        <h2 className=" font-bold text-lg ">
          Title:
          <br />
          {taskproperty.title}
        </h2>
        <h2 className=" font-bold text-lg  ">
          Description:
          <br />
          {taskproperty.description}
        </h2>
        <h2 className=" font-bold text-lg ">
          Status:
          <br />
          {taskproperty.status}
        </h2>
        <h2 className=" font-bold text-lg ">
          Priority:
          <br />
          {taskproperty.priority}
        </h2>
        <h2 className=" font-bold text-lg ">
          Created Date:
          <br />
          {taskproperty.createdAt}
        </h2>

        <button
          onClick={() => deletetask()}
          className="flex bg-red-500 hover:bg-red-600 text-white font-bold  rounded-full h-10 w-32 focus:outline-none focus:shadow-outline  justify-center items-center"
        >
          Remove task
        </button>

        <Link to={`/edittask/${taskproperty.title}`} className=" float-right">
          Edit task
        </Link>
      </div>
    </>
  );
};

export default Card