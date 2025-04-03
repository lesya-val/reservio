import {
  requiredField,
  validEmail,
  validPhone,
  minLengthRule,
} from "../../helpers/validationUtils";

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
    required: requiredField(),
    validEmail: validEmail(),
  },
  workingHours: {
    required: requiredField(),
  },
  isActive: {},
};

export const adminValidationRules = {
  name: {
    required: requiredField(),
  },
  surname: {
    required: requiredField(),
  },
  phone: {
    required: requiredField(),
    validPhone: validPhone(),
  },
  email: {
    required: requiredField(),
    validEmail: validEmail(),
  },
  password: {
    required: requiredField(),
    minLength: minLengthRule(6),
  },
};
