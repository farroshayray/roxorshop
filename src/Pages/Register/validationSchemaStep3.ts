// validationSchemaStep3.ts
import * as Yup from "yup";

export const validationSchemaStep3 = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/^[a-zA-Z]+$/, "Password must only contain letters"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Re-Enter Password is required"),
});