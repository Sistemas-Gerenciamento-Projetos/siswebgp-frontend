import React from "react";
import { Outlet } from "react-router-dom";

const Home = () =>{

  return( 
    <div>
      <Outlet/>  {/*Mantém componente pai na rota */}
      <h1>Home</h1>      
      <p>sss</p>
    </div>
  )
}

export default Home