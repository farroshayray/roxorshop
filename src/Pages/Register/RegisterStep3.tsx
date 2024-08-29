//RegisterStep3.tsx
import React, {useState} from "react";
import { FormikProps, Field, ErrorMessage, FormikHelpers } from "formik";
import { FormValues } from "../../App";
import axios, { Axios, AxiosError } from "axios";
import { Link } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import FooterContainer from "../../Components/Footer/FooterContainer";

interface Step3Props {
  formik: FormikProps<FormValues>;
  onBack: () => void;
  onSubmit: (values: FormValues, actions: FormikHelpers<FormValues>) => void;
  onClick: () => void;
}

const RegisterStep3: React.FC<Step3Props> = ({ formik, onBack, onSubmit, onClick }) => {
  const { values, errors, touched, handleChange, handleBlur } = formik;
  console.log(values);
  const [members, setMembers] = useState<FormValues[]>([]);
  const [isMemberError, setIsMemberError] = useState(false);
  const [isMemberAdded, setIsMemberAdded] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const addMember = async () => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        {
          "name": values.fullName,
          "email": values.email,
          "password": values.password,
            "avatar": values.avatar,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Member added:", response);
      
      onSubmit(formik.values, formik);
      setMembers((prevMembers) => [...prevMembers, response.data]);
      setIsMemberAdded(true);
      return(true);
    } catch (error: any) {
      console.error("Error adding member:", error.response.data);
      setErrorMessage(error.response.data);
      console.log(AxiosError);
      setIsMemberError(true);
      // alert(error);
      return(false);
    }
  };
  const handleSubmit3 = async () => {
    if (formik.isValid && Object.values(formik.touched).some((touched) => touched)) {
      const success = await addMember();
      if (success) {
        onSubmit(values, formik); // Panggil handleSubmit di App.tsx hanya jika sukses
      }
    }
  };
  const handleReRegister = () => {
    // alert('try different e-mail')
    onClick();
  }
  return (
    <div>
      <NavBar />
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md my-20 mx-auto">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <p>Please fill your account information</p>

      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Field
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.password && touched.password && (
        <div style={{ color: "red" }}>{errors.password}</div>
      )}
        </div>
        <div>
          <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">
            Re-Enter Password
          </label>
          <Field
            id="rePassword"
            name="rePassword"
            type="password"
            value={values.rePassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.rePassword && touched.rePassword && (
        <div style={{ color: "red" }}>{errors.rePassword}</div>
        )}
        </div>
        <div className="flex justify-between">
          <button type="button" className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="mt-4 py-2 px-4 bg-lime-600 text-white rounded-md hover:bg-lime-700" onClick={handleSubmit3}>
            Submit
          </button>
        </div>
        {isMemberError && (
          <div className="flex flex-col">
            <div className="text-red-600 ml-4">{ErrorMessage}</div>
          <Link to="/login" className="ml-4 text-sm text-gray-600 hover:text-blue-700 hover:underline">
            Already have an account? Login
          </Link>
          <p className="ml-4 cursor-pointer text-sm text-gray-600 hover:text-blue-700 hover:underline" onClick={handleReRegister}>
            Still want to register?
          </p>
          </div>
        )}
        {isMemberAdded && (
          <div>
            <div className="ml-4">Yeay, your account has been successfully registered!, Please</div>
          <Link to="/login" className="ml-4 text-sm text-blue-700 underline hover:font-semibold">
              Re-Login
          </Link>
          </div>
        )}
        <div className="flex">
          <p>Have an account yet?</p>
          <Link to='/login'><p className="ml-2 underline hover:text-blue-600">login</p></Link>
        </div>
      </form>
    </div>
    <FooterContainer />
    </div>
  );
};

export default RegisterStep3;
