import React from 'react';
import "../App.css";
import { Link } from 'react-router-dom';

interface GreetingProps {
    name: string;
}

const GreetingRevou = () => {
    return (
        <header className='my-20 flex flex-col'>
        <h1 className="text-center text-4xl mb-4">Welcome to Our Website</h1>
        <h2 className="text-center text-xl mb-4">We are ROXOR</h2>
        <p className='text-center font-light mx-10'>where exclusive fashion meets everyday elegance. Dive into our diverse collection of apparel, wear, daily gadgets, featuring everything from chic dresses and stylish shirts to comfortable t-shirts and sleek glasses. Whether you're stepping out for a casual day or dressing up for a special occasion, ROXOR has the perfect ensemble for you. Explore our range of footwear, including trendy sandals and shoes, designed to complement your every outfit. Shop at ROXOR today and redefine your wardrobe with our unique, high-quality pieces. Experience fashion that makes you stand out. Only at ROXOR.</p>
        <Link to="/dashboard" className='mx-auto'>
        <button className='mx-auto mt-10 bg-black rounded-md hover:bg-slate-800'>
            <p className='text-white p-3'>Get Started</p>
        </button>
        </Link>
        </header>
    );
};

export default GreetingRevou;