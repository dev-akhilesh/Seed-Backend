const express = require('express');
const router = express.Router();
const partnershipController = require('../controllers/partnershipController');

router.get('/', partnershipController.getPartnerships);
router.post('/', partnershipController.createPartnership);
router.put('/:id', partnershipController.updatePartnership);
router.delete('/:id', partnershipController.deletePartnership);

module.exports = router;

