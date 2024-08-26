import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export const FinishRegister = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-center max-w-fit mx-auto '>
        <div className='bg-white rounded-md h-56 flex flex-col justify-center shadow-md mt-28'>
            <h1 className='text-center mx-3'>Thank You !</h1>
            <p className='text-center mx-10'>You have finished your registration</p>
            <small className='text-center mx-10'>Please Re-Login to your account</small>

        </div>
        <button className='bg-lime-600 my-10 max-w-fit mx-auto rounded-md hover:bg-lime-700' onClick={() => navigate("/login")}>
            <p className='m-2 text-white'>Close</p>
        </button>
    </div>
  )
}
