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
  images: any; // Updated to 'any' to handle different types of data
}

interface ProductGridProps {
  categoryId?: number;
  checkImageEnabled?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ categoryId, checkImageEnabled }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

        const normalizedProducts = response.data.map((product) => {
          const imageUrl = normalizeImages(product.images);
          return { ...product, images: imageUrl };
        });

        if (checkImageEnabled) {
          const filteredProducts = await Promise.all(
            normalizedProducts.map(async (product) => {
              if (product.images) {
                const isImageValid = await checkImage(product.images);
                return isImageValid ? product : null;
              }
              return null;
            })
          );

          setProducts(filteredProducts.filter((product): product is Product => product !== null));
        } else {
          setProducts(normalizedProducts);
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

  const normalizeImages = (images: any): string => {
    if (typeof images === 'string') {
      try {
        const parsed = JSON.parse(images);
        if (Array.isArray(parsed)) {
          return parsed[0]; // Return the first URL if it's an array
        }
        return images; // Return as is if it's not an array
      } catch (e) {
        return images;
      }
    }
    if (Array.isArray(images)) {
      const flattenedImages = images.flat(Infinity);
      return flattenedImages.find((url) => typeof url === 'string') || '';
    }
    return '';
  };

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

  return (
    <div>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card cursor-pointer" key={product.id} onClick={() => handleClick(product.id)}>
            <img src={product.images} alt={product.title} className="product-image" />
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
