// // inputValidationMiddleware.js
// const { body, validationResult } = require('express-validator');

// exports.validateInquiry = [
//     body('name').notEmpty().withMessage('Name is required'),
//     body('email').isEmail().withMessage('Invalid email address'),
//     body('message').notEmpty().withMessage('Message is required'),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         next();
//     }
// ];

// exports.validatePartnership = [
//     body('name').notEmpty().withMessage('Name is required'),
//     body('description').notEmpty().withMessage('Description is required'),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         next();
//     }
// ];


// inputValidationMiddleware.js
const { validationResult } = require('express-validator');

exports.validateInquiry = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

exports.validatePartnership = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
