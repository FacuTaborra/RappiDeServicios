const express = require('express');
const { body, check, validationResult } = require('express-validator');
const router = express.Router();

const validateResetPassword = [
  body('code').notEmpty().withMessage('El código de recuperación es requerido'),
  body('code').isAlphanumeric().withMessage('El código de recuperación debe ser alfanumérico'),
  check('newPassword')
    
  .notEmpty().withMessage('Debes ingresar una contraseña')
  .isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres')
  .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).withMessage('La contraseña debe contener al menos una letra y un número'),
  
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Las contraseñas no coinciden');
    }
    return true;
  }),

  // Middleware para manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateResetPassword };