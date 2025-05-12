import {
  minLengthRule,
  requiredField,
  validEmail,
  validPassword,
} from "../../helpers/validationHelpers";

export const passwordValidationRules = {
  oldPassword: {
    required: requiredField(),
    minLength: minLengthRule(8),
  },
  newPassword: {
    required: requiredField(),
    minLength: minLengthRule(8),
    validPassword: validPassword(),
  },
};