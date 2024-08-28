import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../NavBar';

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State untuk melacak gambar yang sedang ditampilkan
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

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div>
      <NavBar />
      <div className=' flex justify-center'>
        <div className="flex flex-col w-full mx-4 md:w-2/4 sm:w-2/3 my-10 shadow-xl rounded-2xl" style={{ cursor: 'pointer' }}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
