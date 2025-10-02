import { body, param } from "express-validator";

export const productValidation = [
  body('name')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('model')
    .isString().withMessage('Model must be a string')
    .isLength({ min: 3 }).withMessage('Model must be at least 3 character long'),
    body('type')
    .isString().withMessage('Type must be a string')
    .isLength({ min: 3 }).withMessage('Type must be at least 3 character long'),
    body('brand')
    .isString().withMessage('Brand must be a string')
    .isLength({ min: 3 }).withMessage('Brand must be at least 3 character long'),
    body('responsible')
    .isMongoId().withMessage('Responsible must be a valid user ID')
];

export const updateProdcutValidation = [
  param('id').isMongoId().withMessage('Product ID must be a valid ID'),
  body('status').isIn(['available', 'unavailable']).withMessage('Status must be either available or unavailable'),
];