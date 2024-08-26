[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/aNIKLVFm)

# Here is a documentation for a multi step form using React, TypeScript, Formik, and Yup

Visit this deployment on Netlify! ---> [Space Bin](https://spacebin.netlify.app)

## Form Documentation
### Overview
This form is built using React, TypeScript, Formik, and Yup to provide a robust and validated user input experience.

#### Interface
``` typescript
export interface FormValues {
    fullName: string;
    email: string;
    birth: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    username: string;
    password: string;
    rePassword: string;
  }
  ```
  <br><br>

  #### Formik React
  ``` typescript
  <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {formik => (
            <>
              {step === 1 && <RegisterStep1 formik={formik} onNext={handleNext} />}
              {step === 2 && <RegisterStep2 formik={formik} onNext={handleNext} onBack={handleBack} />}
              {step === 3 && <RegisterStep3 formik={formik} onBack={handleBack} onSubmit={handleSubmit}/>}
              {step === 4 && <FinishRegister />}
            </>
          )}
        </Formik>
```
it used to make reusable form and handling switch between components
<br> <br>

#### Form Validation using Yup
This is an example for validating form using Yup. the example shows 
``` typescript
import * as Yup from "yup";

export const validationSchemaStep2 = Yup.object({
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string()
    .matches(/^\d{5}$/, "Zip Code must be 5 digits")
    .required("Zip Code is required"),
});
```

## Thank You