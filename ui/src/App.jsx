import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Task from './Pages/Task';
import Addtask from './Pages/Addtask';
import Edittask from './Pages/Edittask';


function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Task />} />
        <Route path="/addtask" element={<Addtask />} />
        <Route path="/edittask/:id" element={<Edittask />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}


export default App
