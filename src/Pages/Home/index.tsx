import React, { useEffect, useState } from 'react';
import NavBar from "../../Components/NavBar";
import FooterContainer from '../../Components/Footer/FooterContainer';
import GreetingRevou from '../../Components/GreetingRevou';
import RegisterBtn from '../../Components/RegisterBtn';
import Promotion from './Promotion';
import CategoryCarousel from '../../Components/Products.tsx/CategoryCarousel';
import ProductGrid from '../../Components/Products.tsx/ProductGrid';

const token = localStorage.getItem('token');
const Home = () => {
  const [checkedImages, setCheckedImages] = useState(true);
  const toggleImageCheck = () => {
    setCheckedImages(!checkedImages);
  }

  return (
    <div className="App">
      <NavBar />
      <GreetingRevou />
      {!token && <RegisterBtn />}
      <div className='bg-black text-white text-center p-10'>
        <div>
          <p>Do you want to see products that have images only?</p>
        </div>
        <div className="px-4 text-left flex justify-center">
          <label htmlFor="toggle-check">
              <input type="checkbox" id="toggle-check" checked={checkedImages} onChange={toggleImageCheck} />
          </label>
          <p className='ml-2'>Secure Products</p>
        </div>
      </div>
      <div className='my-20 text-center'>
        <h2 className='text-2xl'>Categories For You</h2>
      </div>
      <CategoryCarousel categoryId="1" scrollTime={4000} checkImages={checkedImages}/>
      <CategoryCarousel categoryId="2" scrollTime={3000} checkImages={checkedImages}/>
      <CategoryCarousel categoryId="3" scrollTime={4200} checkImages={checkedImages}/>
      <CategoryCarousel categoryId="4" scrollTime={3200} checkImages={checkedImages}/>
      <CategoryCarousel categoryId="5" scrollTime={3500} checkImages={checkedImages}/>
      <div className='my-20 text-center'>
        <h2 className='text-2xl'>Products For You</h2>
      </div>
      <ProductGrid checkImageEnabled={checkedImages}/>
      <Promotion />
      <FooterContainer />
    </div>
  )
}

export default Home