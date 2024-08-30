import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar';
import { useNavigate } from 'react-router-dom';
import PlusIcon from "./picture/icons8-plus-24.png";
import MinusIcon from "./picture/icons8-minus-26.png";
import BackIcon from "../../picture/icons8-back-48.png";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  quantity: number;
}

interface CartItem extends Product {
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const storedCartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      const initializedCartItems = storedCartItems.map((item: Product) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setCartItems(initializedCartItems);
    }
  }, [navigate]);

  const handleClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleDelete = (productId: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handlePlus = (productId: number) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handleMinus = (productId: number) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  if (cartItems.length === 0) {
    const handleBack = () => {
      navigate(-1);
    }
    return (
      <div>
        <NavBar />
        <button className='ml-3' onClick={handleBack}>
          <img src={BackIcon} alt="Back" className='rounded-full hover:bg-slate-300' />
        </button>
        <p className="text-center mt-10">Your cart is empty.</p>
      </div>
    );
  }
  const handleBack = () => {
    navigate(-1);
  }

  return (
    <div>
      <NavBar />
      <button className='ml-3' onClick={handleBack}>
        <img src={BackIcon} alt="Back" className='rounded-full hover:bg-slate-300' />
      </button>
      <div className="container mx-auto my-10">
        <h2 className="text-3xl mb-6">Shopping Cart</h2>
        {cartItems.map((product) => (
          <div key={product.id} className="flex flex-col md:flex-row justify-between items-center mb-4 p-4 border rounded">
            <div className='flex'>
              <img 
                src={product.images[0]} 
                alt={product.title} 
                className="w-20 h-20 object-cover rounded cursor-pointer" 
                onClick={() => handleClick(product.id)} 
              />
              <div className="flex-1 mx-4 cursor-pointer" onClick={() => handleClick(product.id)}>
                <h3 className="text-xl">{product.title}</h3>
                <p>${product.price}</p>
              </div>
            </div>
            <div className='flex'>
              <div className='flex mr-2'>
                <p className='mr-2'>Qty</p>
                <div className='flex border-solid border-2 border-black rounded-full px-1 h-8'>
                  <button className='w-6 h-6 my-auto text-white rounded-full' onClick={() => handleMinus(product.id)}>
                    <img src={MinusIcon} alt="-" />
                  </button>
                  <p className='mx-3 text-center my-auto'>{product.quantity}</p>
                  <button className='w-6 h-6 my-auto text-white rounded-full' onClick={() => handlePlus(product.id)}>
                    <img src={PlusIcon} alt="+" />
                  </button>
                </div>
              </div>
              <div>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2">
                  Buy
                </button>
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => handleDelete(product.id)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
