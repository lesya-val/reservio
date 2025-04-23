import {
  requiredField,
  validEmail,
  validPassword,
} from "../../helpers/validationHelpers";

export const loginValidationRules = {
  email: {
    required: requiredField(),
    validEmail: validEmail(),
  },
  password: {
    required: requiredField(),
    validPassword: validPassword(),
  },
};
