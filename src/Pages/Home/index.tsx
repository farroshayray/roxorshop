import React, { useEffect } from 'react';
import NavBar from "../../Components/NavBar";
import FooterContainer from '../../Components/Footer/FooterContainer';
import GreetingRevou from '../../Components/GreetingRevou';
import RegisterBtn from '../../Components/RegisterBtn';
import Promotion from './Promotion';

const token = localStorage.getItem('token');
const Home = () => {
    const name = "ROXOR"
  return (
    <div className="App">
      <NavBar />
      <GreetingRevou name={name}/>
      {!token && <RegisterBtn />}
      <Promotion />
      <FooterContainer />
    </div>
  )
}

export default Home