//RegisterStep1.tsx
import React from "react";
import { FormikProps, Field, ErrorMessage } from "formik";
import { FormValues } from "../../App";
import NavBar from "../../Components/NavBar";
import FooterContainer from "../../Components/Footer/FooterContainer";
import { Link } from "react-router-dom";

interface Step1Props {
  formik: FormikProps<FormValues>;
  onNext: () => void; // Pass the onNext prop for navigation
}


const RegisterStep1: React.FC<Step1Props> = ({ formik, onNext }) => {
  const { values, errors, touched, handleChange, handleBlur } = formik;
  const handleNext = () => {
    if (formik.isValid && Object.values(formik.touched).some((touched) => touched)) {
      onNext();
    }
  };
  console.log(values);
  // console.log(formik.touched);
  return (
    <div>
      <NavBar/>
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md my-20 mx-auto">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <p>Please fill your personal information</p>

      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <Field
            id="fullName"
            name="fullName"
            type="text"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
            {errors.fullName && touched.fullName && (
          <div style={{ color: "red" }}>{errors.fullName}</div>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Field
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && touched.email && (
          <div style={{ color: "red" }}>{errors.email}</div>
          )}
        </div>
        <button type="submit" className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700" onClick={handleNext}>
          Next
        </button>
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

export default RegisterStep1;
