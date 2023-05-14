import * as yup from "yup";


export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "O nome deve conter ao menos 3 letras")
    .required("Por favor, digite seu nome completo"),

  email: yup
      .string()
      .required(),
});
