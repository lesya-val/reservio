import {
  requiredField,
  validEmail,
  validPhone,
} from "@/helpers/validationHelpers";

export const adminValidationRules = {
  name: {
    required: requiredField(),
  },
  surname: {
    required: requiredField(),
  },
  phone: {
    validPhone: validPhone(),
  },
  email: {
    required: requiredField(),
    validEmail: validEmail(),
  },
};
