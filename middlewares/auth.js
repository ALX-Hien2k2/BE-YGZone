const Joi = require('joi');

// Authentication
const registerValidator = (data) => {
  const rule = Joi.object({
    email: Joi.string().min(6).max(225).required().email(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,50}$')).required(),
    fullname: Joi.string().min(6).max(225).required(),
    phoneNumber: Joi.string().pattern(new RegExp(/^\d{10}$/)).required(),
    avatar: Joi.string().uri().required(),
    address: Joi.string().required(),
    bank_account_number: Joi.string().pattern(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/),
    userType: Joi.number().valid(0, 1).required(),
  })

  return rule.validate(data);
}

const signInValidator = (data) => {
  const rule = Joi.object({
    email: Joi.string().min(6).max(225).required().email(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,50}$')).required(),
  })

  return rule.validate(data);
}

// Authorization


module.exports = {
  registerValidator,
  signInValidator,
};