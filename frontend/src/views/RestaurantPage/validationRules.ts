import {
  requiredField,
  validEmail,
  validPhone,
  minLengthRule,
} from "@/helpers/validationHelpers";

export const restaurantValidationRules = {
  name: {
    required: requiredField(),
    minLength: minLengthRule(3),
  },
  address: {
    required: requiredField(),
  },
  phone: {
    required: requiredField(),
    validPhone: validPhone(),
  },
  email: {
    validEmail: validEmail(),
  },
  isActive: {},
};
