import React, { useState, useEffect } from "react";
import { FormikProps, Field } from "formik";
import { FormValues } from "../../App";
import NavBar from "../../Components/NavBar";
import FooterContainer from "../../Components/Footer/FooterContainer";
import axios from "axios";

interface Step2Props {
  formik: FormikProps<FormValues>;
  onNext: () => void;
  onBack: () => void;
}

const RegisterStep2: React.FC<Step2Props> = ({ formik, onNext, onBack }) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = formik;
  const [uploading, setUploading] = useState(false);
  const [useLink, setUseLink] = useState(false);
  const [isUploaded, setIsUploaded] = useState(!!values.avatar);

  useEffect(() => {
    // Reset isUploaded if avatar is cleared
    if (!values.avatar) {
      setIsUploaded(false);
    }
  }, [values.avatar]);

  const handleNext = () => {
    if (formik.isValid && Object.values(formik.touched).some((touched) => touched)) {
      onNext();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("https://api.escuelajs.co/api/v1/files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setFieldValue("avatar", response.data.location);
        setIsUploaded(true);
        console.log(response.data.location);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const toggleLinkInput = () => {
    setUseLink(!useLink);
  };

  return (
    <div>
      <NavBar />
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md my-20 mx-auto">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <p>Please choose your avatar!</p>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          {!useLink ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Avatar</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className=" w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {uploading && <p>Uploading...</p>}
              {isUploaded && 
              <div>
              <small>File uploaded: {values.avatar}</small>
              <div>
                <p>Avatar preview:</p>
                <img src={values.avatar} alt="" className="imgUpload max-w-36 max-h-36"/>
              </div>
              </div>
              }
              <button
                type="button"
                className="mt-2 text-indigo-600 hover:text-indigo-800"
                onClick={toggleLinkInput}
              >
                Or insert a picture link
              </button>
            </div>
          ) : (
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Avatar URL
              </label>
              <Field
                id="avatar"
                name="avatar"
                type="text"
                value={values.avatar}
                onChange={(e: any) => {
                  handleChange(e);
                  setIsUploaded(!!e.target.value); // Set isUploaded to true if there's a value
                }}
                onBlur={handleBlur}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.avatar && touched.avatar && (
                <div style={{ color: "red" }}>{errors.avatar}</div>
              )}
              <button
                type="button"
                className="mt-2 text-indigo-600 hover:text-indigo-800"
                onClick={toggleLinkInput}
              >
                Or upload a file instead
              </button>
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={onBack}
            >
              Back
            </button>
            <button
              type="submit"
              className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              onClick={handleNext}
              disabled={uploading}
            >
              Next
            </button>
          </div>
        </form>
      </div>
      <FooterContainer />
    </div>
  );
};

export default RegisterStep2;
