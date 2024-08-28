import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductGrid.css';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

interface ProductGridProps {
  categoryId?: number;
  checkImageEnabled?: boolean; // Prop baru untuk menentukan apakah perlu memeriksa URL gambar
}

const ProductGrid: React.FC<ProductGridProps> = ({ categoryId, checkImageEnabled}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [checkImageEnabled, setCheckImageEnabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = categoryId 
          ? `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
          : 'https://api.escuelajs.co/api/v1/products';

        const response = await axios.get<Product[]>(url);

        if (checkImageEnabled) {
          // Filter products that have a valid image URL
          const filteredProducts = await Promise.all(
            response.data.map(async (product) => {
              if (product.images.length > 0 && product.images[0] !== '') {
                const isImageValid = await checkImage(product.images[0]);
                return isImageValid ? product : null;
              }
              return null;
            })
          );

          setProducts(filteredProducts.filter((product): product is Product => product !== null));
          console.log(filteredProducts);
        } else {
          
          setProducts(response.data);
          console.log(response.data)
        }
      } catch (error) {
        console.error('Error fetching the products:', error);
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, checkImageEnabled]);

  const checkImage = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (products.length === 0) {
    return (
      <div className='flex justify-center'>
        <p>Sorry, Product not Found</p>
      </div>
    );
  }

  const handleClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  // const toggleImageCheck = () => {
  //   setCheckImageEnabled(!checkImageEnabled);
  // }

  return (
    <div>
      {/* <div className="px-4 text-left flex">
        <label htmlFor="toggle-check">
            <input type="checkbox" id="toggle-check" checked={checkImageEnabled} onChange={toggleImageCheck} />
        </label>
        <p className='ml-2'>Secure Products</p>
      </div> */}
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card cursor-pointer" key={product.id} onClick={() => handleClick(product.id)}>
            <img src={product.images[0]} alt={product.title} className="product-image" />
            <div className="product-info">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
