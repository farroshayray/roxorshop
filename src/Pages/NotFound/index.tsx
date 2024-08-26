import React from 'react'
import sad from "../../picture/sad.png"
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='bg-black h-screen flex justify-center items-center'>
        <div className='flex flex-col text-center'>
            <h1 className='text-white text-5xl'>Sorry!</h1>
            <img src={sad} alt="Not Found" className='w-64 mx-auto my-10'/>
            <h1 className='text-white'>404: Page Not Found</h1>
            <p className='text-white'>The page you are looking for does not exist.</p>
            <Link to="/" className='text-white underline hover:text-blue-500'>Back to home</Link>
        </div>
    </div>
  )
}

export default NotFoundPage