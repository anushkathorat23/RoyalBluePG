const router = require('express').Router();
const { getEnquiries, submitEnquiry, updateEnquiry, exportEnquiries } = require('../controllers/enquiryController');
const { protect } = require('../middleware/auth');
const { validateEnquiry, validateEnquiryStatus } = require('../middleware/validators');

router.get('/', protect, getEnquiries);
router.get('/export', protect, exportEnquiries);
router.post('/', validateEnquiry, submitEnquiry);
router.put('/:id', protect, validateEnquiryStatus, updateEnquiry);

module.exports = router;
