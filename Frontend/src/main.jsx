import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup.jsx";

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[{
      path:"",
      element: <Home/>

    },
    {
      path:"login",
      element: <Login/>,
    
    },
    {
      path:'signup',
      element:<Signup/>,
     
    },
    {
      path:'job/getall',
      element:<Jobs/>,
     
    },
    {
      path:'job/:id',
      element:<JobDetails/>
    },
    {
      path:'job/post',
      element:<PostJob/>
    },
    {
      path:'job/me',
      element:<MyJobs/>
      
    },
    {
      path:'application/',
      element:<Application/>
    },
    {
      path:'applications/me',
      element:<MyApplications/> 
    }
  ]
  },
  {
    path:'*',
    element:<NotFound/>
  }
])



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
);
