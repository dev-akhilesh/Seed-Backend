const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');

router.get('/', inquiryController.getInquiries);
router.post('/', inquiryController.createInquiry);
router.put('/:id', inquiryController.updateInquiry);
router.delete('/:id', inquiryController.deleteInquiry);

module.exports = router;
