import React, { useState } from 'react';
import NavBar from '../../Components/NavBar';
import DashboardNavBar from './DashboardNavBar';
import ProductGrid from '../../Components/Products.tsx/ProductGrid';
import FooterContainer from '../../Components/Footer/FooterContainer';
import { useNavigate } from 'react-router-dom';
import BackIcon from "../../picture/icons8-back-48.png";

const Dashboard = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  const [checkImage, setCheckImage] = useState(true);
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId?: number) => {
    setSelectedCategoryId(categoryId);
  };
  const handleImageCheck = () => {
    setCheckImage(!checkImage);
  }
  const handleBack = () => {
    navigate(-1);
  }
  return (
    <div>
        <NavBar />
        <div>
          <button onClick={handleBack}>
            <img src={BackIcon} alt="Back" className='hover:bg-slate-400 rounded-full'/>
          </button>
        </div>
        <DashboardNavBar onCategorySelect={handleCategorySelect} onCheckImages={handleImageCheck} />
        <ProductGrid categoryId={selectedCategoryId} checkImageEnabled={checkImage}/>
        <FooterContainer />
    </div>
  )
}

export default Dashboard;
