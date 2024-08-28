import React from 'react';
import NavBar from "../../Components/NavBar";
import FooterContainer from "../../Components/Footer/FooterContainer";
import { Link } from 'react-router-dom';
import CategoryView from '../../Components/CategoryView';

const WelcomeLogin = () => {
  const fullName = localStorage.getItem("fullName");

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center py-7 bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-center">Welcome, {fullName}!</h2>
          <p className="text-center">You have successfully logged in.</p>
        </div>
        <div>
            <Link to="/dashboard">
            <button className='mt-10 bg-gray-950 rounded-md hover:bg-slate-800'>
                <p className='text-white p-2'>Get Started</p>
            </button>
            </Link>
        </div>
        {/* <CategoryView/> */}
      </div>
      <FooterContainer />
    </div>
  );
};

export default WelcomeLogin;
