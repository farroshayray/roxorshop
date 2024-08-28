import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import FooterContainer from "../../Components/Footer/FooterContainer";
import { Link } from "react-router-dom";


interface Category {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [newCategoryDescription, setNewCategoryDescription] = useState<string>("");
  const [showeditingForm, setShowEditingForm] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState<string>("");
  const [editingCategoryDescription, setEditingCategoryDescription] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(true);
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
      const response = await axios.get("https://api.escuelajs.co/api/v1/categories");
      console.log(response);
      setCategories(response.data.slice(0, 10));
    } catch (error) {
      console.error("Error fetching categories:", error);
      if (error) {
        // Token might be invalid, navigate to login
        // navigate("/login");
      }
    }
  };

  const addCategory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!newCategoryName || !newCategoryDescription) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/categories",
        {
          name: newCategoryName,
          description: newCategoryDescription,
          completed: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories([...categories, response.data]);
      setNewCategoryName("");
      setNewCategoryDescription("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const updateCategory = async (id: number, completed?: boolean, name?: string, description?: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const updatedCategory = {
        completed: completed !== undefined ? completed : undefined,
        name: name || undefined,
        description: description || undefined,
      };

      const response = await axios.put(
        `http://localhost:8080/categories/${id}`,
        updatedCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(categories.map((category) => (category.id === id ? response.data : category)));
      setEditingCategoryId(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const deleteCategory = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    if (!isConfirmed) {
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const startEditing = (category: Category) => {
    setEditingCategoryId(category.id);
    setEditingCategoryName(category.name);
    setEditingCategoryDescription(category.description);
    setShowEditingForm(true);
  };

  const saveEditing = () => {
    if (editingCategoryId !== null) {
      updateCategory(editingCategoryId, undefined, editingCategoryName, editingCategoryDescription);
    }
  };
  const cancelEditing = () => {
    setShowEditingForm(false);
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-screen-md p-8 space-y-8 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-center">Category List</h2>
          <div className="flex flex-col justify-between md:flex-row">
            <input
              type="text"
              className="border bg-slate-100 border-gray-400 rounded-md min-h-12 sm:text-sm sm:min-w-80 m-0 md:mr-1"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Add a new category Name"
            />
            <input
              type="text"
              className="border bg-slate-100 border-gray-400 rounded-md min-h-12 sm:text-sm sm:min-w-80 m-0 md:ml-1 md:mr-2"
              value={newCategoryDescription}
              onChange={(e) => setNewCategoryDescription(e.target.value)}
              placeholder="Add a new category Description"
            />
            <button
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={addCategory}
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex justify-between items-center">
                <div className="flex flex-col flex-grow p-2 border rounded-md mr-3">
                  {editingCategoryId === category.id && showeditingForm === true ? (
                    <div className="space-y-2">
                      <div className="">
                        <p>Name: </p>
                        <input
                          type="text"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          value={editingCategoryName}
                          onChange={(e) => setEditingCategoryName(e.target.value)}
                        />
                      </div>
                      <div className="">
                        <p>Description:</p>
                        <input
                          type="text"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          value={editingCategoryDescription}
                          onChange={(e) => setEditingCategoryDescription(e.target.value)}
                        />
                      </div>
                      <button
                        className="w-16 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={saveEditing}
                      >
                        Save
                      </button>
                      <button
                        className="w-16 ml-3 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span>{category.name}</span>
                      <small className="block text-gray-600">Description : {category.description}</small>
                      <button className="text-blue-500 hover:underline" onClick={() => startEditing(category)}>
                        Edit
                      </button>
                    </div>
                  )}
                </div>
                <button
                  className="px-2 py-1 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => deleteCategory(category.id)}
                >
                  Delete
                </button>  
              </div>
            ))}
          </div>
          <div>
            <Link to="/dashboard">
            <button className="bg-black rounded-md hover:bg-slate-800">
              <p className="text-white p-3">See Dashboard</p>
            </button>
            </Link>
          </div>
        </div>
      </div>
      <FooterContainer />
    </div>
  );
};

export default Categories;
