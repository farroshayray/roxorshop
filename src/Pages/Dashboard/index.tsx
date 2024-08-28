import React, { useState } from 'react';
import NavBar from '../../Components/NavBar';
import DashboardNavBar from './DashboardNavBar';
import ProductGrid from '../../Components/Products.tsx/ProductGrid';
import FooterContainer from '../../Components/Footer/FooterContainer';

const Dashboard = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  const [checkImage, setCheckImage] = useState(true);

  const handleCategorySelect = (categoryId?: number) => {
    setSelectedCategoryId(categoryId);
  };
  const handleImageCheck = () => {
    setCheckImage(!checkImage);
  }

  return (
    <div>
        <NavBar />
        <DashboardNavBar onCategorySelect={handleCategorySelect} onCheckImages={handleImageCheck} />
        <ProductGrid categoryId={selectedCategoryId} checkImageEnabled={checkImage}/>
        <FooterContainer />
    </div>
  )
}

export default Dashboard;
