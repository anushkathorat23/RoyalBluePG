const router = require('express').Router();
const { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');

router.get('/', getTestimonials);
router.post('/', protect, addTestimonial);
router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;
