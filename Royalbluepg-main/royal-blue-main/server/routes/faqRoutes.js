const router = require('express').Router();
const { getFAQs, addFAQ, updateFAQ, deleteFAQ } = require('../controllers/faqController');
const { protect } = require('../middleware/auth');

router.get('/', getFAQs);
router.post('/', protect, addFAQ);
router.put('/:id', protect, updateFAQ);
router.delete('/:id', protect, deleteFAQ);

module.exports = router;
