//App.tsx
import { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import { FinishRegister } from "./FinishRegister";

// Import validation schemas
import { validationSchemaStep1 } from "./validationSchemaStep1";
import { validationSchemaStep2 } from "./validationSchemaStep2";
import { validationSchemaStep3 } from "./validationSchemaStep3";

// Interface FormValues
export interface FormValues {
    fullName: string;
    email: string;
    avatar: string;
    password: string;
    rePassword: string;
  }

  //the App Component
function RegisterPage() {
  const name = "SpaceBin";
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(true);
  const [showGreetings, setShowGreetings] = useState(true);
  const [step, setStep] = useState(1);


  // state initial values for Data
  const initialValues: FormValues = {
    fullName: "",
    email: "",
    avatar: "",
    password: "",
    rePassword: "",
  };

  //button handler
  const handleRegisterClick = () => {

    setShowRegister(false);
    setShowGreetings(false);
    setStep(1);
  };

  const handleNext = () => {
    console.log()
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  const handleReRegister = () => {
    setStep(step - 2);
  };

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    if (step === 3) {
      // Final step, submit form
      setStep(step + 0);
      console.log("Form submitted:", values);
      actions.setSubmitting(false);
    } else {
      // Move to next step
      setStep(step + 0);
    }
  };

  // Determine which validation schema to use based on the current step
  const validationSchema = step === 1 ? validationSchemaStep1 : step === 2 ? validationSchemaStep2 : validationSchemaStep3;

  return (
    <div className="App">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema} // Use the correct validation schema
          onSubmit={handleSubmit}
        >
          {formik => (
            <>
              {step === 1 && <RegisterStep1 formik={formik} onNext={handleNext} />}
              {step === 2 && <RegisterStep2 formik={formik} onNext={handleNext} onBack={handleBack} />}
              {step === 3 && <RegisterStep3 formik={formik} onBack={handleBack} onSubmit={handleSubmit} onClick={handleReRegister}/>}
              {step === 4 && <FinishRegister />}
            </>
          )}
        </Formik>
    </div>
  );
}


export default RegisterPage;
