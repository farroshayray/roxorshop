//App.tsx wewewe
import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Pages/Login/index";
import Home from "./Pages/Home/index";
import Dashboard from "./Pages/Dashboard";
import Categories from "./Pages/Categories/index";
import NotFoundPage from "./Pages/NotFound";
import RegisterPage from "./Pages/Register";

// Interface FormValues
export interface FormValues {
    fullName: string;
    email: string;
    avatar: string;
    password: string;
    rePassword: string;
  }

  //the App Component
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/categories" element={<Categories />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
