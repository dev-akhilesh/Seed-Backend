const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const inquiryRoutes = require('./routes/inquiryRoutes');
const partnershipRoutes = require('./routes/partnershipRoutes');
const { handleError } = require('./middleware/errorHandlerMiddleware');
const { validateInquiry, validatePartnership } = require('./middleware/inputValidationMiddleware');

// Parse JSON bodies for POST requests
app.use(bodyParser.json());

// Parse URL-encoded bodies for GET requests
app.use(bodyParser.urlencoded({ extended: true }));

// Custom middleware to apply validation only to POST requests
const validatePostRequests = (req, res, next) => {
    if (req.method === 'POST') {
        if (req.path.startsWith('/api/inquiries')) {
            return validateInquiry(req, res, next);
        } else if (req.path.startsWith('/api/partnerships')) {
            return validatePartnership(req, res, next);
        }
    }
    next();
};

// Apply custom middleware to all routes
app.use(validatePostRequests);

// Routes
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/partnerships', partnershipRoutes);

// Error handling middleware
app.use(handleError);

// Start JSON Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
