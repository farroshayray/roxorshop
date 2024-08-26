import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../picture/logo192.png"
import { Squash as Hamburger } from 'hamburger-react';



const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [isOpened, setIsOpened] = useState(false);
    const [hamOpen, setHamOpen] = useState(false);

    const handleDropDown = () => {
        setIsOpened(!isOpened);
    }

    useEffect(() => {
        // Check if the user is logged in by verifying the presence of an accessToken
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        // Clear the accessToken from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('fullName');
          localStorage.removeItem('email');
          localStorage.removeItem('avatar');
          localStorage.removeItem('id');
          localStorage.removeItem('role');
          localStorage.removeItem('creationAt');
          localStorage.removeItem('updatedAt');
        setIsLoggedIn(false);
        // Redirect to the login page or home page after logout
        navigate('/login');
    };
    const avatar1 = localStorage.getItem('avatar');
    const fullName = localStorage.getItem("fullName");
    const initialName = fullName?.charAt(0).toUpperCase();

    return (
        <div className="navbar flex flex-col justify-between p-3 items-center bg-neutral-950 sm:flex-row">
            <div className="text-white absolute right-0 top-0 h-16 w-16 flex items-center justify-center sm:hidden">
            <Hamburger toggled={hamOpen} toggle={setHamOpen}/>
            </div>
            {hamOpen && (
                <div className="bg-white absolute right-0 top-16 sm:hidden sm:block">
                    {isLoggedIn ? (
                        <div className="shadow-xl w-64">
                            <div>
                                <img src={avatar1 ?? ''} alt={initialName} className="rounded-full object-cover w-20 h-20 my-4 mx-auto bg-black p-2"/>
                                <p className="text-black mr-6 my-auto font-bold mx-4 text-center">{fullName}</p>
                            </div>
                            <hr className="my-3 bg-black"/>
                            <div className="flex flex-col text-center text-xl">
                                <Link to="/" className="mr-2 ml-2 py-3 text-black hover:bg-black hover:text-white">Home</Link>
                                <Link to="/profile" className="mr-2 ml-2 py-3 text-black hover:bg-black hover:text-white">Profile</Link>
                                <Link to="/about" className="mr-2 ml-2 py-3 text-black hover:bg-black hover:text-white">About Us</Link>
                                <Link to="/product" className="mr-2 ml-2 py-3 text-black hover:bg-black hover:text-white">Products</Link>
                            </div>
                            <hr className="mt-3 bg-black"/>
                            <div onClick={handleLogout}>
                                <p className="text-center py-3  hover:bg-black hover:text-white text-xl">Logout</p>
                            </div>
                        </div>
                    ):(
                        <div className="shadow-xl w-64">
                            <div className="flex flex-col text-center text-xl">
                                <Link to="/" className="mr-2 ml-2 py-3 text-black hover:bg-black hover:text-white">Home</Link>
                                <Link to="/profile" className="mr-2 ml-2 py-3 text-black hover:bg-black hover:text-white">Profile</Link>
                                <Link to="/about" className="mr-2 ml-2 py-3 text-black hover:bg-black hover:text-white">About Us</Link>
                                <Link to="/product" className="mr-2 ml-2 py-3 text-black hover:bg-black hover:text-white">Products</Link>
                            </div>
                            <hr className="mt-3 bg-black"/>
                            <Link to="/login">
                            <div>
                                <p className="text-center py-3 mb-3 hover:bg-black hover:text-white text-xl">Log in</p>
                            </div>
                            </Link>
                        </div>
                    )}
                </div>
            )
            }
            <Link to="/">
                <div className="flex items-center cursor-pointer hover:bg-slate-900 rounded-md">
                    <img src={Logo} alt="logo" className="app-logo mt-6 w-36 sm:m-0 sm:w-20"/>
                </div>
            </Link>
            <div className="my-10 sm:my-auto hidden sm:block">
                <Link to="/" className="mr-2 ml-2 text-white hover:text-orange-600">Home</Link>
                <Link to="/profile" className="mr-2 ml-2 text-white hover:text-orange-600">Profile</Link>
                <Link to="/about" className="mr-2 ml-2 text-white hover:text-orange-600">About Us</Link>
                <Link to="/product" className="mr-2 ml-2 text-white hover:text-orange-600">Products</Link>
            </div>
            <div className="hidden sm:flex">
                {isLoggedIn ? (
                    <div className="flex-col flex">
                    <div className="flex">
                        <p className="text-white mr-6 my-auto font-bold">{fullName}</p>
                        <button onClick={handleDropDown} className="bg-black rounded-full w-10 h-10 hover:bg-slate-300">
                            <img src={avatar1 ?? ''} alt={initialName} className="rounded-full object-cover w-10 h-10"/>
                        </button>
                    </div>
                    {isOpened && (
                        <button onClick={handleLogout} className="bg-white absolute top-20 right-1 rounded-md">
                        <p className="m-2 font-semibold">Logout</p>
                        </button>
                )}
                    
                    </div>
                ) : (
                    <Link to="/login">
                        <div>
                        <button className="bg-white rounded-md hover:bg-slate-300">
                            <p className="m-2 font-semibold">Login</p>
                        </button>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;
