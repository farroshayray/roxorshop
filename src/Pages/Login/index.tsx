import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios, AxiosError } from "axios";
import NavBar from "../../Components/NavBar";
import FooterContainer from "../../Components/Footer/FooterContainer";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from reloading the page
    try {
      const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
        email: email,
        password: password,
      }, { 
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = response.data;
      localStorage.setItem('token', data.access_token); //store token
      localStorage.setItem('refreshToken', data.refresh_token)
        try {
          const response = await axios.get("https://api.escuelajs.co/api/v1/auth/profile", {headers: {
            "Authorization": `Bearer ${data.access_token}`,
          }});
          const dataProfile = response.data;
          localStorage.setItem('fullName', dataProfile.name);
          localStorage.setItem('email', dataProfile.email);
          localStorage.setItem('avatar', dataProfile.avatar);
          localStorage.setItem('id', dataProfile.id);
          localStorage.setItem('role', dataProfile.role);
          localStorage.setItem('creationAt', dataProfile.creationAt);
          localStorage.setItem('updatedAt', dataProfile.updatedAt);
          console.log(dataProfile);
      } catch (error) {
        console.log(error);
      }
      console.log(response);
      navigate('/dashboard'); // Redirect to the Dashboard page
    } catch (error: any) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
      // setErrorMessage(error.response.data);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center py-7 bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form className="space-y-6" onSubmit={handleSubmitLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={handleChangeEmail}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={handleChangePassword}
              />
            </div>
            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
            <div>
              <p className="text-red-500">{errorMessage}</p>
            </div>
          </form>
          <div>
          <label htmlFor="rememberMe" className="inline-flex items-center">
    <input
      id="rememberMe"
      name="rememberMe"
      type="checkbox"
      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
    />
    <span className="ml-2 text-sm text-gray-700">Remember Me</span>
  </label>
          </div>
          <div className="flex">
            <p className="mr-2">do not have an account yet?</p>
          <Link to="/register" className="underline hover:font-bold">Register</Link>
          </div>
        </div>
      </div>
      <FooterContainer />
    </div>
  );
};

export default Login;
