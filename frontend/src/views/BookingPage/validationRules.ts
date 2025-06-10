import {
  requiredField,
  validPhone,
  maxLengthRule,
  minValueRule,
  validEmail,
} from "@/helpers/validationHelpers";

export const bookingValidationRules = {
  name: {
    required: requiredField(),
  },
  phone: {
    required: requiredField(),
    validPhone: validPhone(),
  },
  email: {
    required: requiredField(),
    validPhone: validEmail(),
  },
  guestsCount: {
    required: requiredField(),
    minValue: minValueRule(1),
  },
  dateTime: {
    required: requiredField(),
  },
  notes: {
    maxLength: maxLengthRule(500),
  },
};
