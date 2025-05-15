import {
  requiredField,
  validPhone,
  maxLengthRule,
  minValueRule,
} from "@/helpers/validationHelpers";

export const bookingValidationRules = {
  name: {
    required: requiredField(),
  },
  phone: {
    required: requiredField(),
    validPhone: validPhone(),
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
