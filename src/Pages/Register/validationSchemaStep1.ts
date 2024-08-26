// validationSchemaStep1.ts
import * as Yup from "yup";

export const validationSchemaStep1 = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});
