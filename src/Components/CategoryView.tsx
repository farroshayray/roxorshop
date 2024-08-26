import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


interface Category {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

const CategoryView: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryDescription, setNewCategoryDescription] = useState<string>("");
  const [editingCategoryName, setEditingCategoryName] = useState<string>("");
  const [editingCategoryDescription, setEditingCategoryDescription] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchCategories(token);
    }
  }, []);

  const fetchCategories = async (token: string) => {
    try {
      const response = await axios.get("http://localhost:8080/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.slice(0, 10));
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      console.log(error.response.data);
    }
  };


  return (
    <div>
      <div className="">
        <div className="bg-white shadow-md p-10 mt-10 rounded-md">
          <h2 className="text-2xl font-bold text-center mb-4">Category you have</h2>
          <div className="flex flex-col justify-between md:flex-row">
          </div>
          <div className="space-y-2">
          {categories.map((category) => (
              <div key={category.id} className="flex flex-col bg-gray-200 rounded-md h-fit max-w-96">
                <div className="font-semibold mx-3 mt-2">
                    {category.name}
                </div>
                <small className="ml-5 mr-3 mb-2">
                    description: {category.description}
                </small>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <Link to="/categories">
            <button className="bg-black rounded-md hover:bg-slate-800">
              <p className="text-white p-3">edit</p>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
