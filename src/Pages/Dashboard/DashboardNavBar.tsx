import React, { useEffect, useState } from 'react';
import axios from 'axios';
import arrowDownIcon from '../../picture/icons8-arrow-down-30.png';

interface Category {
    creationAt: Date;
    id: number;
    image: string;
    name: string;
    updatedAt: Date;
}

interface DashboardNavBarProps {
    onCategorySelect: (categoryId?: number) => void;
    onCheckImages: () => void;
}

const DashboardNavBar: React.FC<DashboardNavBarProps> = ({ onCategorySelect, onCheckImages }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryBtn, setCategoryBtn] = useState(false);
    const [categoriesBtn, setCategoriesBtn] = useState<Category[]>([]);
    const [checkedImages, setCheckedImages] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
                setCategories(response.data.slice(0, 5));
                setCategoriesBtn(response.data.slice(0, 9));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryButton = () => {
        setCategoryBtn(!categoryBtn);
    };

    const handleAllProductsClick = () => {
        onCategorySelect(undefined); // Untuk memilih semua produk
        setCategoryBtn(false); // Menutup dropdown setelah memilih
    };

    const handleCategoryClick = (categoryId: number) => {
        onCategorySelect(categoryId);
        setCategoryBtn(false); // Menutup dropdown setelah memilih
    };

    const toggleImageCheck = () => {
        onCheckImages();
        setCheckedImages(!checkedImages);
    }

    return (
        <div className='bg-black my-10 flex flex-col md:flex-row'>
            <div className=''>
                <button onClick={handleCategoryButton} className='bg-white m-2 p-2 hover:bg-slate-200 flex min-w-fit'>
                    <p className='m-1'>Categories</p>
                    <img src={arrowDownIcon} alt="v" className='w-4 my-auto pr-2' />
                </button>
                {categoryBtn && (
                    <div className='absolute shadow-md'>
                        <div className=''>
                            <button 
                                className='py-1 px-2 bg-white hover:bg-black hover:text-white w-36'
                                onClick={handleAllProductsClick}
                            >
                                <p>All Products</p>
                            </button>
                            <hr />
                        </div>
                        {categoriesBtn.map((catBtn) => (
                            <div key={catBtn.id} className=''>
                                <button 
                                    className='py-1 px-2 bg-white hover:bg-black hover:text-white w-36'
                                    onClick={() => handleCategoryClick(catBtn.id)}
                                >
                                    <p>{catBtn.name}</p>
                                </button>
                                <hr />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='flex'>
                {categories.map((category) => (
                    <div key={category.id} className='sm:block hidden'>
                        <button 
                            className='bg-white m-2 p-2 rounded-full hover:bg-slate-200'
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <p className=''>{category.name}</p>
                        </button>
                    </div>
                ))}
            </div>
            <div className='bg-black text-white ml-4 mr-10'>
                <div>
                    <p>Do you want to see products that have images only?</p>
                </div>
                <div className="text-left flex justify-left">
                    <label htmlFor="toggle-check">
                        <input type="checkbox" id="toggle-check" checked={checkedImages} onChange={toggleImageCheck} />
                    </label>
                    <p className='ml-2'>Secure Products</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardNavBar;
