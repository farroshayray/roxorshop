import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: {
    name: string;
  };
}

interface CarouselProps {
  scrollTime: number;
  categoryId: string;
  deviceType?: string;
  checkImages: boolean; // Prop baru untuk menentukan apakah perlu memeriksa URL gambar
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1000 },
    items: 4,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1000, min: 550 },
    items: 3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 550, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const CategoryCarousel: React.FC<CarouselProps> = ({ categoryId, scrollTime, deviceType = 'desktop', checkImages }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
        let validImageProducts = response.data;

        if (checkImages) {
          validImageProducts = await Promise.all(
            response.data.map(async (product: Product) => {
              const validImages = await filterValidImages(product.images);
              if (validImages.length > 0) {
                return { ...product, images: validImages };
              }
              return null;
            })
          );
        }

        const filteredProducts = validImageProducts.filter((product: any) => product !== null);
        setProducts(filteredProducts);

        if (filteredProducts.length > 0) {
          setCategory(filteredProducts[0].category.name);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [categoryId, checkImages]);

  const filterValidImages = async (images: string[]) => {
    const validImages: string[] = [];
    for (const image of images) {
      if (await isImageValid(image)) {
        validImages.push(image);
      }
    }
    return validImages;
  };

  const isImageValid = (url: string) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  const getRandomImage = (images: string[]) => {
    return images[Math.floor(Math.random() * images.length)];
  };

  const handleClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  if (products.length === 0) {
    return null;  // Tidak menampilkan apa pun jika tidak ada produk dengan gambar yang valid
  }

  return (
    <div className='my-10'>
      <div className='ml-10'>
        <h2 className='text-2xl font-medium'>{category}</h2>
      </div>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={scrollTime}
        keyBoardControl={true}
        customTransition="transform 300ms ease-in-out"
        transitionDuration={300}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        deviceType={deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {products.map((product) => (
          <div key={product.id} className="p-4 bg-white shadow-md rounded-lg cursor-pointer" onClick={() => handleClick(product.id)}>
            <img
              src={getRandomImage(product.images)}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-700">${product.price}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
