// validationSchemaStep2.ts
import * as Yup from "yup";

export const validationSchemaStep2 = Yup.object({
  avatar: Yup.string().required("Avatar is required"),

});
