// src/middleware/validationMiddleware.js
import Joi from 'joi';

const appointmentSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'any.required': 'Name is required',
  }),
  date: Joi.date().iso().required().messages({
    'date.base': 'Date must be a valid ISO date format',
    'any.required': 'Date is required',
  }),
});

const validateAppointment = (req, res, next) => {
  const { error } = appointmentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export { validateAppointment };
