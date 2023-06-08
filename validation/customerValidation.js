const validator = require('validator');

const customerValidation = (name,address,nationalId, phone) => {
  const errors = {};
  if (validator.isEmpty(name))errors.name = 'Name is required';
  if (validator.isEmpty(phone)) errors.phone = 'Phone number is required';
  if (validator.isEmpty(nationalId)) errors.nationalId = 'National id is required';
  if (validator.isEmail(address)) errors.email ="Address address is invalid"
  return {errors,isValid: Object.keys(errors).length === 0,};
};

module.exports = customerValidation;