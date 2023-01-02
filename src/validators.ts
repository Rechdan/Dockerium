import * as yup from "yup";

const { ValidationError } = yup;

export { ValidationError };

export const accountLoginValidator = yup.object().shape({
  email: yup.string().label("Email Field").email().required(),
  password: yup.string().label("Password Field").min(6).required(),
});
