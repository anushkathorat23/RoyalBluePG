const { body, param, validationResult, matchedData } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((error) => error.msg).join(', '),
      errors: errors.array(),
    });
  }

  req.validatedBody = matchedData(req, { locations: ['body'], includeOptionals: true });
  next();
};

const trimOptionalString = (field, maxLength) => (
  body(field)
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: maxLength })
    .withMessage(`${field} must be ${maxLength} characters or fewer`)
);

const validateLogin = [
  body('email').trim().isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('password').isString().notEmpty().withMessage('Please provide password'),
  handleValidationErrors,
];

const validateEnquiry = [
  body('fullName').trim().notEmpty().withMessage('Full name is required').isLength({ max: 100 }),
  body('phone').trim().matches(/^[0-9]{10}$/).withMessage('Phone number must be 10 digits'),
  body('email').trim().isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  trimOptionalString('college', 120),
  body('occupation')
    .optional()
    .isIn(['Student', 'Working Professional', 'Other'])
    .withMessage('Invalid occupation'),
  trimOptionalString('message', 1000),
  body('privacyPolicy').optional().isBoolean().withMessage('Privacy policy must be true or false').toBoolean(),
  handleValidationErrors,
];

const validateEnquiryStatus = [
  param('id').isMongoId().withMessage('Invalid enquiry id'),
  body('status')
    .isIn(['new', 'contacted', 'resolved', 'rejected'])
    .withMessage('Invalid enquiry status'),
  handleValidationErrors,
];

module.exports = {
  validateLogin,
  validateEnquiry,
  validateEnquiryStatus,
};
