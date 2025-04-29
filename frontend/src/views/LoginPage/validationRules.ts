import {
  minLengthRule,
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
    minLength: minLengthRule(8),
    validPassword: validPassword(),
  },
};
