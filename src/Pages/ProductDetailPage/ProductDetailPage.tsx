import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../Components/NavBar';
import BackBtnLogo from "../../picture/icons8-back-48.png";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const addToCart = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCartItems = [...cartItems, product];
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
      alert('Product added to cart!');
    } else {
      navigate('/login');
    }
    
  };

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <div>
      <NavBar />
      <div className='mx-3' onClick={handleBack}>
        <img src={BackBtnLogo} alt="Back" className='rounded-full hover:bg-slate-300' />
      </div>
      <div className='flex justify-center'>
        <div className="flex flex-col w-full mx-4 md:w-2/4 sm:w-2/3 my-10 shadow-xl rounded-2xl">
          <div className='relative'>
            <img src={product.images[currentImageIndex]} alt={product.title} className="rounded-2xl object-cover mx-auto" />
            {product.images.length > 1 && (
              <>
                <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-black px-3 py-1 rounded-r" onClick={handlePrevImage}>
                  &#10094;
                </button>
                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-black px-3 py-1 rounded-l" onClick={handleNextImage}>
                  &#10095;
                </button>
              </>
            )}
          </div>
          <div className="p-6">
            <h2 className="text-2xl mb-3">{product.title}</h2>
            <p className="text-xl mb-3">Price: ${product.price}</p>
            <p>Description:</p>
            <p className="mb-3">{product.description}</p>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
