import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/index";
import Home from "./Pages/Home/index";
import WelcomeLogin from "./Pages/WelcomeLogin";
import Categories from "./Pages/Categories/index";
import NotFoundPage from "./Pages/NotFound";
import RegisterPage from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import ProductDetailPage from "./Components/Products.tsx/ProductDetailPage";// Import ProductDetailPage

// Interface FormValues
export interface FormValues {
  fullName: string;
  email: string;
  avatar: string;
  password: string;
  rePassword: string;
}

// the App Component
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/welcome" element={<WelcomeLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product/:id" element={<ProductDetailPage />} /> {/* Update route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
