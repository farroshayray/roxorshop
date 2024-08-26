import React from "react";
import { Link } from "react-router-dom";

const RegisterBtn = () => {
    
  return (
    <div>
        <div className="container bg-gray-100 p-0 mx-0 text-center max-w-full py-7">
            <h1 className="title">don't have an account yet?</h1>
            <Link to="/register">
            <button className="button rounded-md hover:bg-slate-800">Register</button>
            </Link>
        </div>
    </div>
  )
}

export default RegisterBtn