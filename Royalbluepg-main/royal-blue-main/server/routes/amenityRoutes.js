const router = require('express').Router();
const { getAmenities, addAmenity, updateAmenity, deleteAmenity } = require('../controllers/amenityController');
const { protect } = require('../middleware/auth');

router.get('/', getAmenities);
router.post('/', protect, addAmenity);
router.put('/:id', protect, updateAmenity);
router.delete('/:id', protect, deleteAmenity);

module.exports = router;
