import React, { useContext, useEffect } from "react";
import "./App.css";


import { Toaster } from "react-hot-toast";
import {Outlet} from 'react-router-dom'
import MyState from "./Context/MyState";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";


function App(){
  return (
    <>
      <MyState>
      <Navbar/>
      <Outlet/>
      <Toaster/>
      <Footer/>
      </MyState>
    </>
  );
};

export default App;